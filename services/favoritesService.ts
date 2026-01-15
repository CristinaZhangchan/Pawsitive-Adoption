import { supabase } from './supabaseClient';

/**
 * Add a pet to favorites
 */
export const addFavorite = async (petId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('favorites')
        .insert({
            user_id: user.id,
            pet_id: petId
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Remove a pet from favorites
 */
export const removeFavorite = async (petId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('pet_id', petId);

    return { error };
};

/**
 * Get all favorites for the current user
 */
export const getFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: [], error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('favorites')
        .select(`
      id,
      pet_id,
      created_at,
      pets (
        id,
        name,
        breed,
        age,
        gender,
        type,
        weight,
        description,
        location,
        distance,
        shelter_name,
        shelter_avatar,
        posted_time,
        tags,
        pet_images (image_url, is_primary)
      )
    `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching favorites:', error);
        return { data: [], error };
    }

    // Transform to Pet array
    const favoritePets = (data || []).map((fav: any) => {
        const pet = fav.pets;
        return {
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
        };
    });

    return { data: favoritePets, error: null };
};

/**
 * Check if a pet is favorited by the current user
 */
export const isFavorite = async (petId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('pet_id', petId)
        .single();

    return !error && data !== null;
};

/**
 * Get favorite IDs for the current user (for quick lookup)
 */
export const getFavoriteIds = async (): Promise<Set<string>> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Set();
    }

    const { data, error } = await supabase
        .from('favorites')
        .select('pet_id')
        .eq('user_id', user.id);

    if (error || !data) {
        return new Set();
    }

    return new Set(data.map(fav => fav.pet_id));
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = async (petId: string) => {
    const isFav = await isFavorite(petId);

    if (isFav) {
        return await removeFavorite(petId);
    } else {
        return await addFavorite(petId);
    }
};
