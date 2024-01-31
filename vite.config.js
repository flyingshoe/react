import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/react',
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  }
});
