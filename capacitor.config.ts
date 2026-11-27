import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pogodigozborot.app',
  appName: 'Погоди го зборот',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
