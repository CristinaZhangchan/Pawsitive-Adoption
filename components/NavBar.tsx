
import React from 'react';
import { Screen } from '../types';

interface NavBarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeScreen, onNavigate }) => {
  const navItems: { screen: Screen; icon: string; label: string }[] = [
    { screen: 'home', icon: 'home', label: 'Home' },
    { screen: 'listings', icon: 'search', label: 'Explore' },
    { screen: 'services', icon: 'grid_view', label: 'Services' },
    { screen: 'messages', icon: 'chat_bubble', label: 'Chat' },
    { screen: 'profile', icon: 'person', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full max-w-md left-1/2 -translate-x-1/2 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-gray-800 pb-safe shadow-lg">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors gap-1 ${
              activeScreen === item.screen ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${activeScreen === item.screen ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] ${activeScreen === item.screen ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className="h-4 w-full bg-white dark:bg-card-dark"></div>
    </nav>
  );
};

export default NavBar;
