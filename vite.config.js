import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  server: {
    host: true, // Écoute sur toutes les adresses (localhost + réseau local IP)
    port: 5173, // Port par défaut de Vite pour Vue (modifiable si besoin)
    strictPort: true, // Optionnel : force l'utilisation de ce port précis
    allowedHosts: [
      'cuddly-garlics-sniff.loca.lt', // Votre URL actuelle
      '.loca.lt', // Optionnel : autorise toutes les futures URLs de LocalTunnel
    ],
  },
});
