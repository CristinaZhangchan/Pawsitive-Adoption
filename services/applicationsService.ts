import { supabase } from './supabaseClient';
import type { UserApplication } from '../types';

export interface ApplicationFormData {
    fullName?: string;
    phone?: string;
    email?: string;
    address?: string;
    homeType?: string;
    hasPetExperience?: boolean;
    petName?: string;
    petBreed?: string;
    petAge?: string;
    petGender?: 'male' | 'female';
    vaccines?: string;
    photos?: string[];
    additionalInfo?: string;
}

/**
 * Submit an adoption application
 */
export const submitAdoptionApplication = async (
    petId: string,
    formData: ApplicationFormData
) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('applications')
        .insert({
            user_id: user.id,
            pet_id: petId,
            type: 'adoption',
            status: 'pending',
            form_data: formData,
            submitted_at: new Date().toISOString()
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Submit a hosting registration
 */
export const submitHostingApplication = async (formData: ApplicationFormData) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('applications')
        .insert({
            user_id: user.id,
            pet_id: null,
            type: 'hosting',
            status: 'pending',
            form_data: formData,
            submitted_at: new Date().toISOString()
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Submit a rehoming application
 */
export const submitRehomeApplication = async (formData: ApplicationFormData) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('applications')
        .insert({
            user_id: user.id,
            pet_id: null,
            type: 'rehome',
            status: 'pending',
            form_data: formData,
            submitted_at: new Date().toISOString()
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Get all applications for the current user
 */
export const getUserApplications = async (): Promise<UserApplication[]> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('applications')
        .select(`
      *,
      pets (
        id,
        name,
        breed,
        type
      )
    `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

    if (error) {
        console.error('Error fetching applications:', error);
        return [];
    }

    // Transform to UserApplication type
    return (data || []).map((app: any) => ({
        petId: app.pet_id || '0',
        status: app.status,
        date: new Date(app.submitted_at).toLocaleDateString()
    }));
};

/**
 * Get a specific application by ID
 */
export const getApplicationById = async (applicationId: string) => {
    const { data, error } = await supabase
        .from('applications')
        .select(`
      *,
      pets (
        id,
        name,
        breed,
        type,
        pet_images (image_url, is_primary)
      )
    `)
        .eq('id', applicationId)
        .single();

    return { data, error };
};

/**
 * Update application status (for admin/shelter use)
 */
export const updateApplicationStatus = async (
    applicationId: string,
    status: 'pending' | 'approved' | 'rejected'
) => {
    const { data, error } = await supabase
        .from('applications')
        .update({
            status,
            reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select()
        .single();

    return { data, error };
};

/**
 * Get applications count by status
 */
export const getApplicationsCount = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { pending: 0, approved: 0, rejected: 0 };
    }

    const { data, error } = await supabase
        .from('applications')
        .select('status')
        .eq('user_id', user.id);

    if (error || !data) {
        return { pending: 0, approved: 0, rejected: 0 };
    }

    const counts = {
        pending: data.filter(app => app.status === 'pending').length,
        approved: data.filter(app => app.status === 'approved').length,
        rejected: data.filter(app => app.status === 'rejected').length
    };

    return counts;
};

/**
 * Delete an application (only if pending)
 */
export const deleteApplication = async (applicationId: string) => {
    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId)
        .eq('status', 'pending'); // Only allow deletion of pending applications

    return { error };
};
