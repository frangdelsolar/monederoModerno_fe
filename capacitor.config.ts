import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.monederomoderno.app',
  appName: 'Monedero Moderno',
  webDir: 'dist/monederomoderno_fe',
  server: {
    androidScheme: 'https',
  },
};

export default config;
