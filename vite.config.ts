import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    // Development server configuration
    server: {
      port: 3000,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },

    // Build configuration
    build: {
      target: "esnext",
      minify: "terser",
      sourcemap: mode === "development",
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks
            vendor: ["react", "react-dom", "react-router"],
            // Split UI library chunks
            ui: ["@headlessui/react", "@heroicons/react"],
            // Split state management chunks
            state: ["zustand", "@tanstack/react-query"],
          },
          // Configure chunk file names
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
      // Configure chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable terser options for better minification
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: mode === "production",
        },
      },
    },

    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "react-router"],
    },

    // CSS configuration
    css: {
      devSourcemap: mode === "development",
      modules: {
        localsConvention: "camelCase",
      },
    },

    // Environment variables
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
