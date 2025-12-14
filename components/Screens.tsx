import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { NavigationProps } from '../types';
import { CARD_STYLE, GLASS_PANEL, BUTTON_PRIMARY, BUTTON_SECONDARY, INPUT_STYLE, NEON_TEXT } from '../constants';
import { 
  ArrowRight, LogIn, Film, Bot, User, LogOut, Home, Send, Smartphone, Layout,
  Heart, MessageCircle, Share2, Loader2, Sparkles, Bookmark, Video, Clapperboard,
  Wand2, Settings, Play, Download, Sidebar, Menu, Shield, Bell, Moon, HelpCircle,
  Fingerprint, ArrowLeft, Mail, Lock, Eye, EyeOff, UserPlus, RefreshCw, Zap,
  CheckCircle, Scan, Monitor, FileVideo, Ratio, Globe, Plus, Image as ImageIcon,
  Code, Layers, Wifi, Battery, Signal, Mic, X, MoreVertical, Music2, Terminal,
  Cpu, Activity, Disc, GripHorizontal, ChevronRight, Minimize2, Maximize2, Trash2,
  Search, Pause, Volume2, VolumeX
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const StatusBar = ({ light = false }: { light?: boolean }) => (
  <div className={`w-full h-8 flex items-center justify-between px-6 text-[10px] font-tech ${light ? 'text-white' : 'text-white/40'} select-none z-50 absolute top-0 left-0 right-0 pointer-events-none`}>
    <span className="font-bold tracking-widest">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    <div className="flex items-center gap-3">
        <Signal size={12} />
        <Wifi size={12} />
        <div className="flex items-center gap-1">
            <span>100%</span>
            <Battery size={12} className="text-green-400 fill-green-400"/>
        </div>
    </div>
  </div>
);

const SystemBadge = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="flex flex-col bg-black/40 p-2 rounded-lg border border-white/5 w-20">
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">{label}</span>
        <span className={`text-xs font-bold font-tech ${color}`}>{value}</span>
    </div>
);

// --- 1. Welcome Screen ---
export const WelcomeScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-full max-w-md animate-fadeIn relative">
      <div className="absolute inset-0 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-6">
          <div className="relative">
             <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse"></div>
             <div className="bg-black/50 p-6 rounded-2xl border border-white/10 ring-1 ring-white/20 backdrop-blur-xl relative">
                <Layout size={64} className="text-pink-500" />
             </div>
          </div>
          
          <div className="space-y-2">
              <h1 className={`text-5xl font-black ${NEON_TEXT} font-tech tracking-tighter`}>
                VIKI AI
              </h1>
              <p className="text-cyan-400 font-tech tracking-[0.2em] text-sm uppercase">Future World Operating System</p>
          </div>
          
          <div className={`${GLASS_PANEL} p-6 w-full transform hover:scale-[1.02] transition-transform duration-300 group`}>
            <p className="text-gray-300 text-sm mb-6 font-medium leading-relaxed border-l-2 border-pink-500 pl-3 text-left">
              “Tor Janan ki taraf se VIKI AI WORLD join karne par khush-amdeed”
            </p>
            <button 
              onClick={() => onNavigate('auth')} 
              className={BUTTON_PRIMARY}
            >
              Initialize System <ArrowRight size={18} />
            </button>
          </div>
      </div>
      
      <div className="absolute bottom-10 text-[10px] text-white/20 font-mono">
          V.3.0.1 // SYSTEM_READY
      </div>
    </div>
  );
};

// --- 2. Auth Screen ---
export const AuthScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthAction = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        if (authMode === 'forgot') {
            setAuthMode('login');
        } else {
            onNavigate('home');
        }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md animate-fadeIn p-4 h-[100dvh] flex flex-col">
      <StatusBar />
      <div className="mt-16 flex-1 flex flex-col justify-center">
          <div className={`${GLASS_PANEL} p-8`}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold font-tech text-white uppercase tracking-wide">
                        {authMode === 'login' ? 'Access' : authMode === 'register' ? 'Join' : 'Recover'}
                    </h2>
                    <p className="text-xs text-pink-400 font-mono mt-1">SECURE_LOGIN_PROTOCOL</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-pink-500/20">
                    <Fingerprint size={24} className="text-white"/>
                </div>
            </div>

            <div className="space-y-5">
              {authMode === 'register' && (
                <div className="group">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block ml-1">Identity</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-pink-500" size={18}/>
                        <input type="text" placeholder="Username" className={`${INPUT_STYLE} pl-10`} />
                    </div>
                </div>
              )}

              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block ml-1">Comms ID</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-cyan-400" size={18}/>
                    <input type="email" placeholder="user@viki.ai" className={`${INPUT_STYLE} pl-10`} />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 block ml-1">Passcode</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-purple-400" size={18}/>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className={`${INPUT_STYLE} pl-10 pr-10`} 
                        />
                        <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-white/30 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>
                </div>
              )}

              <button 
                onClick={handleAuthAction} 
                disabled={isLoading}
                className={`${BUTTON_PRIMARY} mt-8 relative overflow-hidden group`}
              >
                {isLoading && (
                    <div className="absolute inset-0 bg-white/20 skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
                )}
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                        {authMode === 'login' && 'Establish Connection'}
                        {authMode === 'register' && 'Create Identity'}
                        {authMode === 'forgot' && 'Send Reset Signal'}
                    </>
                )}
              </button>
            </div>

            <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                {authMode === 'login' ? (
                    <>
                        <button onClick={() => setAuthMode('register')} className="hover:text-pink-400 transition-colors">Register</button>
                        <button onClick={() => setAuthMode('forgot')} className="hover:text-cyan-400 transition-colors">Reset Key</button>
                    </>
                ) : (
                    <button onClick={() => setAuthMode('login')} className="hover:text-white transition-colors">Return to Access</button>
                )}
            </div>
          </div>
      </div>
    </div>
  );
};

// --- 3. Home Screen ---
export const HomeScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [magicText, setMagicText] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleMagic = async () => {
    setMagicText("✨ DECRYPTING...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'One short witty cyberpunk style quote.',
      });
      setMagicText(response.text || "Encryption failed.");
    } catch (e) {
      setMagicText("Signal Lost.");
    }
  };

  const handleMoodScan = () => {
      setIsScanning(true);
      setTimeout(() => {
          const moods = ["BIO-RHYTHM: PEAK", "ENERGY: CRITICAL", "MODE: CREATIVE", "STATUS: CHARGED"];
          setMagicText(moods[Math.floor(Math.random() * moods.length)]);
          setIsScanning(false);
      }, 2000);
  };

  return (
    <div className="w-full max-w-md h-[100dvh] flex flex-col relative overflow-hidden">
      <StatusBar />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-12 pb-24 no-scrollbar space-y-5">
        
        {/* Header Widget */}
        <div className="flex items-center justify-between py-2">
            <div>
                <h2 className="text-2xl font-black font-tech text-white uppercase tracking-tighter">Command Center</h2>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-green-500">SYSTEM ONLINE</span>
                </div>
            </div>
            <div onClick={() => onNavigate('profile')} className="relative cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 p-[1px]">
                    <img src="https://picsum.photos/100/100" className="w-full h-full rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-black text-[9px] font-bold text-white px-1.5 py-0.5 rounded border border-white/20">LVL.9</div>
            </div>
        </div>

        {/* System Status Widget */}
        <div className={`${GLASS_PANEL} p-4 flex justify-between items-center`}>
            <SystemBadge label="CPU" value="34%" color="text-cyan-400" />
            <SystemBadge label="RAM" value="12GB" color="text-pink-400" />
            <SystemBadge label="NET" value="5G+" color="text-green-400" />
            <div className="h-8 w-[1px] bg-white/10"></div>
            <Activity className="text-white/20 animate-pulse" size={24} />
        </div>

        {/* VIKI Studio Banner */}
        <div 
            onClick={() => onNavigate('video_studio')}
            className="w-full h-40 rounded-2xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-pink-500/50 transition-all shadow-2xl"
        >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-center items-start z-10">
                <div className="bg-pink-600/90 text-white text-[9px] font-bold px-2 py-1 rounded mb-2 font-tech">PRO TOOL</div>
                <h3 className="text-2xl font-black font-tech text-white italic tracking-wide">VIKI STUDIO</h3>
                <p className="text-gray-300 text-xs max-w-[200px] mb-4">Professional AI Video Synthesis & NLE Editor</p>
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs group-hover:translate-x-2 transition-transform">
                    <span>LAUNCH EDITOR</span> <ArrowRight size={14} />
                </div>
            </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('social_viki')} className={`${CARD_STYLE} !p-0 h-32 relative group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-5 flex flex-col h-full justify-between relative z-10">
                    <div className="bg-white/10 w-fit p-2 rounded-lg"><Film className="text-purple-400" size={20}/></div>
                    <div>
                        <span className="text-white font-bold text-lg font-tech block">Viki Social</span>
                        <span className="text-white/40 text-[10px]">Full Immersion</span>
                    </div>
                </div>
            </button>

            <button onClick={() => onNavigate('web_builder')} className={`${CARD_STYLE} !p-0 h-32 relative group overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-green-900/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-5 flex flex-col h-full justify-between relative z-10">
                    <div className="bg-white/10 w-fit p-2 rounded-lg"><Code className="text-cyan-400" size={20}/></div>
                    <div>
                        <span className="text-white font-bold text-lg font-tech block">Web Builder</span>
                        <span className="text-white/40 text-[10px]">Dev Environment</span>
                    </div>
                </div>
            </button>

            <button onClick={() => onNavigate('ai')} className={`${CARD_STYLE} !p-0 col-span-2 relative group overflow-hidden border-blue-500/20`}>
                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-600/10 to-transparent"></div>
                 <div className="p-5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
                            <Bot className="text-blue-400" size={24}/>
                        </div>
                        <div>
                            <span className="text-white font-bold text-lg font-tech block">AI Neural Link</span>
                            <span className="text-blue-200/60 text-xs">Waiting for input...</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <ChevronRight size={18} />
                    </div>
                 </div>
            </button>
        </div>

        {/* Utilities */}
        <div className="grid grid-cols-2 gap-3 pb-4">
            <div onClick={handleMagic} className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl cursor-pointer hover:bg-yellow-500/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-yellow-400"/>
                    <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider">Daily Drop</span>
                </div>
                <p className="text-white/60 text-[10px] leading-tight">Unlock daily creative inspiration.</p>
            </div>
            
            <div onClick={handleMoodScan} className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl cursor-pointer hover:bg-red-500/10 transition-colors">
                 <div className="flex items-center gap-2 mb-2">
                    {isScanning ? <Loader2 size={14} className="text-red-400 animate-spin"/> : <Scan size={14} className="text-red-400"/>}
                    <span className="text-red-400 font-bold text-xs uppercase tracking-wider">Bio Scan</span>
                </div>
                <p className="text-white/60 text-[10px] leading-tight">{isScanning ? "Analyzing..." : "Check vital stats."}</p>
            </div>
        </div>

        {magicText && (
            <div className="bg-black/80 border border-green-500/30 p-4 rounded-xl font-mono text-xs text-green-400 animate-fadeIn shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                > {magicText} <span className="animate-pulse">_</span>
            </div>
        )}

      </div>
      
      {/* Bottom Floating Dock (Quick Actions) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl z-50">
        <Home size={22} className="text-white hover:text-pink-500 transition-colors cursor-pointer" />
        <div className="w-[1px] h-4 bg-white/20"></div>
        <Plus size={24} className="text-pink-500 hover:scale-110 transition-transform cursor-pointer" onClick={() => onNavigate('video_studio')}/>
        <div className="w-[1px] h-4 bg-white/20"></div>
        <User size={22} className="text-white hover:text-cyan-500 transition-colors cursor-pointer" onClick={() => onNavigate('profile')}/>
      </div>
    </div>
  );
};

// --- 5. SOCIAL VIKI SCREEN (TikTok Clone) ---
export const SocialVikiScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'for_you' | 'following'>('for_you');
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Real stock video URLs for testing
  const videos = [
    {
      id: 1,
      url: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-traffic-at-night-34563-large.mp4",
      user: "cyber_drifter",
      desc: "Neon nights in the matrix 🌃✨ #cyberpunk #viki #nightcity",
      likes: "12.5K",
      comments: "842",
      shares: "1.2K"
    },
    {
      id: 2,
      url: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-glitch-effect-portrait-28151-large.mp4",
      user: "glitch_queen_x",
      desc: "System override initiated. 🔴 Do you feel the shift? #glitch #art #ai",
      likes: "8.1K",
      comments: "320",
      shares: "500"
    },
    {
      id: 3,
      url: "https://assets.mixkit.co/videos/preview/mixkit-robot-toy-walking-on-a-table-41125-large.mp4",
      user: "mech_master",
      desc: "My new assistant is learning fast 🤖 #robotics #future #tech",
      likes: "45K",
      comments: "2.1K",
      shares: "5K"
    }
  ];

  // Auto-play/pause logic using IntersectionObserver
  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.6 // Trigger when 60% of video is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        if (video) {
          if (entry.isIntersecting) {
            video.play().catch(e => console.log("Auto-play prevented"));
          } else {
            video.pause();
            video.currentTime = 0; // Reset video when scrolled away
          }
        }
      });
    }, options);

    const videoElements = document.querySelectorAll('.viki-video-container');
    videoElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleVideoTap = (e: React.MouseEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.muted) {
        setMuted(false);
        video.muted = false;
    } else {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-black text-white relative flex flex-col overflow-hidden">
      <StatusBar light={true} />
      
      {/* Top Navigation Tab */}
      <div className="absolute top-8 left-0 right-0 z-30 flex justify-center items-center gap-6 pt-2 text-shadow-md pointer-events-auto">
        <span 
          onClick={() => setActiveTab('following')} 
          className={`cursor-pointer font-bold text-md transition-opacity duration-300 ${activeTab === 'following' ? 'text-white scale-110' : 'text-white/60'}`}
        >
          Following
        </span>
        <div className="w-[1px] h-3 bg-white/20"></div>
        <span 
          onClick={() => setActiveTab('for_you')} 
          className={`cursor-pointer font-bold text-md transition-opacity duration-300 ${activeTab === 'for_you' ? 'text-white scale-110' : 'text-white/60'}`}
        >
          For You
        </span>
      </div>

      {/* Search Icon Top Right */}
      <div className="absolute top-10 right-5 z-30 pointer-events-auto">
        <Search size={24} className="text-white drop-shadow-md cursor-pointer hover:scale-110 transition-transform"/>
      </div>

      {/* Main Feed Container */}
      <div ref={containerRef} className="flex-1 w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black scroll-smooth">
        {videos.map((item) => (
          <div key={item.id} className="viki-video-container w-full h-full snap-start relative bg-gray-900 overflow-hidden flex items-center justify-center">
            
            {/* Video Player */}
            <video
              src={item.url}
              className="w-full h-full object-cover"
              loop
              muted={muted}
              playsInline
              onClick={handleVideoTap}
            />

            {/* Mute Indicator Overlay */}
            {muted && (
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm animate-pulse">
                        <VolumeX size={32} className="text-white/80"/>
                     </div>
                 </div>
            )}

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

            {/* Right Sidebar Actions */}
            <div className="absolute bottom-24 right-2 flex flex-col items-center gap-6 z-20 pb-4 pointer-events-auto">
               {/* Profile Avatar */}
               <div className="relative group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white p-0.5 overflow-hidden transition-transform group-hover:scale-110">
                    <img src={`https://picsum.photos/100/100?random=${item.id}`} className="w-full h-full rounded-full object-cover"/>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 rounded-full p-0.5 border border-black transform transition-transform group-hover:rotate-180">
                      <Plus size={10} className="text-white"/>
                  </div>
               </div>

               {/* Like */}
               <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <Heart size={32} className="text-white fill-white/10 group-hover:fill-pink-500 group-hover:text-pink-500 transition-colors drop-shadow-lg"/>
                  <span className="text-white text-xs font-bold drop-shadow-md">{item.likes}</span>
               </div>
               
               {/* Comment */}
               <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <MessageCircle size={32} className="text-white fill-white/10 group-hover:text-cyan-400 transition-colors drop-shadow-lg"/>
                  <span className="text-white text-xs font-bold drop-shadow-md">{item.comments}</span>
               </div>

               {/* Bookmark */}
               <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <Bookmark size={32} className="text-white fill-white/10 group-hover:text-yellow-400 transition-colors drop-shadow-lg"/>
                  <span className="text-white text-xs font-bold drop-shadow-md">Save</span>
               </div>
               
               {/* Share */}
               <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <Share2 size={32} className="text-white fill-white/10 group-hover:text-green-400 transition-colors drop-shadow-lg"/>
                  <span className="text-white text-xs font-bold drop-shadow-md">{item.shares}</span>
               </div>

               {/* Rotating Music Disc */}
               <div className="w-12 h-12 bg-gray-800 rounded-full border-[6px] border-gray-900 flex items-center justify-center animate-spin-slow overflow-hidden mt-2 relative">
                   <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-black rounded-full"></div>
                   <img src={`https://picsum.photos/50/50?random=${item.id + 50}`} className="w-7 h-7 rounded-full object-cover relative z-10"/>
               </div>
            </div>

            {/* Bottom Info Section */}
            <div className="absolute bottom-4 left-0 right-16 z-20 px-4 pb-16 flex flex-col justify-end items-start pointer-events-none">
                <div className="pointer-events-auto cursor-pointer mb-2">
                   <h3 className="font-bold text-lg text-white drop-shadow-md hover:underline">@{item.user}</h3>
                </div>
                <div className="pointer-events-auto">
                  <p className="text-sm text-white/90 leading-snug drop-shadow-md mb-2">
                      {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-90">
                    <Music2 size={14} className="text-white animate-pulse-fast"/>
                    <div className="w-32 overflow-hidden">
                       <span className="text-xs font-mono text-white scrolling-text whitespace-nowrap">Original Sound - VIKI AI Neural Mix • Cyber Beats Vol.1</span>
                    </div>
                </div>
            </div>

          </div>
        ))}
      </div>

      {/* Social Bottom Navigation Bar (Authentic TikTok Style) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 z-40 flex items-center justify-around px-2 pb-1 pointer-events-auto">
          <div onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 cursor-pointer group w-14">
             <Home size={22} className="text-white/60 group-hover:text-white transition-colors"/>
             <span className="text-[9px] text-white/60 group-hover:text-white">Home</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
             <UserPlus size={22} className="text-white/60 group-hover:text-white transition-colors"/>
             <span className="text-[9px] text-white/60 group-hover:text-white">Friends</span>
          </div>
          
          {/* Central Create Button */}
          <div onClick={() => onNavigate('video_studio')} className="relative cursor-pointer hover:scale-105 transition-transform px-4">
             <div className="absolute left-0.5 bg-cyan-400 w-9 h-7 rounded-lg"></div>
             <div className="absolute right-0.5 bg-pink-600 w-9 h-7 rounded-lg"></div>
             <div className="relative bg-white w-9 h-7 rounded-lg flex items-center justify-center">
                 <Plus size={18} className="text-black font-bold"/>
             </div>
          </div>

          <div className="flex flex-col items-center gap-1 cursor-pointer group w-14">
             <MessageCircle size={22} className="text-white/60 group-hover:text-white transition-colors"/>
             <span className="text-[9px] text-white/60 group-hover:text-white">Inbox</span>
          </div>
          <div onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1 cursor-pointer group w-14">
             <User size={22} className="text-white/60 group-hover:text-white transition-colors"/>
             <span className="text-[9px] text-white/60 group-hover:text-white">Profile</span>
          </div>
      </div>
    </div>
  );
};

// --- 8. WEB BUILDER SCREEN ---
export const WebBuilderScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');

    return (
        <div className="w-full max-w-md h-[100dvh] flex flex-col bg-[#0d0d0d] animate-fadeIn">
            <StatusBar />
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                    <div onClick={() => onNavigate('home')} className="p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                        <ArrowLeft size={18} className="text-gray-400"/>
                    </div>
                    <span className="font-tech font-bold text-white text-lg">WEB.DEV</span>
                </div>
                <div className="flex bg-black/50 rounded-lg p-1 border border-white/10">
                    <button 
                        onClick={() => setViewMode('visual')}
                        className={`p-1.5 rounded ${viewMode === 'visual' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                    >
                        <Layout size={16}/>
                    </button>
                    <button 
                        onClick={() => setViewMode('code')}
                        className={`p-1.5 rounded ${viewMode === 'code' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                    >
                        <Code size={16}/>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                {viewMode === 'visual' ? (
                    <div className="p-4 space-y-4 overflow-y-auto no-scrollbar">
                        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
                            <Sparkles className="text-blue-400 shrink-0 mt-1" size={20}/>
                            <div>
                                <h3 className="text-white font-bold text-sm">AI Generator</h3>
                                <p className="text-blue-200/60 text-xs mt-1">Describe your site, and VIKI will write the code.</p>
                                <button className="mt-3 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-500 transition-colors">Generate Site</button>
                            </div>
                        </div>

                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-4 mb-2">Templates</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#151515] border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:border-pink-500/50 transition-all">
                                <div className="h-24 bg-gray-800 relative flex items-center justify-center">
                                    <Globe className="text-white/20 group-hover:text-pink-500 transition-colors" size={32}/>
                                </div>
                                <div className="p-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-white font-bold text-sm">Portfolio</h4>
                                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                    </div>
                                    <p className="text-gray-500 text-[10px] mt-1">React / Tailwind</p>
                                </div>
                            </div>
                            <div className="bg-[#151515] border border-white/5 rounded-xl overflow-hidden group cursor-pointer hover:border-cyan-500/50 transition-all">
                                <div className="h-24 bg-gray-800 relative flex items-center justify-center">
                                    <Monitor className="text-white/20 group-hover:text-cyan-500 transition-colors" size={32}/>
                                </div>
                                <div className="p-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-white font-bold text-sm">Landing Page</h4>
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                    </div>
                                    <p className="text-gray-500 text-[10px] mt-1">HTML5 / CSS3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 bg-[#0d0d0d] p-4 font-mono text-xs overflow-y-auto no-scrollbar">
                        <div className="flex gap-2 mb-4 text-gray-500">
                             <span>index.html</span>
                             <span className="text-white/20">|</span>
                             <span>style.css</span>
                        </div>
                        <div className="space-y-1">
                            <div className="text-gray-500">1 <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> 'react';</div>
                            <div className="text-gray-500">2</div>
                            <div className="text-gray-500">3 <span className="text-purple-400">const</span> <span className="text-yellow-300">App</span> = () ={'>'} {'{'}</div>
                            <div className="text-gray-500">4 &nbsp;&nbsp;<span className="text-pink-400">return</span> (</div>
                            <div className="text-gray-500">5 &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-cyan-400">div</span> <span className="text-green-400">className</span>="container"{'>'}</div>
                            <div className="text-gray-500">6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-cyan-400">h1</span>{'>'}Hello World{'</'}<span className="text-cyan-400">h1</span>{'>'}</div>
                            <div className="text-gray-500">7 &nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-cyan-400">div</span>{'>'}</div>
                            <div className="text-gray-500">8 &nbsp;&nbsp;);</div>
                            <div className="text-gray-500">9 {'}'};</div>
                            <div className="text-gray-500">10</div>
                            <div className="text-gray-500 animate-pulse">|</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- SETTINGS SCREEN ---
export const SettingsScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    return (
        <div className="w-full max-w-md animate-fadeIn h-[100dvh] flex flex-col bg-black">
            <StatusBar />
            <div className="flex items-center gap-4 p-4 mb-4 border-b border-white/10">
                <button onClick={() => onNavigate('profile')} className="bg-white/5 p-2 rounded-lg text-white hover:bg-white/10">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white font-tech uppercase">System Config</h2>
            </div>

            <div className="space-y-4 px-4 flex-1 overflow-y-auto no-scrollbar">
                <div className={`${GLASS_PANEL} p-0 overflow-hidden`}>
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="text-white font-bold flex items-center gap-2 font-tech tracking-wider"><Bell size={16} className="text-pink-400"/> NOTIFICATIONS</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">System Alerts</span>
                            <div className="w-10 h-5 bg-green-500/20 border border-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-3.5 h-3.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Marketing</span>
                            <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer"><div className="absolute left-1 top-0.5 w-3.5 h-3.5 bg-gray-400 rounded-full"></div></div>
                        </div>
                    </div>
                </div>

                <div className={`${GLASS_PANEL} p-0 overflow-hidden`}>
                    <div className="p-4 border-b border-white/5 bg-white/5">
                        <h3 className="text-white font-bold flex items-center gap-2 font-tech tracking-wider"><Shield size={16} className="text-cyan-400"/> SECURITY PROTOCOLS</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">2FA Auth</span>
                            <div className="w-10 h-5 bg-green-500/20 border border-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-3.5 h-3.5 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div></div>
                        </div>
                    </div>
                </div>

                 <button className="w-full py-4 text-red-500/60 text-xs hover:text-red-400 transition-colors font-mono border border-red-500/20 rounded-xl hover:bg-red-500/5">
                    // INITIATE ACCOUNT TERMINATION
                </button>
            </div>
        </div>
    );
};

// --- 4. VIKI STUDIO SCREEN (NLE EDITOR) ---
export const VideoStudioScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    
    // Settings State
    const [studioSettings, setStudioSettings] = useState({
        quality: '1080p',
        defaultRatio: '16:9',
        format: 'MP4'
    });

    const handleGenerateVideo = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setProgress(0);
        setStatusText("INITIALIZING RENDER ENGINE...");

        try {
           const phases = [
               { p: 20, t: "PARSING PROMPT SYNTAX..." },
               { p: 50, t: "COMPOSITING NEURAL FRAMES..." },
               { p: 80, t: "APPLYING PHYSICS..." },
               { p: 100, t: "RENDER COMPLETE." }
           ];

           for (const phase of phases) {
               await new Promise(r => setTimeout(r, 1000));
               setProgress(phase.p);
               setStatusText(phase.t);
           }
        } catch (error) {
            setStatusText("ERR: API HANDSHAKE FAILED");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full h-[100dvh] bg-[#050505] flex flex-col relative overflow-hidden font-tech text-white">
            {/* Professional Top Bar */}
            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-[#0a0a0a]">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-pink-600 rounded-md flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                        <Clapperboard size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold tracking-widest text-xs">VIKI STUDIO</span>
                        <span className="text-[8px] text-gray-500">PRO NLE V.2.0</span>
                    </div>
                </div>
                <div className="flex gap-4">
                     <button className="p-2 hover:bg-white/5 rounded text-gray-400"><Settings size={16}/></button>
                     <button onClick={() => onNavigate('home')} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded text-gray-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Toolbar */}
                <div className="w-12 bg-[#080808] border-r border-white/5 flex flex-col items-center py-4 gap-6 z-10">
                    <button className="text-pink-500 p-2 bg-pink-500/10 rounded-lg"><Wand2 size={20} /></button>
                    <button className="text-gray-500 hover:text-white p-2"><TypeIcon size={20} /></button>
                    <button className="text-gray-500 hover:text-white p-2"><Music2 size={20} /></button>
                    <button className="text-gray-500 hover:text-white p-2"><Layers size={20} /></button>
                </div>

                {/* Main Viewport */}
                <div className="flex-1 flex flex-col">
                    {/* Preview Area */}
                    <div className="flex-1 bg-[#050505] p-6 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                        <div className="w-full max-w-lg aspect-video bg-black border border-white/10 rounded-lg shadow-2xl relative overflow-hidden group">
                             {/* Mock Video Player UI */}
                             <div className="absolute inset-0 flex items-center justify-center">
                                 {isGenerating ? (
                                     <div className="text-center">
                                         <Loader2 className="animate-spin text-pink-500 mx-auto mb-4" size={32}/>
                                         <div className="font-mono text-xs text-pink-400 animate-pulse">{statusText}</div>
                                         <div className="mt-2 w-32 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                                             <div className="h-full bg-pink-500 transition-all duration-300" style={{width: `${progress}%`}}></div>
                                         </div>
                                     </div>
                                 ) : (
                                     <Play size={48} className="text-white/20 group-hover:text-white/50 transition-colors"/>
                                 )}
                             </div>
                             {/* Safe Area Markers */}
                             <div className="absolute inset-4 border border-white/5 pointer-events-none border-dashed"></div>
                        </div>
                    </div>

                    {/* Timeline Area (Bottom) */}
                    <div className="h-48 bg-[#0a0a0a] border-t border-white/10 flex flex-col">
                        {/* Timeline Tools */}
                        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 text-gray-500">
                             <span className="text-xs font-mono text-white">00:00:00:00</span>
                             <div className="h-4 w-[1px] bg-white/10"></div>
                             <button className="hover:text-white"><Minus size={14}/></button>
                             <div className="w-20 h-1 bg-white/10 rounded-full"><div className="w-1/2 h-full bg-white/30"></div></div>
                             <button className="hover:text-white"><Plus size={14}/></button>
                        </div>
                        {/* Tracks */}
                        <div className="flex-1 p-2 space-y-1 overflow-y-auto no-scrollbar">
                            <div className="h-8 bg-blue-900/20 border border-blue-500/20 rounded flex items-center px-2 text-[10px] text-blue-400 w-3/4 relative">
                                Video Track 1
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500 cursor-ew-resize"></div>
                            </div>
                            <div className="h-8 bg-purple-900/20 border border-purple-500/20 rounded flex items-center px-2 text-[10px] text-purple-400 w-1/2 ml-10">
                                Audio Track 1 (Voiceover)
                            </div>
                             <div className="h-8 bg-yellow-900/20 border border-yellow-500/20 rounded flex items-center px-2 text-[10px] text-yellow-400 w-full">
                                Effect: Glitch Overlay
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Properties Panel */}
                <div className="w-64 bg-[#080808] border-l border-white/5 p-4 overflow-y-auto no-scrollbar">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Properties</h3>
                    
                    <div className="space-y-4">
                        <div>
                             <label className="text-[10px] text-gray-500 block mb-1">PROMPT</label>
                             <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-xs text-white h-24 focus:border-pink-500 outline-none resize-none"
                                placeholder="Describe scene..."
                             />
                        </div>

                        <button 
                            onClick={handleGenerateVideo}
                            disabled={isGenerating}
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded text-xs transition-all disabled:opacity-50"
                        >
                            {isGenerating ? 'RENDERING...' : 'GENERATE'}
                        </button>

                        <div className="pt-4 border-t border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] text-gray-500">RESOLUTION</span>
                                <span className="text-[10px] text-white font-mono">1080P</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500">FPS</span>
                                <span className="text-[10px] text-white font-mono">60</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 6. AI Chat Screen ---
export const AiScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>(() => {
      try {
          const saved = localStorage.getItem('viki_chat_history');
          return saved ? JSON.parse(saved) : [{ role: 'ai', text: 'SYSTEM: NEURAL LINK ESTABLISHED. HOW MAY I ASSIST?' }];
      } catch (e) {
          return [{ role: 'ai', text: 'SYSTEM: NEURAL LINK ESTABLISHED. HOW MAY I ASSIST?' }];
      }
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
      scrollToBottom();
      localStorage.setItem('viki_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleClearMemory = () => {
      const resetState = [{ role: 'ai' as const, text: 'SYSTEM: MEMORY PURGED. DATABASE RESET.' }];
      setMessages(resetState);
      localStorage.setItem('viki_chat_history', JSON.stringify(resetState));
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: { systemInstruction: "Be a helpful AI assistant." }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "NO DATA." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "ERR: CONNECTION SEVERED." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md h-[100dvh] flex flex-col bg-black animate-fadeIn">
      <StatusBar />
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
             <Bot className="text-blue-400" size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-tech tracking-wider">VIKI NEURAL NET</h2>
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-blue-200/50 font-mono">ONLINE</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleClearMemory} className="text-gray-500 hover:text-red-400 transition-colors p-2" title="Wipe Memory">
                <Trash2 size={18} />
            </button>
            <button onClick={() => onNavigate('home')} className="text-gray-500 hover:text-white transition-colors p-2">
                <X size={20} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-[85%] p-4 rounded-xl relative ${
              msg.role === 'user' 
                ? 'bg-blue-900/20 border border-blue-500/30 text-white rounded-tr-sm' 
                : 'bg-[#111] border border-white/10 text-gray-300 rounded-tl-sm'
            }`}>
              {msg.role === 'ai' && <div className="absolute -top-2 -left-2"><Cpu size={12} className="text-gray-500"/></div>}
              <p className="text-xs leading-relaxed font-mono">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-[#111] border border-white/10 px-4 py-3 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#0a0a0a] border-t border-white/10">
        <div className="flex gap-2 items-center bg-[#151515] rounded-xl p-2 border border-white/5 focus-within:border-blue-500/50 transition-colors">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..." 
            className="flex-1 bg-transparent border-none text-white px-2 focus:outline-none placeholder-gray-600 text-xs font-mono"
            disabled={isLoading}
          />
          <button className="text-gray-500 hover:text-white p-2"><Mic size={16}/></button>
          <button 
            onClick={handleSend} 
            disabled={isLoading}
            className={`p-2 rounded-lg transition-all ${input.trim() ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500'}`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 7. Profile Screen ---
export const ProfileScreen: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-md h-[100dvh] flex flex-col bg-black animate-fadeIn">
      <StatusBar />
      <div className="relative h-48 bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black"></div>
          <div className="absolute top-4 left-4 z-10 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black" onClick={() => onNavigate('home')}>
              <ArrowLeft size={20} className="text-white"/>
          </div>
      </div>
      
      <div className="px-6 -mt-16 relative z-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-2xl bg-[#111] p-1 border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <img src="https://picsum.photos/200/200" className="w-full h-full rounded-xl object-cover" />
          </div>
          
          <div className="mt-4 text-center">
              <h2 className="text-2xl font-black font-tech text-white uppercase tracking-wider">NEO_USER</h2>
              <p className="text-xs text-purple-400 font-mono">ELITE MEMBER • ID: 9384</p>
          </div>

          {/* Gamification Level */}
          <div className="w-full mt-6 bg-[#111] border border-white/10 rounded-xl p-4">
              <div className="flex justify-between text-xs mb-2 font-bold text-gray-400 uppercase tracking-wider">
                  <span>Current Rank</span>
                  <span className="text-pink-500">Cyber Adept</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
              </div>
              <div className="flex justify-between text-[10px] mt-2 font-mono text-gray-600">
                  <span>LVL 9</span>
                  <span>1250 / 2000 XP</span>
                  <span>LVL 10</span>
              </div>
          </div>

          <div className="w-full mt-4 space-y-2">
             <button onClick={() => onNavigate('settings')} className={`${CARD_STYLE} !p-4 flex items-center justify-between group cursor-pointer`}>
                 <div className="flex items-center gap-3">
                     <Settings className="text-gray-400 group-hover:text-white transition-colors" size={18}/>
                     <span className="text-sm font-bold text-gray-300 group-hover:text-white">System Config</span>
                 </div>
                 <ChevronRight size={16} className="text-gray-600"/>
             </button>
             
             <button className={`${CARD_STYLE} !p-4 flex items-center justify-between group cursor-pointer border-red-500/20 hover:border-red-500/50`}>
                 <div className="flex items-center gap-3">
                     <LogOut className="text-red-400 group-hover:text-red-300 transition-colors" size={18}/>
                     <span className="text-sm font-bold text-red-400 group-hover:text-red-300" onClick={() => onNavigate('welcome')}>Terminate Session</span>
                 </div>
             </button>
          </div>
      </div>
    </div>
  );
};

// Helper for Video Studio
const Minus = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

// Helper for Studio Toolbar
const TypeIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
);