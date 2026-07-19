import { defineConfig, loadEnv } from "vite";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname), "");
  const basePath = env.VITE_BASE || env.VITE_BASE_PATH || "/";

  return {
    base: basePath,
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        devOptions: { enabled: false },
        workbox: {
          clientsClaim: true,
          // false: eine laufende Bearbeitung darf nicht mitten im Satz neu geladen werden.
          skipWaiting: false,
          cleanupOutdatedCaches: true,
          navigateFallback: "index.html",
          globPatterns: ["**/*.{js,css,html,woff2,ico,svg,png}"],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        },
        manifest: {
          name: "Freigabeakte — Assistent",
          short_name: "Freigabeakte",
          description:
            "Assistent für die Freigabeakte eines RAG-Systems im regulierten Umfeld — lokal, ohne Netzzugriff.",
          lang: "de",
          display: "standalone",
          // Farben aus dem Designsystem des Hauses (theme.css, Theme „paper").
          theme_color: "#eef3f8",
          background_color: "#eef3f8",
          start_url: basePath,
          scope: basePath,
          icons: [{ src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
        },
      }),
    ],
    build: {
      // Kein modulepreload-Polyfill: Es erzeugt einen fetch() der eigenen Chunks. Fachlich
      // harmlos (gleiche Herkunft), aber dieses Werkzeug wirbt mit nachprüfbarer Offline-
      // Eigenschaft — und „nachprüfbar" heißt hier: ein grep über dist/ findet keinen
      // einzigen Netzaufruf. Moderne Browser beherrschen modulepreload nativ.
      modulePreload: { polyfill: false },
      sourcemap: "hidden",
      assetsInlineLimit: (filePath) =>
        /\.(woff2?|ttf|otf|eot)$/i.test(filePath) ? false : undefined,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return undefined;
            if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react-vendor";
            return undefined;
          },
        },
      },
    },
    server: { port: 5273 },
    test: {
      globals: true,
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
    define: {
      __DEV__: JSON.stringify(command !== "build"),
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
