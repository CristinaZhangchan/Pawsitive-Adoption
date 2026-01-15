
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';

interface ChatScreenProps {
  chat: Message | null;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ text: string, sender: 'me' | 'them', time: string }>>([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chat) {
      setChatHistory([
        { text: chat.lastMessage, sender: 'them', time: chat.time }
      ]);
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatHistory([...chatHistory, { text: inputText, sender: 'me', time: now }]);
    setInputText('');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fileType = file.type.startsWith('image/') ? '图片' : '文件';
      setChatHistory([...chatHistory, {
        text: `📎 发送了一个${fileType}: ${file.name}`,
        sender: 'me',
        time: now
      }]);
      setShowAttachMenu(false);
    }
  };

  const handleAttachmentClick = (type: 'photo' | 'file') => {
    if (type === 'photo') {
      fileInputRef.current?.setAttribute('accept', 'image/*');
    } else {
      fileInputRef.current?.setAttribute('accept', '*');
    }
    fileInputRef.current?.click();
    setShowAttachMenu(false);
  };

  if (!chat) return null;

  return (
    <div className="bg-[#f5f6f8] dark:bg-background-dark font-display flex flex-col h-screen overflow-hidden animate-in slide-in-from-right duration-300">
      <header className="shrink-0 bg-white dark:bg-card-dark p-4 pt-12 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-surface-dark transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="size-11 rounded-full bg-cover bg-center border-2 border-white shadow-sm" style={{ backgroundImage: `url("${chat.senderImage}")` }}></div>
        <div className="flex-1">
          <h3 className="font-bold text-sm leading-none text-text-main dark:text-white">{chat.senderName}</h3>
          <div className="flex items-center gap-1 mt-1">
            <div className="size-2 bg-green-500 rounded-full"></div>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online Now</span>
          </div>
        </div>
        <button onClick={() => alert("Settings coming soon!")} className="material-symbols-outlined text-gray-400 p-2 rounded-full hover:bg-gray-50">more_vert</button>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-5 overflow-y-auto no-scrollbar bg-[#f8f9fa] dark:bg-background-dark/50">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-[22px] text-sm shadow-sm transition-all duration-300 scale-in-center ${msg.sender === 'me'
              ? 'bg-primary text-white rounded-tr-none'
              : 'bg-white dark:bg-card-dark text-text-main dark:text-white rounded-tl-none border border-gray-100 dark:border-gray-800'
              }`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-text-sub mt-1.5 px-1 font-medium">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="shrink-0 p-4 pb-12 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-gray-800">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Attachment menu */}
        {showAttachMenu && (
          <div className="mb-3 flex gap-2 animate-in slide-in-from-bottom duration-200">
            <button
              onClick={() => handleAttachmentClick('photo')}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">image</span>
              <span>照片</span>
            </button>
            <button
              onClick={() => handleAttachmentClick('file')}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
              <span>文件</span>
            </button>
            <button
              onClick={() => setShowAttachMenu(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-surface-dark text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`size-11 rounded-full flex items-center justify-center text-text-sub transition-all ${showAttachMenu
                ? 'bg-primary text-white rotate-45'
                : 'bg-gray-100 dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <div className="relative flex-1">
            <input
              className="w-full h-12 rounded-[20px] bg-gray-100 dark:bg-surface-dark border-none px-5 pr-12 text-[15px] focus:ring-primary placeholder:text-text-sub/50 font-medium"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className={`absolute right-1 top-1/2 -translate-y-1/2 size-10 bg-primary text-white rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'scale-100 opacity-100 shadow-md shadow-primary/30' : 'scale-0 opacity-0'}`}
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
