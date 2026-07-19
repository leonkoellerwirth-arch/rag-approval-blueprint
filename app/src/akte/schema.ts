/**
 * Die acht Teile der Freigabeakte als Datenmodell.
 *
 * Die Inhalte stammen aus den Vorlagen in `akte/` desselben Repositories. Wenn dort
 * etwas geändert wird, gehört es hier nachgezogen — die Vorlagen sind führend, nicht
 * dieses Schema.
 */

export type FeldTyp = "text" | "mehrzeilig" | "auswahl" | "tabelle";

export interface Feld {
  readonly k: string;
  readonly label: string;
  readonly typ: FeldTyp;
  /** Leitfrage oder Beispielformulierung unter dem Label. */
  readonly hilfe?: string;
  /** Nur bei `auswahl`. */
  readonly optionen?: readonly string[];
  /** Nur bei `tabelle`. */
  readonly spalten?: readonly string[];
}

export interface Abschnitt {
  readonly titel: string;
  /** Der Hinweis, der erklärt, warum dieser Abschnitt in der Prüfung zählt. */
  readonly hinweis?: string;
  readonly felder: readonly Feld[];
}

export interface Teil {
  readonly nr: string;
  readonly titel: string;
  readonly akteur: string;
  readonly prozess: string;
  readonly abschnitte: readonly Abschnitt[];
  /** „Was die prüfende Funktion hier typischerweise fragt.“ */
  readonly fragen: readonly string[];
}

export const AKTE: readonly Teil[] = [
  {
    nr: "01",
    titel: "Schutzbedarfsfeststellung",
    akteur: "Informationssicherheit (ISB/CISO)",
    prozess: "Schutzbedarfs- und Sicherheitsfreigabeprozess",
    abschnitte: [
      {
        titel: "Gegenstand",
        felder: [
          { k: "sys", label: "System", typ: "text", hilfe: "Name und Kurzbeschreibung" },
          { k: "zweck", label: "Fachlicher Zweck", typ: "mehrzeilig" },
          {
            k: "nutzer",
            label: "Nutzerkreis",
            typ: "text",
            hilfe: "Wer darf das System nutzen — und wer ausdrücklich nicht?",
          },
          { k: "quellen", label: "Einbezogene Quellsysteme", typ: "mehrzeilig" },
          {
            k: "extern",
            label: "Externe Verarbeitung",
            typ: "text",
            hilfe: "Embedding-Erzeugung? LLM-Aufruf? Verweis auf Teil 03",
          },
        ],
      },
      {
        titel: "Datenklassen",
        hinweis:
          "Jede Datenklasse einzeln erfassen — der Schutzbedarf ergibt sich aus der höchsten, nicht aus dem Durchschnitt. Die Klasse, die am häufigsten fehlt, ist das Prompt-Protokoll des Systems selbst: Es dokumentiert, wonach einzelne Beschäftigte gefragt haben.",
        felder: [
          {
            k: "dk",
            label: "Datenklassen",
            typ: "tabelle",
            spalten: ["Klasse", "Beispielinhalte", "Quelle", "Personenbezug", "Besondere Kategorien"],
          },
        ],
      },
      {
        titel: "Verarbeitungsstufen",
        hinweis:
          "Nicht nur je Datenklasse bewerten, sondern je Stufe: Quelle → Fragmente → Embeddings → Index → Retrieval → Prompt → Antwort → Protokoll. Wer nur die Quelldokumente bewertet, hat die Verarbeitung nicht erfasst, die das System ausmacht.",
        felder: [
          {
            k: "stufen",
            label: "Bewertung je Stufe",
            typ: "tabelle",
            spalten: ["Stufe", "Artefakt", "Schutzbedarf V/I/Vf", "Begründung"],
          },
        ],
      },
      {
        titel: "Aggregationsbewertung",
        hinweis:
          "Der Kern dieser Vorlage. Entsteht durch Zusammenführung ein höherer Schutzbedarf als bei den Einzelquellen? Dokumentieren Sie auch das negative Ergebnis — die Frage kommt in der Prüfung sicher, und „darüber haben wir nicht nachgedacht“ ist die einzige wirklich schlechte Antwort.",
        felder: [
          {
            k: "agg",
            label: "Geprüfte Hypothesen",
            typ: "tabelle",
            spalten: ["Hypothese", "Bewertet mit", "Ergebnis", "Maßnahme"],
          },
          {
            k: "aggerg",
            label: "Bewertungsergebnis Aggregation",
            typ: "mehrzeilig",
            hilfe: "normal / hoch / sehr hoch — mit Begründung",
          },
        ],
      },
      {
        titel: "Gesamtergebnis",
        felder: [
          { k: "gv", label: "Vertraulichkeit", typ: "auswahl", optionen: ["normal", "hoch", "sehr hoch"] },
          { k: "gvb", label: "Begründung Vertraulichkeit", typ: "mehrzeilig" },
          { k: "gi", label: "Integrität", typ: "auswahl", optionen: ["normal", "hoch", "sehr hoch"] },
          {
            k: "gib",
            label: "Begründung Integrität",
            typ: "mehrzeilig",
            hilfe: "Prüfen Sie ausdrücklich, ob eine Falschauskunft zu regulatorisch relevantem Fehlverhalten führen kann. Dann ist „normal“ nicht haltbar.",
          },
          { k: "gf", label: "Verfügbarkeit", typ: "auswahl", optionen: ["normal", "hoch", "sehr hoch"] },
          {
            k: "gfb",
            label: "Begründung Verfügbarkeit",
            typ: "mehrzeilig",
            hilfe: "Existiert ein fachlicher Rückfallweg — und wird er nach der Einführung noch gepflegt?",
          },
        ],
      },
    ],
    fragen: [
      "Haben Sie den Schutzbedarf für Embeddings und Index getrennt bewertet — oder nur für die Quelldokumente?",
      "Welche Aggregationshypothesen haben Sie geprüft, und mit wem?",
      "Warum haben Sie die Integrität mit „normal“ eingestuft, wenn Beschäftigte nach den Auskünften handeln?",
      "Ist das Prompt-Protokoll als eigene Datenklasse bewertet?",
      "Wann wurde die Feststellung zuletzt überprüft — und was hat die letzte neue Datenquelle daran geändert?",
    ],
  },

  {
    nr: "02",
    titel: "DSFA-Baustein RAG",
    akteur: "Datenschutzbeauftragter (DSB)",
    prozess: "Datenschutz-Folgenabschätzung nach Art. 35 DSGVO",
    abschnitte: [
      {
        titel: "Verarbeitungsübersicht",
        hinweis:
          "Kein Ersatz für Ihre DSFA-Methodik, sondern der RAG-spezifische Baustein darin.",
        felder: [
          { k: "bez", label: "Bezeichnung der Verarbeitung", typ: "text" },
          {
            k: "gruppen",
            label: "Betroffene Personengruppen",
            typ: "mehrzeilig",
            hilfe: "Die regelmäßig übersehene Gruppe: Personen, die im Korpus vorkommen, aber das System nicht nutzen — Ansprechpartner in Prozessbeschreibungen, Beteiligte in Fallbeispielen.",
          },
          {
            k: "rechts",
            label: "Rechtsgrundlage (Art. 6 DSGVO)",
            typ: "mehrzeilig",
            hilfe: "Je Personengruppe getrennt bewerten",
          },
          {
            k: "art9",
            label: "Besondere Kategorien (Art. 9 DSGVO)",
            typ: "text",
            hilfe: "nein / ja — welche, und wie ausgeschlossen bzw. begründet",
          },
          {
            k: "pflicht",
            label: "DSFA-Pflicht bejaht?",
            typ: "text",
            hilfe: "ja/nein — Begründung, Datum, durch wen",
          },
        ],
      },
      {
        titel: "Sind Embeddings personenbezogene Daten?",
        hinweis:
          "Die Frage, die generische Vorlagen nicht haben und jede Prüfung stellt. Es gibt keine falsche Antwort außer der ausweichenden. Ein Embedding ist kein Klartext, aber auch keine Anonymisierung: Aus Embeddings lassen sich Inhalte in erheblichem Umfang rekonstruieren.",
        felder: [
          {
            k: "emb",
            label: "Einordnung des Verantwortlichen",
            typ: "mehrzeilig",
            hilfe: "personenbezogen / nicht personenbezogen — mit Begründung",
          },
          { k: "embrek", label: "Betrachtete Rekonstruktionsmöglichkeiten", typ: "mehrzeilig" },
          {
            k: "embzug",
            label: "Wer hat Zugriff auf die Rohvektoren, auch administrativ?",
            typ: "mehrzeilig",
          },
        ],
      },
      {
        titel: "Betroffenenrechte",
        hinweis:
          "Die Rechte gelten unverändert; nur ihre Umsetzung ist in einem Vektorindex ungewohnt. Bei der Auskunft ist Vollständigkeit über eine Ähnlichkeitssuche nicht zusicherbar — der tragfähige Weg führt über die Quellsysteme.",
        felder: [
          {
            k: "rechte",
            label: "Umsetzung je Recht",
            typ: "tabelle",
            spalten: ["Recht", "Umsetzung im System", "Nachweis"],
          },
        ],
      },
      {
        titel: "Protokollierung als eigene Verarbeitung",
        felder: [
          { k: "protumf", label: "Was wird protokolliert?", typ: "mehrzeilig" },
          { k: "protfrist", label: "Aufbewahrungsfrist und Löschung", typ: "text" },
          { k: "protzug", label: "Wer darf Protokolle einsehen, in welchem Verfahren?", typ: "mehrzeilig" },
          {
            k: "protmb",
            label: "Mitbestimmung eingebunden?",
            typ: "text",
            hilfe: "Status, Datum — Verweis auf Teil 08",
          },
        ],
      },
      {
        titel: "Risikobewertung",
        hinweis:
          "Die folgenden Risiken sind RAG-spezifisch und sollten ausdrücklich vorkommen — auch wenn Sie sie als gering einstufen.",
        felder: [
          {
            k: "risiken",
            label: "Risiken für die Rechte und Freiheiten",
            typ: "tabelle",
            spalten: ["Risiko", "Eintritt", "Schwere", "Maßnahme", "Restrisiko"],
          },
        ],
      },
      {
        titel: "Ergebnis",
        felder: [
          { k: "ergrest", label: "Verbleibendes Gesamtrisiko", typ: "mehrzeilig" },
          {
            k: "art36",
            label: "Vorherige Konsultation nach Art. 36 DSGVO erforderlich?",
            typ: "auswahl",
            optionen: ["nein", "ja"],
          },
          { k: "dsbemp", label: "Stellungnahme und Empfehlung des DSB", typ: "mehrzeilig" },
        ],
      },
    ],
    fragen: [
      "Sind Embeddings für Sie personenbezogene Daten — und wie begründen Sie das?",
      "Zeigen Sie mir, wie Sie ein Auskunftsersuchen zu einer Person in diesem System beantworten.",
      "Woraus ergibt sich, dass der Anbieter Ihre Prompts nicht zum Training verwendet?",
      "Welche Personen stehen im Korpus, die das System nicht nutzen?",
      "Wie ist ausgeschlossen, dass die Prompt-Protokolle zur Leistungskontrolle verwendet werden?",
    ],
  },

  {
    nr: "03",
    titel: "Auslagerung und IKT-Drittparteien",
    akteur: "Auslagerungsmanagement / DORA-Verantwortliche",
    prozess: "IKT-Drittpartei- und Auslagerungsprozess",
    abschnitte: [
      {
        titel: "Gegenstand des Fremdbezugs",
        hinweis:
          "Häufigster Fehler: Bewertet wird „das LLM“, während Vektordatenbank, Hosting, Embedding-Dienst und Gateway unbewertet bleiben. Listen Sie alle IKT-Dienstleister der Lösung auf.",
        felder: [
          {
            k: "dl",
            label: "IKT-Dienstleister der Lösung",
            typ: "tabelle",
            spalten: ["Dienstleister", "Bezogene Leistung", "Sitz / Region", "Bewertet?"],
          },
          { k: "vertrag", label: "Vertragsverhältnis und Laufzeit", typ: "text" },
        ],
      },
      {
        titel: "Einordnung",
        felder: [
          {
            k: "ikt",
            label: "IKT-Dienstleistung im Sinne von DORA?",
            typ: "auswahl",
            optionen: ["ja", "nein"],
          },
          {
            k: "kwf",
            label: "Unterstützt eine kritische oder wichtige Funktion? (DORA Art. 3 Nr. 22)",
            typ: "auswahl",
            optionen: ["nein", "ja"],
          },
          {
            k: "kwfb",
            label: "Begründung der Einstufung",
            typ: "mehrzeilig",
            hilfe: "Beide Antworten sind vertretbar; nicht vertretbar ist eine Einstufung ohne dokumentierte Begründung. Die Einstufung ist eine Momentaufnahme — bei Einbettung in einen Prozess neu prüfen.",
          },
          {
            k: "reg",
            label: "Eintrag im Informationsregister (DORA Art. 28 Abs. 3)",
            typ: "text",
            hilfe: "vorhanden? Referenz, Stand",
          },
        ],
      },
      {
        titel: "Vertragsinhalte",
        hinweis:
          "Prüfen Sie gegen den vorliegenden Vertrag, nicht gegen die Website des Anbieters. Ausstiegsstrategien sind kein eigener Artikel, sondern Teil der wesentlichen Vertragsbestimmungen (DORA Art. 30 Abs. 3 Buchst. f).",
        felder: [
          {
            k: "vp",
            label: "Vertragsprüfliste",
            typ: "tabelle",
            spalten: ["Vertragspunkt", "Geregelt?", "Fundstelle im Vertrag", "Bewertung"],
          },
        ],
      },
      {
        titel: "Subunternehmer und Konzentration",
        felder: [
          {
            k: "sub",
            label: "Subunternehmerkette",
            typ: "tabelle",
            spalten: ["Ebene", "Dienstleister", "Leistung", "Sitz / Region"],
          },
          {
            k: "konz",
            label: "Bewertung des Konzentrationsrisikos (DORA Art. 29)",
            typ: "mehrzeilig",
            hilfe: "Bei Sprachmodellen ist die Ausweichoption selten „ein anderer Anbieter mit gleichem Verhalten“.",
          },
        ],
      },
      {
        titel: "Exit-Strategie",
        hinweis:
          "Ein Exit, der nur als Absicht beschrieben ist, wird als nicht vorhanden bewertet. Ein kleiner, dokumentierter Nachweis schlägt eine große Behauptung.",
        felder: [
          { k: "exit", label: "Zielzustand und Vorgehen", typ: "mehrzeilig" },
          { k: "exitn", label: "Was ist nicht migrierbar?", typ: "mehrzeilig" },
          { k: "exitt", label: "Erprobt?", typ: "text", hilfe: "ja/nein — Datum, Umfang, Evidenz" },
        ],
      },
    ],
    fragen: [
      "Ist der Anbieter im Informationsregister erfasst — und wer sind seine Subunternehmer?",
      "Unterstützt der Dienst eine kritische oder wichtige Funktion — und wie haben Sie das begründet?",
      "Zeigen Sie mir die Vertragsstelle, aus der sich ergibt, dass Ihre Inhalte nicht zum Training verwendet werden.",
      "Ihre Exit-Strategie — was davon wurde erprobt?",
      "Was passiert, wenn der Anbieter das Modell austauscht?",
    ],
  },

  {
    nr: "04",
    titel: "Betriebskonzept",
    akteur: "IT-Betrieb und Systemverantwortung",
    prozess: "Betriebsübernahme und Änderungswesen",
    abschnitte: [
      {
        titel: "Rollen und Verantwortlichkeiten",
        felder: [
          {
            k: "rollen",
            label: "Rollen im Betrieb",
            typ: "tabelle",
            spalten: ["Rolle", "Aufgabe", "Besetzt durch", "Vertretung"],
          },
          {
            k: "ft",
            label: "Funktionstrennung",
            typ: "mehrzeilig",
            hilfe: "Wer Inhalte in den Index geben darf und wer die Berechtigungen dazu vergibt, darf nicht dieselbe Person sein.",
          },
        ],
      },
      {
        titel: "Berechtigungsprozess",
        hinweis:
          "Der Abschnitt, an dem Freigaben real scheitern. Entscheidend ist nicht, dass die Quellsysteme berechtigt sind, sondern dass zur Query-Zeit gegen die aktuelle Berechtigung geprüft wird — einschließlich Trefferliste, Metadaten und Quellenangaben.",
        felder: [
          {
            k: "bzeit",
            label: "Zeitpunkt der Berechtigungsprüfung",
            typ: "auswahl",
            optionen: [
              "zur Query-Zeit gegen die aktuelle Berechtigung",
              "nur zur Indexierungszeit",
              "gemischt",
            ],
          },
          { k: "bquelle", label: "Herkunft und Aktualität der Berechtigungsinformation", typ: "text" },
          {
            k: "bentzug",
            label: "Zugesagte Wirkzeit bei Entzug",
            typ: "text",
            hilfe: "„unmittelbar“ ist keine prüfbare Aussage — nennen Sie einen Wert.",
          },
          {
            k: "bmeta",
            label: "Wie ist ausgeschlossen, dass Metadaten und Quellenangaben Inhalte preisgeben?",
            typ: "mehrzeilig",
          },
          { k: "badmin", label: "Umgang mit administrativen Zugriffen auf den Index", typ: "mehrzeilig" },
        ],
      },
      {
        titel: "Änderungswesen",
        hinweis:
          "Bei RAG gibt es Änderungen, die kein klassisches Change-Verfahren erfasst, weil sie nicht wie Software aussehen — aber das Systemverhalten vollständig verändern.",
        felder: [
          {
            k: "chg",
            label: "Änderungsarten",
            typ: "tabelle",
            spalten: ["Änderungsart", "Verfahren", "Genehmigung durch", "Erneute Tests"],
          },
          {
            k: "chganb",
            label: "Anbieterseitige Modelländerung",
            typ: "mehrzeilig",
            hilfe: "Wie erfahren Sie davon, und was tun Sie, wenn Sie es nicht rechtzeitig erfahren? Wenn Sie es nicht steuern können, ist es ein Restrisiko für Teil 07 — kein Detail für den Betrieb.",
          },
        ],
      },
      {
        titel: "Betriebsüberwachung und Protokollierung",
        felder: [
          {
            k: "mon",
            label: "Überwachung",
            typ: "tabelle",
            spalten: ["Gegenstand", "Kennzahl / Signal", "Schwellenwert", "Reaktion"],
          },
          {
            k: "prot",
            label: "Protokollierung",
            typ: "tabelle",
            spalten: ["Was wird protokolliert", "Zweck", "Aufbewahrung", "Zugriff"],
          },
          {
            k: "meld",
            label: "Meldeweg für fehlerhafte Auskünfte",
            typ: "mehrzeilig",
            hilfe: "Kein Komfort, sondern der wirksamste Halluzinationsdetektor im Betrieb.",
          },
        ],
      },
    ],
    fragen: [
      "Zeigen Sie mir, wie die Berechtigung geprüft wird — zur Indexierungszeit oder zur Query-Zeit?",
      "Ein Modellwechsel — ist das bei Ihnen ein Change?",
      "Was passiert, wenn der Anbieter das Modell ohne Ankündigung aktualisiert?",
      "Wer darf die Prompt-Protokolle lesen, und wer kontrolliert das?",
      "Nennen Sie die letzten drei Änderungen am System und zeigen Sie mir die Genehmigungen.",
    ],
  },

  {
    nr: "05",
    titel: "Notfallkonzept",
    akteur: "BCM- und Notfallverantwortliche",
    prozess: "Notfall- und Wiederanlaufverfahren",
    abschnitte: [
      {
        titel: "Einordnung",
        hinweis:
          "Der gefährlichere Zustand ist nicht der Ausfall, sondern das fehlerhafte Weiterlaufen: Das System antwortet, aber falsch, veraltet oder auf Basis von Inhalten, die es nicht mehr zeigen dürfte.",
        felder: [
          {
            k: "rueck",
            label: "Fachlicher Rückfallweg",
            typ: "text",
            hilfe: "Was tun die Nutzenden, wenn das System steht?",
          },
          { k: "rto", label: "RTO / RPO", typ: "text" },
        ],
      },
      {
        titel: "Szenarien",
        felder: [
          {
            k: "szen",
            label: "Szenarien",
            typ: "tabelle",
            spalten: ["Szenario", "Erkennung", "Sofortmaßnahme", "Entscheidung durch"],
          },
          {
            k: "s3",
            label: "Fehlerhafte Antworten im Regelbetrieb",
            typ: "mehrzeilig",
            hilfe: "Der eigentliche Notfall. Wie erkennen Sie ihn — und wie ermitteln Sie im Nachlauf, wer eine falsche Auskunft erhalten hat?",
          },
        ],
      },
      {
        titel: "Degradationsmodi",
        hinweis:
          "Legen Sie vorab fest, was das System tut, wenn eine Komponente ausfällt. Ein System, das im Fehlerfall improvisiert, tut regelmäßig das Falsche.",
        felder: [
          {
            k: "deg",
            label: "Stufen",
            typ: "tabelle",
            spalten: ["Stufe", "Verhalten des Systems", "Auslöser", "Freigabe durch"],
          },
          {
            k: "degaus",
            label: "Antwortgenerierung ohne Retrieval ist ausgeschlossen durch",
            typ: "mehrzeilig",
            hilfe: "Der eine Modus, den es nicht geben darf. Beschreiben Sie, wie er technisch verhindert wird.",
          },
        ],
      },
      {
        titel: "Kill-Switch",
        hinweis:
          "Die einzige Zeile, die in einer Prüfung wirklich zählt, ist die Erprobung. Ein nie ausgelöster Kill-Switch ist eine Behauptung.",
        felder: [
          { k: "ks", label: "Technische Umsetzung", typ: "text" },
          { k: "kswirk", label: "Wirkzeit (Ziel und gemessen)", typ: "text" },
          {
            k: "ksrollen",
            label: "Auslöseberechtigte",
            typ: "text",
            hilfe: "Mindestens zwei, damit Urlaub und Krankheit abgedeckt sind",
          },
          {
            k: "ksausser",
            label: "Auslösung außerhalb der Geschäftszeiten",
            typ: "mehrzeilig",
            hilfe: "Wer, über welchen Weg, mit welcher Erreichbarkeit?",
          },
          {
            k: "kswieder",
            label: "Wiederinbetriebnahme durch",
            typ: "text",
            hilfe: "Bewusst nicht dieselbe Rolle wie die auslösende",
          },
          {
            k: "kstest",
            label: "Letzte Erprobung in Produktion",
            typ: "text",
            hilfe: "Datum, auslösende Person, Evidenz",
          },
        ],
      },
      {
        titel: "Wiederanlauf",
        felder: [
          {
            k: "wa",
            label: "Prüfschritte vor der Wiederfreigabe",
            typ: "tabelle",
            spalten: ["Prüfschritt", "Verantwortlich", "Evidenz"],
          },
          {
            k: "waloesch",
            label: "Löschabgleich nach Wiederherstellung",
            typ: "mehrzeilig",
            hilfe: "Nach einem Restore kann der Index Inhalte enthalten, die zwischenzeitlich gelöscht wurden. Ein Restore ist bei RAG ein datenschutzrelevanter Vorgang.",
          },
        ],
      },
    ],
    fragen: [
      "Wann wurde der Kill-Switch zuletzt tatsächlich ausgelöst, und wer war das?",
      "Was macht das System, wenn der Index nicht erreichbar ist?",
      "Wie merken Sie, dass das System falsch antwortet?",
      "Nach einem Restore — woher wissen Sie, dass gelöschte Inhalte nicht wieder da sind?",
      "Wer entscheidet um 22 Uhr an einem Samstag über die Abschaltung?",
    ],
  },

  {
    nr: "06",
    titel: "Testnachweise",
    akteur: "Projektleitung und Qualitätssicherung",
    prozess: "Projekt-Stage-Gates und Freigabevorbereitung",
    abschnitte: [
      {
        titel: "Teststatus",
        hinweis:
          "Nachweise müssen entstehen, während gebaut wird — nicht danach. Legen Sie das Evidenzformat fest, bevor Sie testen; nachträglich lässt es sich nicht mehr erzeugen, ohne dass es nachträglich aussieht.",
        felder: [
          {
            k: "tests",
            label: "Tests",
            typ: "tabelle",
            spalten: ["Test", "Status", "Datum", "Ergebnis", "Offene Maßnahme"],
          },
        ],
      },
      {
        titel: "Die Tests, an denen Freigaben scheitern",
        felder: [
          {
            k: "t1",
            label: "T1 — Negativ-Retrieval (Berechtigungswirkung)",
            typ: "mehrzeilig",
            hilfe: "Bestanden nur, wenn weder Inhalt noch Existenzhinweis — Titel, Fundstelle, Zusammenfassung — sichtbar ist. Typischer Befund: Die Antwort ist leer, aber die Quellenliste nennt den Dateinamen.",
          },
          {
            k: "t3",
            label: "T3 — Löschung über die gesamte Ableitungskette",
            typ: "mehrzeilig",
            hilfe: "Umfasst Quelle, Fragmente, Embeddings, Index einschließlich soft-gelöschter Einträge, Caches, Sicherungen und Protokolle. Beruht die Aussage zum Index auf einem API-Aufruf?",
          },
          {
            k: "t4",
            label: "T4 — Aggregation und Leakage über Dokumentgrenzen",
            typ: "mehrzeilig",
            hilfe: "Nicht automatisierbar; braucht Fachwissen, nicht Technik.",
          },
        ],
      },
      {
        titel: "Referenzfragenkatalog",
        felder: [
          {
            k: "rfk",
            label: "Umfang und Zusammenstellung",
            typ: "text",
            hilfe: "Durch den Fachbereich, nicht durch die Entwicklung",
          },
          { k: "rfkschwelle", label: "Schwellenwert für die Freigabe", typ: "text" },
          {
            k: "rfkohne",
            label: "Kategorie „nicht beantwortbar“",
            typ: "mehrzeilig",
            hilfe: "Die wichtigste Kategorie. Ein System, das auf eine unbeantwortbare Frage eine plausible Antwort erfindet, ist gefährlicher als eines, das zu oft „weiß ich nicht“ sagt. Getrennt messen, strenger schwellen.",
          },
        ],
      },
      {
        titel: "Evidenzformat",
        hinweis:
          "Ein bestandener Test, von dem nur eine Folie mit einem grünen Haken übrig ist, ist keine Evidenz.",
        felder: [
          {
            k: "ev",
            label: "Festgelegtes Evidenzformat",
            typ: "mehrzeilig",
            hilfe: "Mindestens: Test-ID, Kontrollbezug, Umgebung, Systemstand, Datum, durchführende Person, Stichprobe und ihre Begründung, Vorgehen, Rohdaten, Ergebnis, Abweichungen, Ablage, Aufbewahrung.",
          },
          {
            k: "evpb",
            label: "Umgang mit personenbezogenen Inhalten in der Evidenz",
            typ: "mehrzeilig",
            hilfe: "Der Nachweis der Vertraulichkeit darf kein neues Vertraulichkeitsproblem erzeugen.",
          },
        ],
      },
    ],
    fragen: [
      "Zeigen Sie mir das Rohprotokoll zu Test T1 — nicht die Zusammenfassung.",
      "In welcher Umgebung wurde getestet, und mit welchen Berechtigungen?",
      "Wie ist die Stichprobe zustande gekommen?",
      "Was wurde nach dem letzten Modellwechsel erneut getestet?",
      "Welcher Test ist nicht bestanden worden, und was ist daraus geworden?",
    ],
  },

  {
    nr: "07",
    titel: "Freigabevorlage",
    akteur: "Projektleitung und Enterprise-Architektur",
    prozess: "Freigabe-Entscheidung im zuständigen Gremium",
    abschnitte: [
      {
        titel: "Beschlussvorschlag",
        hinweis:
          "Zwei Seiten sind eine Vorgabe, keine Empfehlung. Ein Gremium entscheidet nicht besser, weil es mehr Text bekommt; es entscheidet später.",
        felder: [
          { k: "gremium", label: "Gremium und Sitzungstermin", typ: "text" },
          {
            k: "beschluss",
            label: "Beschlussvorschlag",
            typ: "mehrzeilig",
            hilfe: "Ein bis drei Sätze in Gremiensprache",
          },
          { k: "alt", label: "Geprüfte und verworfene Alternativen", typ: "mehrzeilig" },
        ],
      },
      {
        titel: "Worum es geht",
        felder: [
          {
            k: "worum",
            label: "Sachverhalt",
            typ: "mehrzeilig",
            hilfe: "Fünf bis acht Zeilen. Eine Zahl, die den Nutzen belegt, ist mehr wert als drei Adjektive.",
          },
          {
            k: "nutzen",
            label: "Erwarteter Nutzen — und woraus er belegt ist",
            typ: "mehrzeilig",
            hilfe: "Gemessen oder angenommen? Die Frage kommt.",
          },
          { k: "kosten", label: "Kosten (Aufbau / laufend)", typ: "text" },
        ],
      },
      {
        titel: "Risiko und Restrisiko",
        hinweis:
          "Der wichtigste Abschnitt der Vorlage. Schreiben Sie das Restrisiko in Ihre eigenen Worte, nicht in Konjunktive — ein Gremium, das ein weichgespültes Restrisiko genehmigt, hat nichts genehmigt.",
        felder: [
          {
            k: "risk",
            label: "Die drei bis fünf Risiken, die für die Entscheidung zählen",
            typ: "tabelle",
            spalten: ["Risiko", "Vor Maßnahmen", "Maßnahme", "Nach Maßnahmen"],
          },
          {
            k: "rest",
            label: "Restrisiko",
            typ: "mehrzeilig",
            hilfe: "Drei bis sechs Sätze, ohne Weichzeichner. Was bleibt, wie wahrscheinlich, welcher Schaden.",
          },
          {
            k: "traeger",
            label: "Träger des Restrisikos",
            typ: "text",
            hilfe: "Namentlich. Ein Restrisiko ohne benannten Träger ist nicht getragen, sondern verteilt.",
          },
        ],
      },
      {
        titel: "Auflagen",
        felder: [
          {
            k: "aufl",
            label: "Auflagen",
            typ: "tabelle",
            spalten: ["Auflage", "Frist", "Verantwortlich", "Nachweis an"],
          },
          {
            k: "auflfolge",
            label: "Folge bei Nichterfüllung",
            typ: "mehrzeilig",
            hilfe: "Eine Auflage ohne benannte Folge ist eine Bitte.",
          },
        ],
      },
      {
        titel: "Stellungnahmen",
        hinweis:
          "Wenn eine Funktion einen Vorbehalt hat, gehört er hierhin — ausformuliert, nicht geglättet. Ein Gremium, das später erfährt, dass ein Vorbehalt bestand und nicht vorgelegt wurde, entzieht der nächsten Vorlage das Vertrauen.",
        felder: [
          {
            k: "stell",
            label: "Stellungnahmen der beteiligten Funktionen",
            typ: "tabelle",
            spalten: ["Funktion", "Stellungnahme", "Datum", "Vorbehalte"],
          },
          { k: "abw", label: "Abweichende Auffassungen im Wortlaut", typ: "mehrzeilig" },
        ],
      },
      {
        titel: "Wiedervorlage",
        felder: [
          { k: "wv", label: "Termin", typ: "text" },
          {
            k: "wvausl",
            label: "Auslöser für eine vorgezogene Wiedervorlage",
            typ: "mehrzeilig",
            hilfe: "Modellwechsel, sicherheitsrelevanter Vorfall, neue Datenquelle, Ausweitung des Nutzerkreises.",
          },
        ],
      },
    ],
    fragen: [
      "Wer trägt das Restrisiko — namentlich?",
      "Welche Auflage ist zum Fristende nicht erfüllt worden, und was ist passiert?",
      "Gab es abweichende Auffassungen der beteiligten Funktionen?",
      "Auf welcher Grundlage beruht die Nutzenaussage?",
      "Ist seit der Freigabe etwas geändert worden, das eine vorgezogene Wiedervorlage ausgelöst hätte?",
    ],
  },

  {
    nr: "08",
    titel: "Mitbestimmung und Betriebsvereinbarung",
    akteur: "Projektleitung und Personalabteilung",
    prozess: "Mitbestimmungsverfahren bis zum Abschluss der Vereinbarung",
    abschnitte: [
      {
        titel: "Anwendbarkeit",
        hinweis:
          "Beginnen Sie damit am ersten Tag — dieser Strang hat die längste Laufzeit und die geringste Steuerbarkeit. In öffentlich-rechtlichen Häusern gilt Personalvertretungsrecht statt BetrVG.",
        felder: [
          {
            k: "br",
            label: "Zuständiges Gremium",
            typ: "text",
            hilfe: "Örtlicher Betriebsrat, Gesamt- oder Konzernbetriebsrat? Schriftlich klären, bevor die erste Sitzung stattfindet.",
          },
          {
            k: "rahmen",
            label: "Greift eine bestehende Rahmenvereinbarung?",
            typ: "mehrzeilig",
            hilfe: "Prüfen und dokumentieren — Vereinbarungen zu klassischen Fachanwendungen adressieren regelmäßig keine Freitexteingaben.",
          },
        ],
      },
      {
        titel: "Warum die Mitbestimmung greift",
        hinweis:
          "Ein Prompt-Protokoll, das Nutzeridentität, Zeitpunkt und Anfrage verbindet, ist objektiv geeignet, Verhalten abzubilden. Auf eine Überwachungsabsicht kommt es nicht an — auch dann nicht, wenn niemand auswerten will.",
        felder: [{ k: "grund", label: "Einordnung und Begründung", typ: "mehrzeilig" }],
      },
      {
        titel: "Verfahrensverlauf",
        felder: [
          {
            k: "verf",
            label: "Schritte",
            typ: "tabelle",
            spalten: ["Schritt", "Termin", "Status"],
          },
          {
            k: "sv",
            label: "Sachverständiger hinzugezogen?",
            typ: "mehrzeilig",
            hilfe: "Muss der Betriebsrat den Einsatz künstlicher Intelligenz beurteilen, gilt die Hinzuziehung eines Sachverständigen als erforderlich. Planen Sie Zeit und Kosten ein — er verkürzt das Verfahren regelmäßig.",
          },
        ],
      },
      {
        titel: "Inhalte der Vereinbarung",
        hinweis:
          "Kein Mustertext — eine Vereinbarung muss zur Systemwirklichkeit passen, nicht zur Vorlage. Die beiden Punkte, an denen Verhandlungen kippen: das Verwertungsverbot und das Verfahren bei wesentlichen Änderungen.",
        felder: [
          {
            k: "bv",
            label: "Regelungsgegenstände",
            typ: "tabelle",
            spalten: ["Gegenstand", "Geregelt?", "Fundstelle"],
          },
          {
            k: "bvverw",
            label: "Verwertungsverbot für arbeitsrechtliche Maßnahmen",
            typ: "mehrzeilig",
            hilfe: "Regelmäßig die Kernforderung. Halten Sie einen eng umrissenen Ausnahmefall offen, damit die Klausel nicht an der Wirklichkeit zerbricht.",
          },
          {
            k: "bvchg",
            label: "Verfahren bei wesentlichen Änderungen",
            typ: "mehrzeilig",
            hilfe: "Ohne diesen Punkt ist die Vereinbarung nach dem ersten Modellwechsel inhaltlich überholt.",
          },
        ],
      },
      {
        titel: "Ergebnis",
        felder: [
          { k: "bvdat", label: "Vereinbarung geschlossen am", typ: "text" },
          { k: "bvbez", label: "Bezeichnung / Nummer", typ: "text" },
          { k: "bvbek", label: "Bekanntmachung im Betrieb am", typ: "text" },
        ],
      },
    ],
    fragen: [
      "Liegt eine wirksame Vereinbarung vor — und deckt sie ab, was das System heute tut?",
      "Wer hat seit Inkrafttreten auf die Protokolle zugegriffen, aus welchem Anlass?",
      "War der Betriebsrat vor dem Pilotbetrieb beteiligt?",
      "Ist die richtige Ebene beteiligt worden?",
      "Was passiert mit der Vereinbarung, wenn Sie das Modell wechseln?",
    ],
  },
];

/** Alle Felder eines Teils, flach — für Fortschritt und Export. */
export function felderVon(teil: Teil): readonly Feld[] {
  return teil.abschnitte.flatMap((a) => a.felder);
}
