
import React, { useState, useEffect } from 'react';
import { Screen, Pet, Locale, UserApplication, Message } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ListingsScreen from './screens/ListingsScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import ApplicationFormScreen from './screens/ApplicationFormScreen';
import ServicesScreen from './screens/ServicesScreen';
import ChatScreen from './screens/ChatScreen';
import NavBar from './components/NavBar';
import { translations } from './translations';
import { PETS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [locale, setLocale] = useState<Locale>('zh');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [applications, setApplications] = useState<UserApplication[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // 用户数据
  const [userData] = useState({
    name: "Alex",
    avatar: "https://picsum.photos/seed/user1/100/100"
  });

  const [formMode, setFormMode] = useState<'adoption' | 'hosting' | 'rehome'>('adoption');

  // 获取用户位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, (err) => console.warn("Location error:", err));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result = translations[locale];
    for (const key of keys) {
      if (result && result[key]) result = result[key];
      else return path;
    }
    return result;
  };

  const navigateTo = (screen: Screen, pet?: Pet, chat?: Message) => {
    if (pet) setSelectedPet(pet);
    if (chat) setSelectedChat(chat);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const startAdoption = (pet: Pet) => {
    setFormMode('adoption');
    setSelectedPet(pet);
    setCurrentScreen('form');
  };

  const startHostingReg = () => {
    setFormMode('hosting');
    setSelectedPet(null);
    setCurrentScreen('form');
  };

  const startRehomeReg = () => {
    setFormMode('rehome');
    setSelectedPet(null);
    setCurrentScreen('form');
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
  };

  const handleLoginSuccess = () => {
    navigateTo('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen t={t} onStart={handleLoginSuccess} />;
      case 'home':
        return (
          <HomeScreen
            t={t}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onPetSelect={(pet) => navigateTo('details', pet)}
            onSeeAll={() => navigateTo('listings')}
            onNavigateServices={() => navigateTo('services')}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            onNotification={() => alert("Notifications module coming soon!")}
            userName={userData.name}
            userAvatar={userData.avatar}
          />
        );
      case 'listings':
        return (
          <ListingsScreen
            t={t}
            onPetSelect={(pet) => navigateTo('details', pet)}
            onBack={() => navigateTo('home')}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            onNotification={() => alert("Notifications module coming soon!")}
          />
        );
      case 'details':
        return (
          <DetailsScreen
            locale={locale}
            t={t}
            pet={selectedPet}
            onBack={() => navigateTo('home')}
            onAdopt={() => startAdoption(selectedPet!)}
            toggleFavorite={toggleFavorite}
            isFavorite={selectedPet ? favorites.has(selectedPet.id) : false}
            onMessage={() => navigateTo('messages')}
          />
        );
      case 'form':
        return (
          <ApplicationFormScreen
            t={t}
            pet={selectedPet}
            mode={formMode}
            locale={locale}
            onBack={() => navigateTo(formMode === 'adoption' ? 'details' : 'services')}
            onComplete={(app) => {
              if (app) {
                setApplications([...applications, app]);
                navigateTo('messages');
              } else {
                navigateTo('home');
              }
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            t={t}
            locale={locale}
            setLocale={setLocale}
            onBack={() => navigateTo('home')}
            onLogout={handleLogout}
            stats={{
              saved: favorites.size,
              applied: applications.length,
              following: 5
            }}
            userName={userData.name}
            userAvatar={userData.avatar}
            favorites={Array.from(favorites).map(id => PETS.find(p => p.id === id)?.name || "Pet")}
          />
        );
      case 'messages':
        return <MessagesScreen t={t} onBack={() => navigateTo('home')} onSelectChat={(chat) => navigateTo('chat', undefined, chat)} />;
      case 'chat':
        return <ChatScreen chat={selectedChat} onBack={() => navigateTo('messages')} />;
      case 'services':
        return (
          <ServicesScreen
            t={t}
            onBack={() => navigateTo('home')}
            onNavigateListings={() => navigateTo('listings')}
            onStartHost={startHostingReg}
            onStartRehome={startRehomeReg}
          />
        );
      default:
        return <WelcomeScreen t={t} onStart={handleLoginSuccess} />;
    }
  };

  // Hide Navbar on specific screens
  const showNavBar = !['welcome', 'form', 'details', 'chat'].includes(currentScreen);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-[#f5f6f8] dark:bg-background-dark min-h-screen relative overflow-hidden shadow-2xl">
        {renderScreen()}
        {showNavBar && <NavBar activeScreen={currentScreen} onNavigate={navigateTo} />}
      </div>
    </div>
  );
};

export default App;
