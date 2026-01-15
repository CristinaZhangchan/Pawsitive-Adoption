
import { Pet, Message } from './types';

export const PETS: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 yrs',
    distance: '2.5 miles away',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800',
    gender: 'male',
    type: 'dog',
    weight: '12 kg',
    location: '123 Greenway Blvd, San Francisco, CA',
    shelterName: 'Happy Paws Shelter',
    shelterAvatar: 'https://picsum.photos/seed/shelter1/100/100',
    postedTime: '2 hours ago',
    tags: ['Friendly', 'Vaccinated', 'House Trained', 'Good with Kids']
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'French Bulldog',
    age: '4 mos',
    distance: '5.1 miles away',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    gender: 'female',
    type: 'dog',
    weight: '5 kg',
    shelterName: 'Sunshine Rescues',
    postedTime: '1 day ago',
    tags: ['Quiet', 'Playful']
  },
  {
    id: '3',
    name: 'Mochi',
    breed: 'Calico Cat',
    age: '1 yr',
    distance: '0.8 miles away',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    gender: 'female',
    type: 'cat',
    weight: '4 kg',
    tags: ['Cuddly', 'Microchipped']
  },
  {
    id: '4',
    name: 'Daisy',
    breed: 'Angora Rabbit',
    age: '8 wks',
    distance: '10 miles away',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800',
    gender: 'female',
    type: 'rabbit',
    weight: '1 kg',
    tags: ['Sweet', 'Fluffy']
  },
  {
    id: '5',
    name: 'Cheeks',
    breed: 'Dwarf Hamster',
    age: '6 mos',
    distance: '3.2 miles away',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=800',
    gender: 'male',
    // Corrected type from 'rabbit' to 'hamster' to properly support filtering
    type: 'hamster',
    weight: '0.1 kg',
    tags: ['Active', 'Nocturnal']
  },
  {
    id: '6',
    name: 'Bluey',
    breed: 'Parakeet',
    age: '1 yr',
    distance: '1.5 miles away',
    image: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=800',
    gender: 'male',
    type: 'bird',
    weight: '0.05 kg',
    tags: ['Vocal', 'Social']
  }
];

export const MESSAGES: Message[] = [
  {
    id: '1',
    senderName: 'Happy Paws Shelter',
    senderImage: 'https://picsum.photos/seed/shelter/100/100',
    lastMessage: 'Hi! Luna is available for a visit today.',
    time: '10:42 AM',
    isOnline: true,
    unreadCount: 1
  },
  {
    id: '2',
    senderName: 'Sarah Jenkins',
    senderImage: 'https://picsum.photos/seed/sarah/100/100',
    lastMessage: 'Is Buddy good with other cats?',
    time: 'Yesterday',
    isOnline: false,
    unreadCount: 1
  }
];
