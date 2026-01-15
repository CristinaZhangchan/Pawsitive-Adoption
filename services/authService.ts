import { supabase } from './supabaseClient';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
    user: User | null;
    session: Session | null;
    error: AuthError | null;
}

export interface Profile {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    location?: string;
    bio?: string;
}

/**
 * Sign up a new user with email and password
 */
export const signUp = async (
    email: string,
    password: string,
    metadata?: { full_name?: string; avatar_url?: string }
): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    });

    return {
        user: data.user,
        session: data.session,
        error
    };
};

/**
 * Sign in with email and password
 */
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    return {
        user: data.user,
        session: data.session,
        error
    };
};

/**
 * Sign in with OAuth provider (Google, GitHub, etc.)
 */
export const signInWithOAuth = async (provider: 'google' | 'github') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: window.location.origin
        }
    });

    return { data, error };
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

/**
 * Get the current user session
 */
export const getSession = async (): Promise<Session | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session;
};

/**
 * Get the current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
    const { data } = await supabase.auth.getUser();
    return data.user;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
};

/**
 * Get user profile
 */
export const getProfile = async (userId: string): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data;
};

/**
 * Update user profile
 */
export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    return { data, error };
};

/**
 * Reset password
 */
export const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
    });

    return { data, error };
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    return { data, error };
};
