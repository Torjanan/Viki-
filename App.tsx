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
    <div className={`min-h-screen ${isStudioMode ? 'bg-[#0f1115]' : GRADIENT_BG} flex flex-col ${isStudioMode ? '' : 'items-center justify-center p-4'} overflow-hidden relative font-sans transition-colors duration-500`}>
      {/* Background Decorative Elements (Only for non-studio pages) */}
      {!isStudioMode && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`z-10 w-full ${isStudioMode ? 'h-full flex-1' : 'max-w-md flex flex-col items-center'}`}>
        {renderPage()}
      </div>
      
      {/* Footer Branding (Hidden in Studio) */}
      {!isStudioMode && (
        <div className="absolute bottom-4 text-white/20 text-xs z-0">
          Powered by VIKI AI
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
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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