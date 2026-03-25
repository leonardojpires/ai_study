import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        // Tailwind Vite plugin integrates Tailwind with Vite's build process
        tailwindcss(),
        react(),
    ],
    server: {
        port: 5173,
    },
});
