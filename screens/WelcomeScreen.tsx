
import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
  t: (path: string) => any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, t }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const slides = [
    {
      title: t('welcome.adoptTitle'),
      description: t('welcome.adoptDesc'),
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=1200",
      label: "领养指南"
    },
    {
      title: t('welcome.hostTitle'),
      description: t('welcome.hostDesc'),
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200",
      label: "托管流程"
    },
    {
      title: t('welcome.rehomeTitle'),
      description: t('welcome.rehomeDesc'),
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=1200",
      label: "转让说明"
    }
  ];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 模拟登录/注册
    setTimeout(() => {
      setIsLoading(false);
      onStart();
    }, 1500);
  };

  const handleGuestMode = () => {
    onStart();
  };

  if (showAuth) {
    return (
      <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-12">
          <button
            onClick={() => setShowAuth(false)}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 z-0 h-[45%] w-full overflow-hidden">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200")` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-4xl font-extrabold mb-2">
              Welcome to <span className="text-primary">Pawsitive</span>
            </h1>
            <p className="text-white/90 text-sm font-medium">
              Join our community of pet lovers
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <div className="relative z-10 mt-auto w-full flex flex-col bg-white dark:bg-background-dark rounded-t-[3rem] pt-8 pb-10 px-8 min-h-[60%]">
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 dark:bg-surface-dark p-1 rounded-2xl mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${authMode === 'login'
                  ? 'bg-white dark:bg-card-dark shadow-sm text-primary'
                  : 'text-text-sub'
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${authMode === 'signup'
                  ? 'bg-white dark:bg-card-dark shadow-sm text-primary'
                  : 'text-text-sub'
                }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-4 flex-1">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-14 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white placeholder:text-text-sub/50 font-medium focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full h-14 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white placeholder:text-text-sub/50 font-medium focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-main dark:text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 px-4 rounded-2xl bg-gray-100 dark:bg-surface-dark border-none text-text-main dark:text-white placeholder:text-text-sub/50 font-medium focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {authMode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-bold text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                authMode === 'login' ? 'Login' : 'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-text-sub font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 bg-white dark:bg-surface-dark border-2 border-gray-200 dark:border-gray-700 rounded-xl font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 h-12 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>

            {/* Guest Mode */}
            <button
              type="button"
              onClick={handleGuestMode}
              className="w-full h-12 bg-gray-100 dark:bg-surface-dark text-text-main dark:text-white rounded-2xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mt-2"
            >
              Continue as Guest
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col justify-between overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 h-[70%] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${currentStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
              }`}
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
        ))}
      </div>

      {/* Content Card */}
      <div className="relative z-10 mt-auto w-full flex flex-col bg-white dark:bg-background-dark rounded-t-[3rem] pt-12 pb-10 px-8 min-h-[45%] shadow-[0_-15px_50px_-10px_rgba(0,0,0,0.15)]">

        {/* Preview Label */}
        <div className="absolute top-8 left-8">
          <span className="bg-[#444] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm opacity-90">
            Preview
          </span>
        </div>

        <div className="flex flex-col items-center mt-4">
          <h1 className="text-text-main dark:text-white tracking-tight text-[34px] font-[800] leading-[1.1] text-center max-w-xs mx-auto">
            {slides[currentStep].title.includes('Furry') || slides[currentStep].title.includes('毛茸茸') ? (
              <>
                {currentStep === 0 ? "Find Your " : ""}
                <span className="text-primary">{currentStep === 0 ? "Furry" : slides[currentStep].title.split(' ')[0]}</span>
                <br />
                {currentStep === 0 ? "Soulmate" : slides[currentStep].title.split(' ').slice(1).join(' ')}
              </>
            ) : (
              slides[currentStep].title
            )}
          </h1>

          <p className="text-[#617c89] dark:text-gray-400 text-[15px] font-medium leading-relaxed mt-6 px-4 text-center max-w-sm">
            {slides[currentStep].description}
          </p>
        </div>

        <div className="mt-auto w-full flex flex-col items-center gap-10 pt-8">
          {/* Pagination Indicators */}
          <div className="flex flex-row items-center justify-center gap-1.5">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`transition-all duration-500 cursor-pointer ${currentStep === index
                    ? 'h-1.5 w-6 rounded-full bg-primary'
                    : 'h-1.5 w-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full max-w-sm cursor-pointer group relative flex items-center justify-center rounded-[1.25rem] h-[68px] bg-primary text-white shadow-2xl shadow-primary/30 transition-all active:scale-[0.97] hover:brightness-110"
          >
            <span className="relative text-[17px] font-bold tracking-tight">
              {currentStep === slides.length - 1 ? t('welcome.getStarted') : t('welcome.continue')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
