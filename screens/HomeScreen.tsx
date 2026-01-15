
import React, { useState } from 'react';
import { PETS } from '../constants';
import { Pet } from '../types';

interface HomeScreenProps {
  t: (path: string) => any;
  onPetSelect: (pet: Pet) => void;
  onSeeAll: () => void;
  onNavigateServices: () => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  toggleFavorite: (id: string) => void;
  favorites: Set<string>;
  onNotification: () => void;
  userName: string;
  userAvatar: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  t, onPetSelect, onSeeAll, onNavigateServices, activeCategory, setActiveCategory, toggleFavorite, favorites, onNotification, userName, userAvatar
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', emoji: '🐾', icon: 'pets', label: '全部' },
    { name: 'Dogs', emoji: '🐶', icon: 'dog', label: '狗' },
    { name: 'Cats', emoji: '🐱', icon: 'cat', label: '猫' },
    { name: 'Hamsters', emoji: '🐹', icon: 'hamster', label: '仓鼠' },
    { name: 'Small', emoji: '🐭', icon: 'small', label: '小型' },
    { name: 'Birds', emoji: '🦜', icon: 'bird', label: '鸟类' },
    { name: 'Exotic', emoji: '🦎', icon: 'exotic', label: '其它' }
  ];

  const handleToggleFavorite = (petId: string) => {
    // Optimistic update
    toggleFavorite(petId);
  };

  const filteredPets = PETS.filter(pet => {
    const matchesCategory = activeCategory === 'All'
      || (pet.type as string) === activeCategory.toLowerCase().slice(0, -1)
      || (activeCategory === 'Small' && (pet.type === 'rabbit' || pet.type === 'hamster'))
      || (pet.type as string) === activeCategory.toLowerCase();
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative flex w-full flex-col min-h-screen pb-24 overflow-x-hidden bg-[#f5f6f8] dark:bg-background-dark">
      <header className="sticky top-0 z-20 bg-[#f5f6f8]/95 dark:bg-background-dark/95 backdrop-blur-sm px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-white shadow-sm"
            style={{ backgroundImage: `url("${userAvatar}")` }}></div>
          <div className="flex flex-col">
            <span className="text-text-sub text-xs font-medium dark:text-gray-400">{t('home.welcome')},</span>
            <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight">{userName} 👋</h2>
          </div>
        </div>
        <button
          onClick={onNotification}
          className="relative flex items-center justify-center size-10 rounded-full bg-white dark:bg-card-dark shadow-sm border border-gray-100 transition-transform active:scale-90"
        >
          <span className="material-symbols-outlined text-[22px] text-text-main dark:text-white">notifications</span>
          <div className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></div>
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-6 pt-4">
        <div className="px-5">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-sub">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('home.searchPlaceholder')}
              className="w-full h-14 pl-12 pr-12 rounded-2xl border-none bg-white dark:bg-card-dark shadow-sm focus:ring-primary text-sm font-medium"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-sub">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex shrink-0 items-center gap-3 px-5 py-3.5 rounded-2xl transition-all active:scale-95 ${activeCategory === cat.name
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white dark:bg-card-dark border border-gray-100 text-text-main dark:text-gray-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{cat.emoji}</span>
                <span className="text-[14px] font-bold whitespace-nowrap">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Pets Listing */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-bold text-text-main dark:text-white">{t('home.nearby')}</h3>
            <button onClick={onSeeAll} className="text-sm font-bold text-primary">{t('home.seeAll')}</button>
          </div>

          <div className="masonry-grid">
            {filteredPets.length > 0 ? filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="masonry-item relative group bg-white dark:bg-card-dark rounded-[24px] p-3 shadow-sm border border-gray-50"
              >
                <div className="relative w-full overflow-hidden rounded-[18px] mb-3" onClick={() => onPetSelect(pet)}>
                  <div
                    className={`w-full ${Number(pet.id) % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]'} bg-cover bg-center transition-transform group-hover:scale-105`}
                    style={{ backgroundImage: `url("${pet.image}")` }}
                  ></div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(pet.id); }}
                  className="absolute top-5 left-5 size-8 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white"
                >
                  <span className={`material-symbols-outlined text-[18px] ${favorites.has(pet.id) ? 'fill-1 text-red-500' : ''}`}>favorite</span>
                </button>
                <div className="px-1" onClick={() => onPetSelect(pet)}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-[17px] font-bold text-text-main dark:text-white truncate">{pet.name}</h4>
                    <span className={`material-symbols-outlined text-xl ${pet.gender === 'male' ? 'text-primary' : 'text-pink-400'}`}>{pet.gender}</span>
                  </div>
                  <p className="text-text-sub dark:text-gray-400 text-[13px] font-medium">{pet.breed} • {pet.age}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-20 text-text-sub">
                No pets found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
