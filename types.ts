
export type Gender = 'male' | 'female';
export type Locale = 'en' | 'sv' | 'zh';

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  distance: string;
  image: string;
  gender: Gender;
  // Added 'hamster' to support the hamster category and avoid type errors in filtering
  type: 'dog' | 'cat' | 'rabbit' | 'bird' | 'turtle' | 'hamster';
  description?: string;
  weight?: string;
  location?: string;
  shelterName?: string;
  shelterAvatar?: string;
  postedTime?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  senderName: string;
  senderImage?: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  unreadCount?: number;
  initials?: string;
}

export interface UserApplication {
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export type Screen = 'welcome' | 'home' | 'listings' | 'details' | 'form' | 'profile' | 'messages' | 'services' | 'chat';
