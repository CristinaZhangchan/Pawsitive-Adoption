
import React, { useState } from 'react';
import { MESSAGES } from '../constants';
import { Message } from '../types';

interface MessagesScreenProps {
  t: (path: string) => any;
  onBack: () => void;
  onSelectChat: (chat: Message) => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ t, onBack, onSelectChat }) => {
  const [search, setSearch] = useState('');

  const filtered = MESSAGES.filter(m =>
    m.senderName.toLowerCase().includes(search.toLowerCase()) ||
    m.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f5f6f8] dark:bg-background-dark font-display text-text-main dark:text-white h-screen flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white dark:bg-background-dark sticky top-0 z-50 px-5 py-4 pt-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[28px] font-extrabold tracking-tight">Messages</h1>
          <button
            onClick={() => alert("Settings coming soon!")}
            className="size-10 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-sub text-[20px]">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full h-12 pl-11 pr-4 rounded-xl border-none bg-gray-100 dark:bg-surface-dark text-sm font-medium"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32 bg-white dark:bg-background-dark">
        {filtered.length > 0 ? (
          filtered.map((msg) => (
            <div
              key={msg.id}
              onClick={() => onSelectChat(msg)}
              className="flex items-center gap-4 px-5 py-5 border-b border-gray-50 dark:border-gray-800 active:bg-gray-50 dark:active:bg-surface-dark transition-colors cursor-pointer"
            >
              <div className="relative shrink-0">
                {msg.senderImage ? (
                  <div className="h-14 w-14 rounded-full bg-gray-200 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url("${msg.senderImage}")` }}></div>
                ) : (
                  <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xl uppercase">
                    {msg.senderName.charAt(0)}
                  </div>
                )}
                {msg.isOnline && (
                  <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-extrabold text-[16px] text-text-main dark:text-white truncate pr-2">{msg.senderName}</h3>
                  <span className="text-[11px] font-bold text-primary whitespace-nowrap">{msg.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-[13px] truncate pr-4 ${msg.unreadCount ? 'text-text-main font-bold dark:text-white' : 'text-text-sub'}`}>
                    {msg.lastMessage}
                  </p>
                  {msg.unreadCount ? (
                    <div className="size-2 bg-primary rounded-full shrink-0 animate-pulse"></div>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 px-10 text-center">
            <span className="material-symbols-outlined text-[64px] text-gray-200 mb-4">chat_bubble</span>
            <p className="text-text-sub font-medium">
              {search ? 'No messages found matching your search.' : 'No conversations yet. Start chatting with shelters!'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagesScreen;
