import { createClient } from '@supabase/supabase-js';
import { PETS, MESSAGES } from '../constants';

// This script seeds the database with initial data from constants.tsx
// Run this once after setting up your Supabase database

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''; // Use service key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables. Please set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
    console.log('🌱 Starting database seeding...\n');

    try {
        // 1. Create test users (shelters)
        console.log('Creating test users...');
        const testUsers = [
            {
                email: 'happypaws@shelter.com',
                password: 'testpassword123',
                full_name: 'Happy Paws Shelter',
                avatar_url: 'https://picsum.photos/seed/shelter1/100/100'
            },
            {
                email: 'sunshine@shelter.com',
                password: 'testpassword123',
                full_name: 'Sunshine Rescues',
                avatar_url: 'https://picsum.photos/seed/shelter2/100/100'
            }
        ];

        const createdUsers = [];
        for (const user of testUsers) {
            const { data, error } = await supabase.auth.admin.createUser({
                email: user.email,
                password: user.password,
                email_confirm: true,
                user_metadata: {
                    full_name: user.full_name,
                    avatar_url: user.avatar_url
                }
            });

            if (error) {
                console.error(`Error creating user ${user.email}:`, error.message);
            } else {
                console.log(`✓ Created user: ${user.email}`);
                createdUsers.push(data.user);
            }
        }

        // 2. Seed pets
        console.log('\nSeeding pets...');
        const shelterUserId = createdUsers[0]?.id;

        for (const pet of PETS) {
            // Insert pet
            const { data: petData, error: petError } = await supabase
                .from('pets')
                .insert({
                    name: pet.name,
                    breed: pet.breed,
                    age: pet.age,
                    gender: pet.gender,
                    type: pet.type,
                    weight: pet.weight,
                    description: pet.description,
                    location: pet.location,
                    distance: pet.distance,
                    shelter_name: pet.shelterName,
                    shelter_avatar: pet.shelterAvatar,
                    posted_time: new Date().toISOString(),
                    tags: pet.tags,
                    status: 'available',
                    owner_id: shelterUserId
                })
                .select()
                .single();

            if (petError) {
                console.error(`Error creating pet ${pet.name}:`, petError.message);
                continue;
            }

            // Insert pet image
            const { error: imageError } = await supabase
                .from('pet_images')
                .insert({
                    pet_id: petData.id,
                    image_url: pet.image,
                    is_primary: true,
                    display_order: 0
                });

            if (imageError) {
                console.error(`Error adding image for ${pet.name}:`, imageError.message);
            } else {
                console.log(`✓ Created pet: ${pet.name}`);
            }
        }

        // 3. Create a demo user for testing
        console.log('\nCreating demo user...');
        const { data: demoUser, error: demoError } = await supabase.auth.admin.createUser({
            email: 'demo@pawsitive.com',
            password: 'demo123456',
            email_confirm: true,
            user_metadata: {
                full_name: 'Alex Demo',
                avatar_url: 'https://picsum.photos/seed/user1/100/100'
            }
        });

        if (demoError) {
            console.error('Error creating demo user:', demoError.message);
        } else {
            console.log('✓ Created demo user: demo@pawsitive.com (password: demo123456)');

            // Add some favorites for demo user
            if (demoUser) {
                const { data: petsData } = await supabase
                    .from('pets')
                    .select('id')
                    .limit(2);

                if (petsData && petsData.length > 0) {
                    for (const pet of petsData) {
                        await supabase
                            .from('favorites')
                            .insert({
                                user_id: demoUser.user.id,
                                pet_id: pet.id
                            });
                    }
                    console.log(`✓ Added ${petsData.length} favorites for demo user`);
                }
            }
        }

        // 4. Create sample conversations
        console.log('\nCreating sample conversations...');
        if (demoUser && createdUsers.length > 0) {
            const { data: conversation, error: convError } = await supabase
                .from('conversations')
                .insert({
                    participant_1_id: demoUser.user.id,
                    participant_2_id: createdUsers[0].id,
                    pet_id: null
                })
                .select()
                .single();

            if (convError) {
                console.error('Error creating conversation:', convError.message);
            } else {
                // Add sample messages
                const messages = [
                    {
                        conversation_id: conversation.id,
                        sender_id: createdUsers[0].id,
                        content: 'Hi! Luna is available for a visit today.',
                        is_read: false
                    },
                    {
                        conversation_id: conversation.id,
                        sender_id: demoUser.user.id,
                        content: 'That sounds great! What time works best?',
                        is_read: true
                    }
                ];

                for (const msg of messages) {
                    await supabase.from('messages').insert(msg);
                }
                console.log('✓ Created sample conversation with messages');
            }
        }

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n📝 Demo credentials:');
        console.log('   Email: demo@pawsitive.com');
        console.log('   Password: demo123456');

    } catch (error) {
        console.error('\n❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();
