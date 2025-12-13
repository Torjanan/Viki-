export type PageView = 'welcome' | 'auth' | 'home' | 'social_viki' | 'ai' | 'profile' | 'video_studio' | 'settings' | 'web_builder';

export interface NavigationProps {
  onNavigate: (page: PageView) => void;
}