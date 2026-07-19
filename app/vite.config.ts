import { defineConfig, loadEnv } from "vite";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";
import { readFileSync as leseDatei } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname), "");
  // Zwei Auslieferungsformen aus EINER Codebasis:
  //   normal      → dist/, gehostete PWA, installierbar, Auto-Update
  //   einzeldatei → eine self-contained HTML-Datei, per Doppelklick zu öffnen
  // Die Einzeldatei ist erzeugt, nicht handgepflegt — wie controls.md aus controls.yaml.
  const einzeldatei = env.VITE_EINZELDATEI === "1";
  const basePath = einzeldatei ? "./" : env.VITE_BASE || env.VITE_BASE_PATH || "/";

  return {
    base: basePath,
    publicDir: einzeldatei ? false : "public",
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    plugins: [
      react(),
      tailwindcss(),
      // Einzeldatei: kein Service Worker (der braucht eine Herkunft, file:// hat keine).
      // Das Icon wird als data-URI eingebettet, sonst wäre „eine Datei" nicht wahr.
      ...(einzeldatei
        ? [
            {
              name: "icon-einbetten",
              transformIndexHtml(html: string) {
                const svg = leseDatei(path.resolve(__dirname, "public/icon.svg"), "utf8");
                const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`;
                return html
                  .replace(/href="\.?\/icon\.svg"/, `href="${uri}"`)
                  // An einem Inline-Skript ist crossorigin wirkungslos — aber es sieht
                  // aus wie ein Netzbezug und kostet in der Prüfung eine Rückfrage.
                  .replace(/(<script type="module")\s+crossorigin/, "$1");
              },
            },
            viteSingleFile({ removeViteModuleLoader: true }),
          ]
        : []),
      ...(einzeldatei ? [] : [VitePWA({
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
      })]),
    ],
    build: {
      outDir: einzeldatei ? "dist-einzeldatei" : "dist",
      // Einzeldatei: alles inline, kein Code-Splitting, keine getrennten Assets.
      cssCodeSplit: !einzeldatei,
      assetsInlineLimit: einzeldatei ? 100_000_000 : undefined,
      // Kein modulepreload-Polyfill: Es erzeugt einen fetch() der eigenen Chunks. Fachlich
      // harmlos (gleiche Herkunft), aber dieses Werkzeug wirbt mit nachprüfbarer Offline-
      // Eigenschaft — und „nachprüfbar" heißt hier: ein grep über dist/ findet keinen
      // einzigen Netzaufruf. Moderne Browser beherrschen modulepreload nativ.
      modulePreload: { polyfill: false },
      sourcemap: einzeldatei ? false : "hidden",
      // Kein manualChunks in der Einzeldatei: Der Single-File-Build schaltet Code-Splitting
      // ab, und beides zusammen lehnt der Bundler ab.
      rollupOptions: einzeldatei
        ? {}
        : {
            output: {
              manualChunks(id: string) {
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
