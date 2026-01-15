
import React, { useState } from 'react';
import { Locale } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => any;
  stats: { saved: number; applied: number; following: number };
  userName: string;
  userAvatar: string;
  favorites: string[];
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout, locale, setLocale, t, stats, userName, userAvatar, favorites }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedAvatar, setEditedAvatar] = useState(userAvatar);
  const [editedBio, setEditedBio] = useState('Pet lover and animal advocate 🐾');
  const [editedPhone, setEditedPhone] = useState('+46 70 123 4567');
  const [editedEmail, setEditedEmail] = useState('alex@pawsitive.com');
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditedAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowEditModal(false);
      alert('Profile updated successfully!');
    }, 1500);
  };

  const accountMenu = [
    {
      label: 'My Applications',
      icon: 'description',
      color: 'bg-blue-50 text-blue-500',
      action: () => alert(`You have ${stats.applied} active applications. We recommend keeping your bio updated to increase your chances of matching with a shelter!`)
    },
    {
      label: 'My Favorite Pets',
      icon: 'favorite',
      color: 'bg-pink-50 text-pink-500',
      action: () => alert(`Favorited: ${favorites.length > 0 ? favorites.join(', ') : 'No favorites yet'}. Tip: Contact shelters early for popular pets!`)
    },
    {
      label: 'Appointment History',
      icon: 'calendar_month',
      color: 'bg-orange-50 text-orange-500',
      action: () => alert("No appointments found. Use the 'Meet me' button on pet listings to schedule a visit.")
    }
  ];

  const generalMenu = [
    { label: 'Help & Support', icon: 'help', color: 'bg-cyan-50 text-cyan-500', action: () => alert("Connecting to help center... For immediate assistance, email support@pawsitive.app") },
    { label: 'Settings', icon: 'settings', color: 'bg-slate-50 text-slate-500', action: () => setActiveTab('settings') }
  ];

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  const handleStatClick = (label: string) => {
    alert(`This section displays all your ${label.toLowerCase()} entries. Stay engaged to find your perfect match!`);
  };

  return (
    <div className="bg-[#f5f6f8] dark:bg-background-dark font-display text-text-main dark:text-white flex flex-col min-h-screen pb-32">
      <header className="flex items-center px-4 py-3 pt-8 justify-between bg-white dark:bg-card-dark sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">{activeTab === 'profile' ? t('profile.title') : 'Settings'}</h2>
        <button onClick={() => setActiveTab(activeTab === 'profile' ? 'settings' : 'profile')} className="size-10 flex items-center justify-center">
          <span className="material-symbols-outlined">{activeTab === 'profile' ? 'settings' : 'person'}</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'profile' ? (
          <>
            <div className="flex flex-col items-center pt-8 pb-10 px-4 bg-white dark:bg-card-dark rounded-b-[40px] shadow-sm mb-6">
              <div className="relative mb-5">
                <div className="size-28 rounded-full bg-cover bg-center border-4 border-white dark:border-[#1a2c35] shadow-xl transition-transform hover:scale-105 duration-300"
                  style={{ backgroundImage: `url("${editedAvatar}")` }}></div>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg active:scale-90 hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-white text-[16px] font-bold">edit</span>
                </button>
              </div>
              <h1 className="text-[26px] font-extrabold mb-1">{editedName}</h1>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 rounded-full mt-1">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="text-primary text-[13px] font-bold">{t('profile.verified')}</span>
              </div>
            </div>

            <div className="px-6 mb-8">
              <div className="flex gap-4 w-full">
                {[
                  { label: t('profile.stats.saved'), value: stats.saved },
                  { label: t('profile.stats.applied'), value: stats.applied },
                  { label: t('profile.stats.following'), value: stats.following }
                ].map((stat) => (
                  <button
                    key={stat.label}
                    onClick={() => handleStatClick(stat.label)}
                    className="flex flex-1 flex-col items-center justify-center p-4 bg-white dark:bg-card-dark rounded-[24px] shadow-sm border border-gray-50 dark:border-gray-800 transition-all active:scale-95 hover:shadow-md"
                  >
                    <p className="text-primary text-[22px] font-extrabold mb-1">{stat.value}</p>
                    <p className="text-text-sub text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 space-y-8">
              <section>
                <p className="text-[12px] font-bold text-text-sub mb-3 uppercase tracking-widest ml-1">Account</p>
                <div className="bg-white dark:bg-card-dark rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                  {accountMenu.map((item, idx) => (
                    <button key={idx} onClick={item.action} className="flex items-center w-full px-5 py-4.5 gap-4 hover:bg-gray-50 dark:hover:bg-surface-dark border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors">
                      <div className={`size-10 rounded-xl ${item.color} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <span className="flex-1 text-[16px] font-bold text-left text-text-main dark:text-white">{item.label}</span>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <p className="text-[12px] font-bold text-text-sub mb-3 uppercase tracking-widest ml-1">General</p>
                <div className="bg-white dark:bg-card-dark rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-gray-800">
                  {generalMenu.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="flex items-center w-full px-5 py-4.5 gap-4 hover:bg-gray-50 dark:hover:bg-surface-dark border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors"
                    >
                      <div className={`size-10 rounded-xl ${item.color} flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      </div>
                      <span className="flex-1 text-[16px] font-bold text-left text-text-main dark:text-white">{item.label}</span>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                    </button>
                  ))}
                </div>
              </section>

              <button
                onClick={onLogout}
                className="flex w-full items-center justify-center rounded-[22px] bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 py-5 text-rose-500 font-extrabold shadow-sm active:scale-[0.98] transition-all"
              >
                {t('profile.logout')}
              </button>
            </div>
          </>
        ) : (
          <div className="px-6 pt-6 animate-in slide-in-from-right duration-300">
            <p className="text-xs font-bold text-text-sub mb-4 uppercase tracking-widest">{t('profile.language')}</p>
            <div className="bg-white dark:bg-card-dark rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`flex items-center gap-4 px-6 py-5 w-full border-b border-gray-50 dark:border-gray-800 last:border-0 ${locale === lang.code ? 'bg-primary/5' : ''
                    }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`flex-1 text-lg font-bold text-left ${locale === lang.code ? 'text-primary' : ''}`}>
                    {lang.label}
                  </span>
                  {locale === lang.code && (
                    <span className="material-symbols-outlined text-primary fill-1">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-card-dark rounded-t-[32px] p-6 pb-10 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-main dark:text-white">Edit Profile</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="size-8 rounded-full bg-gray-100 dark:bg-surface-dark flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className="size-24 rounded-full bg-cover bg-center border-4 border-gray-100 dark:border-gray-700"
                    style={{ backgroundImage: `url("${editedAvatar}")` }}
                  ></div>
                  <label className="absolute bottom-0 right-0 size-8 bg-primary rounded-full border-4 border-white flex items-center justify-center shadow-lg cursor-pointer hover:brightness-110 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <span className="material-symbols-outlined text-white text-[16px]">photo_camera</span>
                  </label>
                </div>
                <p className="text-sm text-text-sub">Click camera icon to change photo</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                  Bio
                </label>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">check</span>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
