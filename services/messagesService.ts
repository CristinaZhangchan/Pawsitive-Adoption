import { supabase } from './supabaseClient';
import type { Message } from '../types';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface ConversationWithDetails {
    id: string;
    participant_1_id: string;
    participant_2_id: string;
    pet_id: string | null;
    last_message_at: string;
    created_at: string;
    other_user: {
        id: string;
        full_name: string | null;
        avatar_url: string | null;
    };
    last_message: {
        content: string;
        created_at: string;
    } | null;
    unread_count: number;
}

/**
 * Get or create a conversation between two users
 */
export const getOrCreateConversation = async (
    otherUserId: string,
    petId?: string
) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    // Try to find existing conversation
    const { data: existing, error: findError } = await supabase
        .from('conversations')
        .select('*')
        .or(`and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`)
        .maybeSingle();

    if (existing) {
        return { data: existing, error: null };
    }

    // Create new conversation
    const { data, error } = await supabase
        .from('conversations')
        .insert({
            participant_1_id: user.id,
            participant_2_id: otherUserId,
            pet_id: petId || null
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Get all conversations for the current user
 */
export const getConversations = async (): Promise<Message[]> => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('conversations')
        .select(`
      *,
      messages (
        content,
        created_at,
        is_read,
        sender_id
      )
    `)
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .order('last_message_at', { ascending: false });

    if (error) {
        console.error('Error fetching conversations:', error);
        return [];
    }

    // Get profiles for other participants
    const otherUserIds = (data || []).map((conv: any) =>
        conv.participant_1_id === user.id ? conv.participant_2_id : conv.participant_1_id
    );

    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', otherUserIds);

    const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

    // Transform to Message type for compatibility
    return (data || []).map((conv: any) => {
        const otherUserId = conv.participant_1_id === user.id ? conv.participant_2_id : conv.participant_1_id;
        const otherUser = profileMap.get(otherUserId);
        const messages = conv.messages || [];
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        const unreadCount = messages.filter((m: any) => !m.is_read && m.sender_id !== user.id).length;

        return {
            id: conv.id,
            senderName: otherUser?.full_name || 'Unknown User',
            senderImage: otherUser?.avatar_url || `https://picsum.photos/seed/${otherUserId}/100/100`,
            lastMessage: lastMessage?.content || 'No messages yet',
            time: lastMessage ? formatTime(lastMessage.created_at) : formatTime(conv.created_at),
            isOnline: false, // Can be enhanced with presence tracking
            unreadCount
        };
    });
};

/**
 * Get messages for a specific conversation
 */
export const getMessages = async (conversationId: string) => {
    const { data, error } = await supabase
        .from('messages')
        .select(`
      *,
      sender:profiles!messages_sender_id_fkey (
        id,
        full_name,
        avatar_url
      )
    `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching messages:', error);
        return { data: [], error };
    }

    return { data, error: null };
};

/**
 * Send a message
 */
export const sendMessage = async (conversationId: string, content: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data, error } = await supabase
        .from('messages')
        .insert({
            conversation_id: conversationId,
            sender_id: user.id,
            content,
            is_read: false
        })
        .select()
        .single();

    return { data, error };
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (conversationId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: new Error('User not authenticated') };
    }

    const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id);

    return { error };
};

/**
 * Subscribe to new messages in a conversation (real-time)
 */
export const subscribeToMessages = (
    conversationId: string,
    callback: (message: any) => void
): RealtimeChannel => {
    const channel = supabase
        .channel(`messages:${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            },
            (payload) => {
                callback(payload.new);
            }
        )
        .subscribe();

    return channel;
};

/**
 * Unsubscribe from messages
 */
export const unsubscribeFromMessages = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel);
};

/**
 * Delete a conversation
 */
export const deleteConversation = async (conversationId: string) => {
    const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationId);

    return { error };
};

/**
 * Format timestamp for display
 */
const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffInHours < 48) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};
