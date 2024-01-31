import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  // server: {
  //   host: 'localhost',
  //   port: 3000,
  // }
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true,
      // },
    }),
    federation({
      name: "reactHost",
      filename: "remoteEntry.js",
      remotes: {
        stockApp: "http://localhost:4173/assets/remoteEntry.js",
      },
    }),
  ],
});
