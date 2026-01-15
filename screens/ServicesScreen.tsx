
import React, { useState } from 'react';

interface ServicesScreenProps {
  t: (path: string) => any;
  onBack: () => void;
  onNavigateListings: () => void;
  onStartHost: () => void;
  onStartRehome: () => void;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ t, onBack, onNavigateListings, onStartHost, onStartRehome }) => {
  const [activeTab, setActiveTab] = useState<'adopt' | 'host' | 'rehome'>('host');

  const adoptionSteps = [
    { title: 'Find Your Match', desc: 'Browse our curated list of pets waiting for their forever home.', icon: 'search_check' },
    { title: 'Submit Application', desc: 'Tell us about your home and lifestyle through our simple form.', icon: 'edit_note' },
    { title: 'Virtual Meet & Greet', desc: 'Schedule a call with the shelter to meet your potential friend.', icon: 'video_chat' },
    { title: 'Home Consultation', desc: 'We help you prepare your home for the new family member.', icon: 'house_siding' },
    { title: 'Official Adoption', desc: 'Sign the papers and begin your life-long journey together!', icon: 'celebration' },
  ];

  const hostingServices = [
    {
      title: t('services.hosting.boarding'),
      desc: t('services.hosting.boardingDesc'),
      icon: 'bed',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: t('services.hosting.daycare'),
      desc: t('services.hosting.daycareDesc'),
      icon: 'directions_car',
      color: 'bg-indigo-50 text-indigo-500'
    },
    {
      title: t('services.hosting.community'),
      desc: t('services.hosting.communityDesc'),
      icon: 'volunteer_activism',
      color: 'bg-pink-50 text-pink-500'
    },
    {
      title: t('services.hosting.orgs'),
      desc: t('services.hosting.orgsDesc'),
      icon: 'corporate_fare',
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      title: t('services.hosting.p2p'),
      desc: t('services.hosting.p2pDesc'),
      icon: 'handshake',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: t('services.hosting.training'),
      desc: t('services.hosting.trainingDesc'),
      icon: 'school',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="bg-[#f5f6f8] dark:bg-background-dark font-display text-text-main dark:text-white flex flex-col min-h-screen">
      <header className="flex items-center px-4 py-4 justify-between bg-white dark:bg-[#101c22] sticky top-0 z-50 border-b border-gray-100">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">{t('services.title')}</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 py-6">
          <h1 className="text-3xl font-extrabold mb-2">{t('services.premium').split(' ')[0]} <span className="text-primary">{t('services.premium').split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-text-sub dark:text-gray-400 text-sm leading-relaxed">{t('services.subtitle')}</p>
        </div>

        <div className="px-6 mb-8">
          <div className="flex bg-gray-200/50 dark:bg-[#1a2c35] p-1.5 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTab('adopt')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'adopt' ? 'bg-white dark:bg-[#253941] shadow-sm text-primary' : 'text-text-sub'}`}
            >
              {t('services.tabs.adopt')}
            </button>
            <button
              onClick={() => setActiveTab('host')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'host' ? 'bg-white dark:bg-[#253941] shadow-sm text-primary' : 'text-text-sub'}`}
            >
              {t('services.tabs.host')}
            </button>
            <button
              onClick={() => setActiveTab('rehome')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'rehome' ? 'bg-white dark:bg-[#253941] shadow-sm text-primary' : 'text-text-sub'}`}
            >
              {t('services.tabs.rehome')}
            </button>
          </div>
        </div>

        {activeTab === 'adopt' && (
          <div className="px-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <div className="bg-primary/5 p-5 rounded-3xl border border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-2">Our 5-Step Journey</h3>
              <p className="text-xs text-text-sub leading-relaxed">We ensure every pet finds the safest and most loving home through a structured process.</p>
            </div>
            <div className="flex flex-col gap-8 ml-4 border-l-2 border-primary/20 pl-8 relative py-2">
              {adoptionSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[45px] top-0 size-8 rounded-full bg-white dark:bg-[#101c22] border-2 border-primary flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-primary text-[18px] font-bold">{step.icon}</span>
                  </div>
                  <h4 className="text-base font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-text-sub leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={onNavigateListings} className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 mt-4">
              Browse Available Pets
            </button>
          </div>
        )}

        {activeTab === 'host' && (
          <div className="px-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            <div className="relative w-full h-[220px] rounded-[32px] overflow-hidden shadow-xl mb-2">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-1000"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-[28px] font-extrabold leading-tight mb-2">Safe & Loving Hosting</h3>
                  <p className="text-sm opacity-90 font-medium">Book a trusted sitter while you're away or become one to earn.</p>
                </div>
              </div>
              <div className="absolute top-5 left-5">
                <span className="bg-[#333]/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm">
                  Preview
                </span>
              </div>
            </div>

            {/* Matrix Grid matching User Image */}
            <div className="grid grid-cols-2 gap-4">
              {hostingServices.map((service, idx) => (
                <div
                  key={idx}
                  onClick={onStartHost}
                  className="bg-white dark:bg-[#1a2c35] p-5 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-3 transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <div className={`size-12 rounded-[18px] ${service.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[24px] font-medium">{service.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-text-main dark:text-white mb-1.5">{service.title}</h4>
                    <p className="text-[11px] text-text-sub dark:text-gray-400 leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onStartHost}
              className="w-full h-16 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/25 mt-4 text-[17px] active:scale-95 transition-all"
            >
              {t('services.becomeHost')}
            </button>
          </div>
        )}

        {activeTab === 'rehome' && (
          <div className="px-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
            {/* Added Rehome Banner Image */}
            <div className="relative w-full h-[180px] rounded-[32px] overflow-hidden shadow-lg mb-2">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-[22px] font-extrabold">Find a New Family</h3>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-3xl border border-orange-100 dark:border-orange-900/20">
              <h3 className="text-lg font-bold text-orange-600 mb-2">Responsible Rehoming</h3>
              <p className="text-xs text-text-sub leading-relaxed">Sometimes life changes. We help you find a perfect new family for your pet without the stress of public sales.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2c35] rounded-2xl border border-gray-100 shadow-sm">
                <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI-Powered Profiles</h4>
                  <p className="text-[11px] text-text-sub">We'll help you write a beautiful bio.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#1a2c35] rounded-2xl border border-gray-100 shadow-sm">
                <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Vetted Adopters</h4>
                  <p className="text-[11px] text-text-sub">Connect only with background-checked users.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onStartRehome}
              className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 mt-4 active:scale-95 transition-all"
            >
              {t('services.listPet')}
            </button>
            <p className="text-center text-[10px] text-text-sub px-8">
              By listing, you agree to our responsible placement policies. Sale of pets for profit is strictly monitored.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServicesScreen;
