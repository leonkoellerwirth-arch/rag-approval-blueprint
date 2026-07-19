# Werkzeuge

Genau zwei. Kein drittes, kein Framework, kein Server — siehe `BIBLE.md`, INV-8.

| Werkzeug | Was es tut |
|---|---|
| [`render_controls.py`](render_controls.py) | Rendert den Kontrollkatalog und die Readiness-Reports aus YAML. 249 Zeilen, getestet, ruff-clean. |
| [`akte-assistent.html`](akte-assistent.html) | Führt durch alle acht Teile der Freigabeakte und exportiert Markdown. |

## Der Akte-Assistent

**Öffnen:** Datei herunterladen und im Browser öffnen. Kein Build, keine Installation, kein
Server. Doppelklick genügt.

**Wo Ihre Eingaben liegen:** ausschließlich im lokalen Speicher Ihres Browsers. Die Datei
enthält **keinen einzigen Netzwerkaufruf und keine externe Ressource** — das ist nachprüfbar,
sie hat weder `fetch` noch `src="http…"`. Das ist keine Bequemlichkeitsentscheidung: Das
Werkzeug verarbeitet genau die vertraulichen Inhalte, vor denen dieses Repository warnt, und
darf sie deshalb nirgendwohin senden. Zum Weiterarbeiten an einem anderen Gerät oder zur
Übergabe dient der Zwischenstand als JSON.

### Was ihn von einem Formular unterscheidet

Er zeigt **keine Fortschrittsanzeige**. Ein Werkzeug, das „72 % ausgefüllt" meldet, optimiert
auf gefüllte Felder — und eine Akte, die nach Werkzeug aussieht, ist in der Prüfung schlechter
als keine.

Stattdessen läuft eine **Ehrlichkeitsprüfung** mit, die genau die Stellen beanstandet, an denen
Vorlagen erfahrungsgemäß scheitern:

- ein Dokument **ohne** offene Punkte — in der Prüfung erklärungsbedürftig, nicht vorbildlich;
- ein offener Punkt ohne Verantwortlichen oder Frist;
- **Weichmacher im Restrisiko** („grundsätzlich", „im Wesentlichen", „dürfte") — ein Gremium,
  das ein weichgespültes Restrisiko genehmigt, hat nichts genehmigt;
- ein Restrisiko ohne namentlich benannten Träger;
- Auflagen ohne benannte Folge bei Nichterfüllung — eine Auflage ohne Folge ist eine Bitte;
- eine Berechtigungsprüfung, die nur zur Indexierungszeit greift;
- „unmittelbar" als zugesagte Wirkzeit — keine prüfbare Aussage;
- ein Kill-Switch ohne Erprobung in Produktion;
- Integrität als „normal" eingestuft, obwohl Beschäftigte nach den Auskünften handeln.

**Was der Assistent nicht kann und nicht können soll:** denken. Die Aggregationsbewertung mit
dem Fachbereich, das ehrliche Restrisiko, der dokumentierte Konflikt zwischen zwei Funktionen —
das entsteht in Sitzungen, nicht in Eingabefeldern. Der Export ist eine belastbare Rohfassung
entlang der richtigen Struktur, kein fertiges Dokument.

### Oberfläche

Der Assistent verwendet das Designsystem des Hauses
(`dev/base/standards/extra/theme.css`): Themes `paper` und `ink`, Blau als primärer und Mint
als sekundärer Akzent, Messing für Fokus, die Signaturfläche mit ihrer leuchtenden
Messing-Oberkante. Der Token-Block ist wortgleich gespiegelt, weil die Datei ohne Build läuft
und nicht importieren kann; Komponenten verwenden kein rohes Hex.

## Offene Punkte

- Die Variable Fonts des Hauses liegen im Website-Repo; hier greift der System-Fallback.
- Der Assistent bildet die tragenden Abschnitte der acht Vorlagen ab, nicht jede Detailtabelle.
  Was fehlt, ergänzen Sie im exportierten Markdown anhand der Vorlagen in [`../akte/`](../akte/).
- Kein Ausdruck-Layout. Der Weg zur Vorlage führt über den Markdown-Export.
