import { supabase } from './supabaseClient';
import type { Pet } from '../types';

export interface PetFilters {
    type?: string;
    gender?: 'male' | 'female';
    minAge?: number;
    maxAge?: number;
    status?: 'available' | 'pending' | 'adopted';
    search?: string;
}

export interface PaginationOptions {
    page?: number;
    limit?: number;
}

/**
 * Fetch all pets with optional filters and pagination
 */
export const getPets = async (
    filters?: PetFilters,
    pagination?: PaginationOptions
): Promise<{ data: Pet[]; count: number; error: any }> => {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('pets')
        .select('*, pet_images(image_url, is_primary)', { count: 'exact' });

    // Apply filters
    if (filters?.type && filters.type !== 'All') {
        query = query.eq('type', filters.type.toLowerCase());
    }

    if (filters?.gender) {
        query = query.eq('gender', filters.gender);
    }

    if (filters?.status) {
        query = query.eq('status', filters.status);
    } else {
        // Default to available pets
        query = query.eq('status', 'available');
    }

    if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,breed.ilike.%${filters.search}%`);
    }

    // Apply pagination and ordering
    query = query
        .order('created_at', { ascending: false })
        .range(from, to);

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching pets:', error);
        return { data: [], count: 0, error };
    }

    // Transform data to match Pet type
    const pets: Pet[] = (data || []).map((pet: any) => ({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        type: pet.type,
        weight: pet.weight,
        description: pet.description,
        location: pet.location,
        distance: pet.distance,
        shelterName: pet.shelter_name,
        shelterAvatar: pet.shelter_avatar,
        postedTime: pet.posted_time,
        tags: pet.tags || [],
        image: pet.pet_images?.find((img: any) => img.is_primary)?.image_url ||
            pet.pet_images?.[0]?.image_url ||
            'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800'
    }));

    return { data: pets, count: count || 0, error: null };
};

/**
 * Get a single pet by ID
 */
export const getPetById = async (petId: string): Promise<Pet | null> => {
    const { data, error } = await supabase
        .from('pets')
        .select('*, pet_images(image_url, is_primary, display_order)')
        .eq('id', petId)
        .single();

    if (error) {
        console.error('Error fetching pet:', error);
        return null;
    }

    // Transform to Pet type
    const pet: Pet = {
        id: data.id,
        name: data.name,
        breed: data.breed,
        age: data.age,
        gender: data.gender,
        type: data.type,
        weight: data.weight,
        description: data.description,
        location: data.location,
        distance: data.distance,
        shelterName: data.shelter_name,
        shelterAvatar: data.shelter_avatar,
        postedTime: data.posted_time,
        tags: data.tags || [],
        image: data.pet_images?.find((img: any) => img.is_primary)?.image_url ||
            data.pet_images?.[0]?.image_url ||
            'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800'
    };

    return pet;
};

/**
 * Create a new pet (for rehoming)
 */
export const createPet = async (petData: {
    name: string;
    breed: string;
    age: string;
    gender: 'male' | 'female';
    type: 'dog' | 'cat' | 'rabbit' | 'bird' | 'turtle' | 'hamster';
    weight?: string;
    description?: string;
    location?: string;
    tags?: string[];
    images?: string[];
}) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    // Insert pet
    const { data: pet, error: petError } = await supabase
        .from('pets')
        .insert({
            ...petData,
            owner_id: user.id,
            status: 'available',
            shelter_name: 'Private Owner',
            posted_time: new Date().toISOString()
        })
        .select()
        .single();

    if (petError) {
        console.error('Error creating pet:', petError);
        return { data: null, error: petError };
    }

    // Insert images if provided
    if (petData.images && petData.images.length > 0) {
        const imageInserts = petData.images.map((url, index) => ({
            pet_id: pet.id,
            image_url: url,
            is_primary: index === 0,
            display_order: index
        }));

        const { error: imagesError } = await supabase
            .from('pet_images')
            .insert(imageInserts);

        if (imagesError) {
            console.error('Error adding pet images:', imagesError);
        }
    }

    return { data: pet, error: null };
};

/**
 * Update pet information
 */
export const updatePet = async (petId: string, updates: Partial<Pet>) => {
    const { data, error } = await supabase
        .from('pets')
        .update({
            name: updates.name,
            breed: updates.breed,
            age: updates.age,
            gender: updates.gender,
            type: updates.type,
            weight: updates.weight,
            description: updates.description,
            location: updates.location,
            tags: updates.tags
        })
        .eq('id', petId)
        .select()
        .single();

    return { data, error };
};

/**
 * Delete a pet
 */
export const deletePet = async (petId: string) => {
    const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', petId);

    return { error };
};

/**
 * Get pets by type
 */
export const getPetsByType = async (type: string): Promise<Pet[]> => {
    const { data } = await getPets({ type });
    return data;
};

/**
 * Search pets
 */
export const searchPets = async (searchTerm: string): Promise<Pet[]> => {
    const { data } = await getPets({ search: searchTerm });
    return data;
};
