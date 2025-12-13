import React, { useState } from 'react';
import { PageView } from './types';
import { GRADIENT_BG } from './constants';
import { 
  WelcomeScreen, 
  AuthScreen, 
  HomeScreen, 
  SocialVikiScreen, 
  AiScreen, 
  ProfileScreen,
  VideoStudioScreen,
  SettingsScreen,
  WebBuilderScreen
} from './components/Screens';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('welcome');

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen onNavigate={setCurrentPage} />;
      case 'auth':
        return <AuthScreen onNavigate={setCurrentPage} />;
      case 'home':
        return <HomeScreen onNavigate={setCurrentPage} />;
      case 'social_viki':
        return <SocialVikiScreen onNavigate={setCurrentPage} />;
      case 'web_builder':
        return <WebBuilderScreen onNavigate={setCurrentPage} />;
      case 'ai':
        return <AiScreen onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentPage} />;
      case 'video_studio':
        return <VideoStudioScreen onNavigate={setCurrentPage} />;
      case 'settings':
        return <SettingsScreen onNavigate={setCurrentPage} />;
      default:
        return <WelcomeScreen onNavigate={setCurrentPage} />;
    }
  };

  // Check if we are in studio mode to remove the default gradient and centering
  const isStudioMode = currentPage === 'video_studio';

  return (
    <div className={`min-h-screen ${isStudioMode ? 'bg-[#050505]' : GRADIENT_BG} flex flex-col ${isStudioMode ? '' : 'items-center justify-center p-4'} overflow-hidden relative font-sans transition-colors duration-500`}>
      {/* Background Decorative Elements (Only for non-studio pages) */}
      {!isStudioMode && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Updated blobs for Dark Mode visibility (Screen blending instead of Multiply) */}
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`z-10 w-full ${isStudioMode ? 'h-full flex-1' : 'max-w-md flex flex-col items-center'}`}>
        {renderPage()}
      </div>
      
      {/* Footer Branding (Hidden in Studio) */}
      {!isStudioMode && (
        <div className="absolute bottom-4 text-white/10 text-[10px] z-0 font-tech tracking-[0.2em] uppercase">
          System Core: VIKI v3.0
        </div>
      )}

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-shine {
            animation: shine 1.5s infinite linear;
        }
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
        .scrolling-text {
            animation: scroll 10s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes shine {
            0% { transform: translateX(-100%) skewX(12deg); }
            100% { transform: translateX(200%) skewX(12deg); }
        }
        @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default App;