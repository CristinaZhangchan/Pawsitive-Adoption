import { supabase } from './supabaseClient';

/**
 * Upload a file to Supabase Storage
 */
export const uploadFile = async (
    file: File,
    bucket: string = 'pet-images',
    folder: string = 'uploads'
): Promise<{ url: string | null; error: any }> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { url: null, error: new Error('User not authenticated') };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${user.id}/${Date.now()}.${fileExt}`;

    // Upload file
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Error uploading file:', error);
        return { url: null, error };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
};

/**
 * Upload multiple files
 */
export const uploadMultipleFiles = async (
    files: File[],
    bucket: string = 'pet-images',
    folder: string = 'uploads'
): Promise<{ urls: string[]; errors: any[] }> => {
    const uploadPromises = files.map(file => uploadFile(file, bucket, folder));
    const results = await Promise.all(uploadPromises);

    const urls = results.filter(r => r.url !== null).map(r => r.url!);
    const errors = results.filter(r => r.error !== null).map(r => r.error);

    return { urls, errors };
};

/**
 * Delete a file from storage
 */
export const deleteFile = async (
    filePath: string,
    bucket: string = 'pet-images'
) => {
    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    return { error };
};

/**
 * Get public URL for a file
 */
export const getPublicUrl = (
    filePath: string,
    bucket: string = 'pet-images'
): string => {
    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return data.publicUrl;
};

/**
 * Upload pet image with compression
 */
export const uploadPetImage = async (file: File): Promise<string | null> => {
    // Compress image if needed (basic implementation)
    const compressedFile = await compressImage(file);

    const { url, error } = await uploadFile(compressedFile, 'pet-images', 'pets');

    if (error) {
        console.error('Error uploading pet image:', error);
        return null;
    }

    return url;
};

/**
 * Upload profile avatar
 */
export const uploadAvatar = async (file: File): Promise<string | null> => {
    const compressedFile = await compressImage(file, 200, 200);

    const { url, error } = await uploadFile(compressedFile, 'pet-images', 'avatars');

    if (error) {
        console.error('Error uploading avatar:', error);
        return null;
    }

    return url;
};

/**
 * Basic image compression
 */
const compressImage = async (
    file: File,
    maxWidth: number = 800,
    maxHeight: number = 800
): Promise<File> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    },
                    'image/jpeg',
                    0.8
                );
            };
        };
    });
};

/**
 * Create storage bucket (run once during setup)
 */
export const createStorageBucket = async () => {
    const { data, error } = await supabase.storage.createBucket('pet-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });

    return { data, error };
};
