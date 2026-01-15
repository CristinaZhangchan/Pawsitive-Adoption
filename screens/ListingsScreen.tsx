
import React, { useState } from 'react';
import { PETS } from '../constants.tsx';
import { Pet } from '../types';

interface ListingsScreenProps {
  // Translation function passed from App.tsx
  t: (path: string) => any;
  onPetSelect: (pet: Pet) => void;
  onBack: () => void;
  /* Add toggleFavorite and favorites to match App.tsx usage and resolve type error */
  toggleFavorite: (id: string) => void;
  favorites: Set<string>;
  // Added onNotification to resolve property missing error
  onNotification: () => void;
}

const ListingsScreen: React.FC<ListingsScreenProps> = ({ t, onPetSelect, onBack, toggleFavorite, favorites, onNotification }) => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Sweden, Stockholm');

  const locations = [
    'Sweden, Stockholm',
    'Sweden, Gothenburg',
    'Sweden, Malmö',
    'Norway, Oslo',
    'Denmark, Copenhagen',
    'Finland, Helsinki'
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-screen flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white dark:bg-background-dark sticky top-0 z-50 px-4 py-3 flex flex-col gap-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
            <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
          </button>
          <button
            onClick={() => setShowLocationPicker(true)}
            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-xs text-gray-500 font-medium">Location</span>
            <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <span>{selectedLocation}</span>
              <span className="material-symbols-outlined text-gray-400 text-sm">keyboard_arrow_down</span>
            </div>
          </button>
          {/* Attached onNotification handler to button */}
          <button onClick={onNotification} className="flex size-10 items-center justify-center rounded-full relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
          </button>
        </div>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px]">search</span>
            <input
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-100 dark:bg-surface-dark border-none text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-500"
              placeholder={t('home.searchPlaceholder')}
              type="text"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md bg-white dark:bg-background-dark shadow-sm">
              <span className="material-symbols-outlined text-gray-500 text-[18px]">tune</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4 pb-24">
        {PETS.map((pet) => (
          <article
            key={pet.id}
            onClick={() => onPetSelect(pet)}
            className="group relative flex bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative shrink-0">
              <div
                className="h-28 w-28 rounded-xl bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url("${pet.image}")` }}
              ></div>
              {/* Added onClick with stopPropagation to handle toggling favorites in the listings view */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(pet.id); }}
                className="absolute top-2 left-2 p-1.5 rounded-full bg-black/20 backdrop-blur-sm text-white transition-colors hover:bg-black/40"
              >
                <span className={`material-symbols-outlined text-[16px] leading-none ${favorites.has(pet.id) ? 'fill-1 text-red-500' : ''}`}>favorite</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-between pl-4 py-0.5">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{pet.name}</h3>
                  <span className={`material-symbols-outlined text-xl ${pet.gender === 'male' ? 'text-primary' : 'text-pink-400'}`}>{pet.gender}</span>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-sm font-medium mt-0.5">{pet.breed} • {pet.age}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-gray-500 text-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>{pet.distance}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button className="border border-primary text-primary text-xs font-bold px-4 py-2 rounded-full">
                  Message
                </button>
                <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm shadow-primary/30">
                  Meet me
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-card-dark rounded-t-[32px] p-6 pb-10 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-main dark:text-white">Select Location</h3>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="size-8 rounded-full bg-gray-100 dark:bg-surface-dark flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationPicker(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${selectedLocation === location
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 dark:bg-surface-dark text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">
                      {selectedLocation === location ? 'check_circle' : 'location_on'}
                    </span>
                    <span className="font-medium">{location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsScreen;
