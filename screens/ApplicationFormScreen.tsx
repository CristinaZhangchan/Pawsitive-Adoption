
import React, { useState } from 'react';
import { Pet, UserApplication } from '../types';

interface ApplicationFormScreenProps {
  t: (path: string) => any;
  onBack: () => void;
  onComplete: (app: UserApplication | null) => void;
  pet: Pet | null;
  mode: 'adoption' | 'hosting' | 'rehome';
  locale?: 'en' | 'zh' | 'sv';
}

const ApplicationFormScreen: React.FC<ApplicationFormScreenProps> = ({ t, onBack, onComplete, pet, mode, locale = 'zh' }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<UserApplication | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const getTitle = () => {
    if (mode === 'adoption') return "Adoption Application";
    if (mode === 'hosting') return "Become a Host";
    return "List Your Pet";
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            newPhotos.push(reader.result);
            if (newPhotos.length === files.length) {
              setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsSubmitting(true);
      setTimeout(() => {
        const app: UserApplication | null = mode === 'adoption' ? {
          petId: pet?.id || '0',
          status: 'pending',
          date: new Date().toLocaleDateString()
        } : null;
        setSubmittedApp(app);
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-background-dark h-screen flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
        <div className="relative mb-8">
          <div className="size-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
            <span className="material-symbols-outlined text-green-500 text-6xl fill-1">check_circle</span>
          </div>
          <div className="absolute -top-2 -right-2 size-12 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-primary text-2xl">pets</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-text-main dark:text-white mb-4 text-center">
          {mode === 'adoption' ? "Application Sent!" : mode === 'hosting' ? "Registration Success!" : "Pet Listed!"}
        </h1>
        <p className="text-text-sub dark:text-gray-400 text-center mb-12 max-w-xs leading-relaxed">
          {mode === 'adoption'
            ? `Your request for ${pet?.name} has been received. We'll notify you as soon as the shelter reviews it.`
            : "Thank you for joining our community! Your profile is now under review by our safety team."}
        </p>

        <div className="w-full space-y-4">
          <button
            onClick={() => onComplete(submittedApp)}
            className="w-full h-16 bg-primary text-white rounded-[22px] font-bold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>View Messages</span>
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>

          <button
            onClick={() => onComplete(null)} // App.tsx will navigate to 'messages' by default, but we can change this logic if needed. For now, let's just use onComplete.
            className="w-full h-16 bg-gray-100 dark:bg-surface-dark text-text-main dark:text-white rounded-[22px] font-bold text-lg active:scale-95 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f6f8] dark:bg-background-dark text-[#111618] dark:text-white font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#f5f6f8]/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-lg mx-auto w-full">
          <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10">{getTitle()}</h2>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full pb-48 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-3 px-6 pt-6">
          <div className="flex justify-between items-center">
            <p className="text-primary font-bold text-sm uppercase tracking-wider">Step {step} of 3</p>
            <span className="text-text-sub text-xs font-medium">{Math.round((step / 3) * 100)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {/* Step 1: Personal or Basic Pet Info */}
        {step === 1 && (
          <div className="px-6 py-8 animate-in slide-in-from-right duration-300">
            <h1 className="text-[28px] font-extrabold leading-tight mb-3">
              {mode === 'rehome' ? "Tell us about your pet" : "Let's get to know you"}
            </h1>
            <p className="text-text-sub mb-8">
              {mode === 'rehome'
                ? "Provide basic pet details for potential families."
                : mode === 'adoption'
                  ? `Basic details to start your journey with ${pet?.name}.`
                  : "Help us verify your hosting setup."
              }
            </p>
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-bold">{mode === 'rehome' ? t('services.forms.petName') : "Full Name"}</span>
                <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 text-base shadow-sm focus:ring-primary" placeholder={mode === 'rehome' ? "Pet Name" : "Jane Doe"} />
              </label>
              {mode === 'rehome' && (
                <div className="grid grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">{t('services.forms.petGender')}</span>
                    <select className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">{t('services.forms.petAge')}</span>
                    <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm" placeholder="2 yrs" />
                  </label>
                </div>
              )}
              {mode !== 'rehome' && (
                <label className="block space-y-2">
                  <span className="text-sm font-bold">Phone Number</span>
                  <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 text-base shadow-sm focus:ring-primary" placeholder="(555) 000-0000" />
                </label>
              )}
              {mode === 'rehome' && (
                <label className="block space-y-2">
                  <span className="text-sm font-bold">{t('services.forms.petBreed')}</span>
                  <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm" placeholder="e.g., Beagle" />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Step 2: History or Detailed Info */}
        {step === 2 && (
          <div className="px-6 py-8 animate-in slide-in-from-right duration-300">
            <h1 className="text-[28px] font-extrabold leading-tight mb-3">
              {mode === 'rehome' ? "Health & Details" : mode === 'hosting' ? "Your Environment" : "Your Pet History"}
            </h1>
            <p className="text-text-sub mb-8">
              {mode === 'rehome' ? "Additional info to help the matching process." : "Tell us about your living situation."}
            </p>
            <div className="space-y-6">
              {mode === 'rehome' && (
                <>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">{t('services.forms.petAddress')}</span>
                    <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm" placeholder="Address or Area" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">{t('services.forms.vaccines')}</span>
                    <input className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm" placeholder={t('services.forms.vaccinesPlaceholder')} />
                  </label>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold">Photos</span>
                    <div className="flex gap-2 flex-wrap">
                      {uploadedPhotos.map((photo, idx) => (
                        <div key={idx} className="relative size-24 rounded-2xl overflow-hidden">
                          <img src={photo} alt={`Pet ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== idx))}
                            className="absolute top-1 right-1 size-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </div>
                      ))}
                      <label className="size-24 bg-gray-200 dark:bg-card-dark rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                        <span className="material-symbols-outlined text-gray-400">add_a_photo</span>
                        <span className="text-[10px] text-gray-400 mt-1">Upload</span>
                      </label>
                    </div>
                  </div>
                </>
              )}
              {mode === 'hosting' && (
                <>
                  <div className="space-y-3">
                    <p className="text-[15px] font-bold">Have you owned a pet before?</p>
                    <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-white dark:bg-card-dark rounded-2xl border-2 border-primary text-primary font-bold">Yes</button>
                      <button className="flex-1 py-4 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 font-bold">No</button>
                    </div>
                  </div>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">Home Type</span>
                    <select className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm">
                      <option>Apartment</option>
                      <option>House with yard</option>
                      <option>Villa / Estate</option>
                    </select>
                  </label>
                </>
              )}
              {mode === 'adoption' && (
                <>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">Previous Pet Experience</span>
                    <textarea className="w-full rounded-2xl border-none bg-white dark:bg-card-dark px-4 py-3 shadow-sm" rows={3} placeholder="Tell us about your experience with pets..."></textarea>
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-bold">Living Situation</span>
                    <select className="w-full rounded-2xl border-none bg-white dark:bg-card-dark h-14 px-4 shadow-sm">
                      <option>Apartment</option>
                      <option>House with yard</option>
                      <option>Villa / Estate</option>
                    </select>
                  </label>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Agreements */}
        {step === 3 && (
          <div className="px-6 py-8 animate-in slide-in-from-right duration-300">
            <h1 className="text-[28px] font-extrabold leading-tight mb-3">Final Agreement</h1>
            <p className="text-text-sub mb-8">Confirm your commitment to our community rules.</p>
            <div className="bg-white dark:bg-card-dark p-5 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm text-sm text-text-sub leading-relaxed max-h-60 overflow-y-auto mb-6">
              <p className="font-bold text-text-main dark:text-white mb-2">Terms of Service</p>
              {mode === 'rehome'
                ? "I certify that my pet is not being sold for commercial profit. I will vet applicants thoroughly to ensure a safe transition..."
                : mode === 'hosting'
                  ? "I agree to provide high-quality care and regular updates for guest pets. I will follow all local health regulations..."
                  : "I agree to provide a lifetime of care, nutrition, and love for this pet. I will not abandon or mistreat this companion..."
              }
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded text-primary focus:ring-primary size-5" />
              <span className="text-sm font-medium">I agree to the terms and standards</span>
            </label>
          </div>
        )
        }
      </main >

      {/* Fixed Footer constrained to mobile container width */}
      {
        !isSubmitting && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-card-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-10 z-40">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <span className="text-primary font-bold text-sm">Almost there!</span>
              </div>
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full bg-primary text-white text-lg font-extrabold h-16 rounded-[22px] shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                <span>{step === 3 ? (locale === 'en' ? 'Submit' : locale === 'sv' ? 'Skicka' : '提交') : (locale === 'en' ? 'Next' : locale === 'sv' ? 'Nästa' : '下一步')}</span>
                <span className="material-symbols-outlined">{step === 3 ? 'done_all' : 'arrow_forward'}</span>
              </button>
            </div>
          </div>
        )
      }

      {/* Loading Overlay during submission */}
      {
        isSubmitting && (
          <div className="fixed inset-0 z-[100] bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="size-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="font-bold text-primary animate-pulse text-lg">Processing Application...</p>
          </div>
        )
      }
    </div >
  );
};

export default ApplicationFormScreen;
