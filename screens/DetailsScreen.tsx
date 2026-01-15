
import React, { useState, useEffect } from 'react';
import { Pet, Locale } from '../types';
import { generatePetDescription } from '../services/geminiService';

interface DetailsScreenProps {
  pet: Pet | null;
  onBack: () => void;
  onAdopt: () => void;
  locale: Locale;
  t: (path: string) => any;
  toggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onMessage: () => void;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ pet, onBack, onAdopt, locale, t, toggleFavorite, isFavorite, onMessage }) => {
  const [description, setDescription] = useState<string>('');
  const [isLoadingDesc, setIsLoadingDesc] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (pet) {
      const fetchDesc = async () => {
        setIsLoadingDesc(true);
        const desc = await generatePetDescription(pet.name, pet.breed, locale);
        setDescription(desc);
        setIsLoadingDesc(false);
      };
      fetchDesc();
    }
  }, [pet, locale]);

  if (!pet) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Adopt ${pet.name}`,
          text: `Check out ${pet.name} on Pawsitive!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const handleOpenMap = () => {
    const address = encodeURIComponent(pet.location || '123 Greenway Blvd, San Francisco, CA');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Open Apple Maps on iOS
      window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
    } else {
      // Open Google Maps on other platforms
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-[#f5f6f8] dark:bg-background-dark">
      {/* Header Overlays */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-2">
          <button onClick={handleShare} className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] shrink-0">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${pet.image}")` }}
        ></div>
        <div className="absolute top-5 left-5 z-30">
          <span className="bg-[#333]/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">Preview</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 -mt-8 flex flex-1 flex-col rounded-t-[40px] bg-[#f5f6f8] dark:bg-background-dark px-6 pt-8 pb-40">

        {/* Chips Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pet.tags?.map((tag, idx) => (
            <span key={idx} className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${idx === 0 ? 'bg-blue-100 text-blue-600' :
              idx === 1 ? 'bg-orange-100 text-orange-600' :
                'bg-green-100 text-green-600'
              }`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Age', val: pet.age },
            { label: 'Gender', val: pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1) },
            { label: 'Weight', val: pet.weight || '12 kg' }
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center justify-center p-4 rounded-[28px] bg-white dark:bg-card-dark border border-gray-50 shadow-sm transition-transform active:scale-95">
              <span className="text-text-main dark:text-white text-[18px] font-extrabold mb-0.5">{item.val}</span>
              <span className="text-text-sub text-[12px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Shelter Card */}
        <div className="flex items-center gap-4 bg-white dark:bg-card-dark p-4 rounded-[24px] border border-gray-50 shadow-sm mb-8">
          <div className="relative">
            <div className="size-14 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url("${pet.shelterAvatar || 'https://picsum.photos/seed/shelter/100/100'}")` }}></div>
            <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h4 className="font-extrabold text-[17px] text-text-main dark:text-white leading-tight">{pet.shelterName || 'Happy Paws Shelter'}</h4>
            <p className="text-[12px] text-text-sub mt-0.5">Posted {pet.postedTime || '2 hours ago'}</p>
          </div>
          <button onClick={onMessage} className="size-10 rounded-xl bg-gray-100 dark:bg-surface-dark flex items-center justify-center text-text-main dark:text-white transition-colors hover:bg-gray-200">
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </button>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-[20px] font-extrabold text-text-main dark:text-white mb-3">About {pet.name}</h3>
          <div className="relative text-text-sub dark:text-gray-300 text-[15px] font-medium leading-[1.6]">
            {isLoadingDesc ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ) : (
              <>
                <p className={isReadMore ? "" : "line-clamp-3"}>
                  {description || `${pet.name} is a wonderful ${pet.breed} looking for a loving home. They are energetic and love being around people.`}
                </p>
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-primary font-bold mt-2 hover:underline inline-block"
                >
                  {isReadMore ? "Show less" : "Read more"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Health & Details */}
        <div className="mb-8">
          <h3 className="text-[20px] font-extrabold text-text-main dark:text-white mb-4">Health & Details</h3>
          <div className="space-y-4">
            {[
              { text: 'Fully vaccinated and dewormed', icon: 'medical_services', color: 'bg-blue-100 text-blue-500' },
              { text: 'Neutered', icon: 'content_cut', color: 'bg-purple-100 text-purple-500' },
              { text: 'Microchipped (ID: #982123)', icon: 'pets', color: 'bg-pink-100 text-pink-500' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`size-10 rounded-full ${item.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <span className="text-[15px] font-bold text-text-main dark:text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[20px] font-extrabold text-text-main dark:text-white">Location</h3>
            <button onClick={handleOpenMap} className="text-sm font-bold text-primary hover:underline">View on Map</button>
          </div>
          <div className="bg-white dark:bg-card-dark rounded-[24px] overflow-hidden border border-gray-50 shadow-sm">
            {/* Google Maps Embed */}
            <div className="h-40 relative overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'}&q=${encodeURIComponent(pet.location || '123 Greenway Blvd, San Francisco, CA')}&zoom=14`}
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[15px] mb-1">{pet.shelterName || 'Happy Paws Shelter'}</h4>
              <p className="text-[13px] text-text-sub">{pet.location || '123 Greenway Blvd, San Francisco, CA'}</p>
              <div className="mt-2 text-[12px] font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">distance</span>
                {pet.distance} away
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Menu Modal */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200"
          onClick={() => setShowShareMenu(false)}
        >
          <div
            className="bg-white dark:bg-card-dark rounded-3xl p-6 m-4 max-w-sm w-full animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-text-main dark:text-white mb-4">Share {pet.name}</h3>
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">
                    {copySuccess ? 'check' : 'link'}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-text-main dark:text-white">
                    {copySuccess ? 'Link Copied!' : 'Copy Link'}
                  </p>
                  <p className="text-sm text-text-sub">
                    {copySuccess ? 'Ready to share' : 'Share via clipboard'}
                  </p>
                </div>
              </button>
              <button
                onClick={() => setShowShareMenu(false)}
                className="w-full p-3 text-text-sub font-medium hover:bg-gray-50 dark:hover:bg-surface-dark rounded-2xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom CTA constrained to mobile container width */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-xl border-t border-gray-100 px-6 py-5 pb-10 flex items-center gap-4">
        <button
          onClick={() => toggleFavorite(pet.id)}
          className={`flex size-14 items-center justify-center rounded-[20px] bg-gray-100 dark:bg-surface-dark transition-all active:scale-95 ${isFavorite ? 'text-red-500' : 'text-text-sub'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${isFavorite ? 'fill-1' : ''}`}>favorite</span>
        </button>
        <button
          onClick={onAdopt}
          className="flex-1 h-14 bg-primary text-white rounded-[20px] font-bold text-[17px] shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>{t('common.adoptMe')}</span>
          <span className="material-symbols-outlined text-[20px]">pets</span>
        </button>
      </div>
    </div>
  );
};

export default DetailsScreen;
