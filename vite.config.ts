import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import checker from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        checker({
            typescript: true,
            terminal: true,
            eslint: {
                dev: {
                    logLevel: ["warning", "error"]
                },
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx,css,md,json}"'
            },
            overlay: true
        }),
        macrosPlugin(),
        VitePWA()
    ],
    resolve: {
        alias: {
            "@i18n": path.resolve(__dirname, "./src/i18n.ts"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/App/components"),
            "@svgs": path.resolve(__dirname, "./src/assets/icons/svgs")
        }
    },
    build: {
        outDir: path.resolve(__dirname, "./build")
    },
    preview: {
        port: 3000,
        open: true
    },
    server: {
        port: 3000,
        open: true
    }
});
