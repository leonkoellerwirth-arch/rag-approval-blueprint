# Werkzeuge

| Werkzeug | Was es tut |
|---|---|
| [`render_controls.py`](render_controls.py) | Rendert den Kontrollkatalog und die Readiness-Reports aus YAML. 249 Zeilen, getestet, ruff-clean. |
| [`../app/`](../app/) | Der Akte-Assistent — Vite + React + TypeScript, führt durch alle acht Teile der Freigabeakte. Eigene [README](../app/README.md). |

Mehr nicht — siehe `BIBLE.md`, INV-8. Kein drittes Werkzeug, kein Server, keine Datenbank.

## Warum der Assistent eine Anwendung ist und keine Einzeldatei

Eine erste Fassung war eine handgeschriebene HTML-Datei. Sie ist ersetzt: Das Haus hat mit
`dev/base`, Template `vite-react-pwa`, eine paved road für Weboberflächen, und `scripts/gate.sh`
sieht ein `app/`-Verzeichnis ausdrücklich vor. Eine zweite, handgepflegte Implementierung
desselben Werkzeugs wäre genau die Doppelung, die verrottet.

Der Preis ist ehrlich zu nennen: Die Anwendung lässt sich nicht mehr per Doppelklick aus dem
Dateisystem öffnen, weil ES-Module einen Server verlangen. Dafür gibt es Typprüfung, Lint,
33 Tests und einen Build, der im selben Gate läuft wie der Rest des Repositories.
