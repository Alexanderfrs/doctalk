
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e4c99325c529497f8a5d2c84f475bf0f',
  appName: 'DocTalk',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://e4c99325-c529-497f-8a5d-2c84f475bf0f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
