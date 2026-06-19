/* ============================================================
   majland.de — Learning hub content & translations
   Single source of truth for every user-facing string.
   en (English) · de (Deutsch) · da (Dansk) — each written to
   read naturally in its own language, not literally translated.
   ============================================================ */
export const SITE = (function () {
  'use strict';

  /* ---------- UI strings ---------- */
  var UI = {
    tagline: {
      en: 'Learn to build software',
      de: 'Lerne, Software zu bauen',
      da: 'Lær at bygge software',
    },
    nav_paths: { en: 'Paths', de: 'Lernwege', da: 'Forløb' },
    path_word: { en: 'Learning path', de: 'Lernweg', da: 'Læringsforløb' },
    nav_reference: { en: 'Reference', de: 'Referenz', da: 'Referencer' },
    nav_method: { en: 'How to learn', de: 'So lernst du', da: 'Sådan lærer du' },
    skip: { en: 'Skip to content', de: 'Zum Inhalt springen', da: 'Spring til indhold' },

    hero_eyebrow: {
      en: 'A free learning hub · majland.de',
      de: 'Kostenloser Lern-Hub · majland.de',
      da: 'Gratis læringshub · majland.de',
    },
    // Eyebrow on the generated home social card (scripts/og-images.mjs).
    og_home_eyebrow: {
      en: 'Free learning hub',
      de: 'Kostenloser Lern-Hub',
      da: 'Gratis læringshub',
    },
    hero_title: {
      en: 'Let’s learn to build software.',
      de: 'Lass uns lernen, Software zu bauen.',
      da: 'Lad os lære at bygge software.',
    },
    hero_lead: {
      en: 'Pick a path, take it one step at a time, and learn from the best free courses on the web. No paywalls, no fluff.',
      de: 'Such dir einen Weg aus, geh ihn Schritt für Schritt und lern mit den besten kostenlosen Kursen im Netz. Keine Bezahlschranken, kein Schnickschnack.',
      da: 'Vælg et forløb, tag det ét skridt ad gangen, og lær fra de bedste gratis kurser på nettet. Ingen betalingsmure og intet fyld.',
    },
    hero_cta: { en: 'Find your path', de: 'Finde deinen Weg', da: 'Find dit forløb' },

    choose_title: {
      en: 'Where do you want to start?',
      de: 'Wo willst du anfangen?',
      da: 'Hvor vil du starte?',
    },
    choose_lead: {
      en: 'Four focused paths. Jump in wherever you like — or follow the order below.',
      de: 'Vier fokussierte Lernwege. Spring rein, wo du willst – oder folg einfach der Reihenfolge unten.',
      da: 'Fire fokuserede forløb. Hop ind, hvor du vil – eller følg bare rækkefølgen nedenfor.',
    },
    continue_title: {
      en: 'Pick up where you left off',
      de: 'Mach da weiter, wo du aufgehört hast',
      da: 'Fortsæt, hvor du slap',
    },
    continue_cta: { en: 'Continue', de: 'Weiter', da: 'Fortsæt' },

    new_here: { en: 'New here?', de: 'Neu hier?', da: 'Ny her?' },
    new_here_text: {
      en: 'Try Tools → Foundations → The Web → Full-Stack. But honestly, any path is a great place to start.',
      de: 'Probier Werkzeuge → Grundlagen → Das Web → Full-Stack. Aber ehrlich: Jeder Weg ist ein super Start.',
      da: 'Prøv Værktøjer → Fundament → Nettet → Full-stack. Men helt ærligt – ethvert forløb er en god start.',
    },

    level_label: { en: 'Level', de: 'Niveau', da: 'Niveau' },
    resource_word: { en: 'resource', de: 'Ressource', da: 'ressource' },
    resources_word: { en: 'resources', de: 'Ressourcen', da: 'ressourcer' },
    view_path: { en: 'View path', de: 'Zum Lernweg', da: 'Se forløb' },
    back_to_paths: { en: 'All paths', de: 'Alle Lernwege', da: 'Alle forløb' },
    who_for: { en: "Who it's for", de: 'Für wen', da: 'Hvem er det til' },
    in_this_path: { en: 'In this path', de: 'In diesem Lernweg', da: 'I dette forløb' },
    outcome_label: { en: 'By the end', de: 'Am Ende', da: 'Til sidst' },
    next_up: { en: 'Next up', de: 'Als Nächstes', da: 'Næste skridt' },
    step_word: { en: 'Step', de: 'Schritt', da: 'Trin' },
    mark_done: { en: 'Done', de: 'Erledigt', da: 'Færdig' },
    done_count: { en: 'done', de: 'erledigt', da: 'færdig' },
    reset_progress: {
      en: 'Reset',
      de: 'Zurücksetzen',
      da: 'Nulstil',
    },
    reset_confirm: {
      en: 'Clear your progress for this path?',
      de: 'Deinen Fortschritt für diesen Lernweg löschen?',
      da: 'Vil du rydde din fremgang for dette forløb?',
    },

    reference_title: { en: 'Reference shelf', de: 'Nachschlagewerke', da: 'Opslagsværker' },
    reference_lead: {
      en: 'Bookmark these — you’ll come back to them constantly. Knowing where to look things up is a real skill.',
      de: 'Setz dir Lesezeichen – du kommst ständig hierher zurück. Zu wissen, wo man nachschlägt, ist eine echte Fähigkeit.',
      da: 'Sæt bogmærker – du vender tilbage til dem hele tiden. At vide, hvor man slår op, er en rigtig færdighed.',
    },

    method_title: {
      en: 'How to actually learn this',
      de: 'Wie du wirklich lernst',
      da: 'Sådan lærer du det i praksis',
    },
    method_lead: {
      en: 'The courses are only half the story. How you work through them is what makes it stick.',
      de: 'Die Kurse sind nur die halbe Miete. Wie du sie durcharbeitest, entscheidet, ob’s wirklich hängen bleibt.',
      da: 'Kurserne er kun det halve. Det er måden, du arbejder dig igennem dem på, der får det til at sidde fast.',
    },

    footer_tag: {
      en: 'A free, friendly way to learn software — in your language.',
      de: 'Ein kostenloser, freundlicher Weg in die Softwareentwicklung – in deiner Sprache.',
      da: 'En gratis og venlig vej ind i software – på dit sprog.',
    },
    footer_legal: {
      en: 'Course and reference links belong to their respective owners. No affiliation implied.',
      de: 'Kurs- und Referenzlinks gehören ihren jeweiligen Eigentümern. Es besteht keine Verbindung.',
      da: 'Kursus- og referencelinks tilhører deres respektive ejere. Der antydes ingen tilknytning.',
    },
  };

  /* ---------- Learning tips (method) ---------- */
  var TIPS = [
    {
      t: {
        en: "Build, don't just watch.",
        de: 'Bauen, nicht nur zuschauen.',
        da: 'Byg – ikke bare se på.',
      },
      d: {
        en: 'Finish a lesson, then build something tiny with it. It teaches more than ten you only watched.',
        de: 'Mach eine Lektion fertig und bau dann etwas Kleines damit. Das bringt mehr als zehn, die du nur angeschaut hast.',
        da: 'Gør en lektion færdig, og byg så noget lille med den. Det lærer dig mere end ti, du bare har set på.',
      },
    },
    {
      t: {
        en: 'Get stuck on purpose.',
        de: 'Bleib ruhig mal hängen.',
        da: 'Kør fast med vilje.',
      },
      d: {
        en: 'Confusion is the feeling of learning, not of failing. Sit with the bug — the breakthrough is the point.',
        de: 'Verwirrung ist das Gefühl von Lernen, nicht von Scheitern. Bleib am Bug dran – genau darum geht es.',
        da: 'Forvirring er følelsen af at lære, ikke af at fejle. Bliv ved fejlen – det er præcis dér, gennembruddet sker.',
      },
    },
    {
      t: {
        en: 'An hour a day beats a weekend cram.',
        de: 'Eine Stunde am Tag schlägt das Wochenend-Pauken.',
        da: 'En time om dagen slår en hel weekends terperi.',
      },
      d: {
        en: 'Small and steady wins. Revisit hard ideas a week later — the second pass is where they settle.',
        de: 'Klein, aber stetig gewinnt. Nimm dir schwierige Themen eine Woche später noch einmal vor – beim zweiten Mal sitzt es.',
        da: 'Lidt, men stabilt vinder. Vend tilbage til de svære ting en uge senere – det er anden gang, det sætter sig.',
      },
    },
  ];

  /* ---------- Reference shelf ---------- */
  var REFERENCES = [
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/',
      host: 'developer.mozilla.org',
      d: {
        en: 'HTML, CSS, JavaScript and browser APIs — the web’s definitive reference.',
        de: 'HTML, CSS, JavaScript und Browser-APIs – das maßgebliche Nachschlagewerk fürs Web.',
        da: 'HTML, CSS, JavaScript og browser-API’er – nettets definitive opslagsværk.',
      },
    },
    {
      name: 'javascript.info',
      url: 'https://javascript.info/',
      host: 'javascript.info',
      d: {
        en: 'Clear, example-driven explanations of every corner of JavaScript.',
        de: 'Klare, beispielreiche Erklärungen zu allen Ecken und Winkeln von JavaScript.',
        da: 'Klare, eksempeldrevne forklaringer på hver en krog af JavaScript.',
      },
    },
    {
      name: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/',
      host: 'typescriptlang.org',
      d: {
        en: 'The TypeScript language and configuration reference.',
        de: 'Das Nachschlagewerk zu TypeScript – Sprache und Konfiguration.',
        da: 'Opslagsværket til TypeScript – sprog og konfiguration.',
      },
    },
  ];

  /* ---------- Learning paths ---------- */
  var PATHS = [
    {
      id: 'foundations',
      accent: 'indigo',
      icon: 'blocks',
      title: { en: 'Foundations', de: 'Grundlagen', da: 'Fundament' },
      tagline: {
        en: 'How computers and code actually work.',
        de: 'Wie Computer und Code wirklich funktionieren.',
        da: 'Hvordan computere og kode faktisk virker.',
      },
      level: {
        en: 'Beginner → Intermediate',
        de: 'Anfänger → Fortgeschritten',
        da: 'Begynder → Øvet',
      },
      who: {
        en: 'Total beginners — and anyone who wants real depth.',
        de: 'Komplette Anfänger – und alle, die echte Tiefe wollen.',
        da: 'Helt nye – og alle, der vil have rigtig dybde.',
      },
      intro: {
        en: 'Start at the bottom — logic, data, memory, algorithms — and build the problem-solving instincts everything else rests on.',
        de: 'Fang ganz unten an – Logik, Daten, Speicher, Algorithmen – und entwickle das Gespür fürs Problemlösen, auf dem alles andere aufbaut.',
        da: 'Begynd nedefra – logik, data, hukommelse, algoritmer – og opbyg den sans for problemløsning, som alt andet hviler på.',
      },
      outcome: {
        en: 'You can break a problem into steps and solve it in code — and know what’s going on underneath.',
        de: 'Du kannst ein Problem in Schritte zerlegen und in Code lösen – und weißt, was darunter passiert.',
        da: 'Du kan dele et problem op i trin og løse det i kode – og ved, hvad der foregår nedenunder.',
      },
      next: 'web',
      steps: [
        {
          name: 'CS50x — Introduction to Computer Science',
          url: 'https://cs50.harvard.edu/x/',
          provider: 'HarvardX',
          type: 'course',
          blurb: {
            en: 'The best-loved intro to programming: C, Python, algorithms, and how computers really think.',
            de: 'Die beliebteste Programmier-Einführung: C, Python, Algorithmen – und wie Computer wirklich denken.',
            da: 'Den mest elskede intro til programmering: C, Python, algoritmer – og hvordan computere virkelig tænker.',
          },
        },
      ],
    },
    {
      id: 'web',
      accent: 'cyan',
      icon: 'globe',
      title: { en: 'The Web', de: 'Das Web', da: 'Nettet' },
      tagline: {
        en: 'Build for the browser: HTML, CSS and JavaScript.',
        de: 'Bau für den Browser: HTML, CSS und JavaScript.',
        da: 'Byg til browseren: HTML, CSS og JavaScript.',
      },
      level: {
        en: 'Beginner → Intermediate',
        de: 'Anfänger → Fortgeschritten',
        da: 'Begynder → Øvet',
      },
      who: {
        en: 'Anyone who wants to build websites and web apps.',
        de: 'Für alle, die Websites und Web-Apps bauen wollen.',
        da: 'For alle, der vil bygge hjemmesider og web-apps.',
      },
      intro: {
        en: 'Learn the web’s three languages — structure, style and behaviour — and build pages that are fast, responsive and accessible.',
        de: 'Lerne die drei Sprachen des Webs – Struktur, Stil und Verhalten – und bau Seiten, die schnell, responsiv und für alle zugänglich sind.',
        da: 'Lær nettets tre sprog – struktur, stil og adfærd – og byg sider, der er hurtige, responsive og tilgængelige.',
      },
      outcome: {
        en: 'You can build an interactive, responsive website from a blank file.',
        de: 'Du kannst aus einer leeren Datei eine interaktive, responsive Website bauen.',
        da: 'Du kan bygge en interaktiv, responsiv hjemmeside fra en tom fil.',
      },
      next: 'fullstack',
      steps: [
        {
          name: 'web.dev Learn',
          url: 'https://web.dev/learn',
          provider: 'Google',
          type: 'course',
          blurb: {
            en: 'Structured courses on HTML, CSS, responsive design, accessibility and performance.',
            de: 'Strukturierte Kurse zu HTML, CSS, responsivem Design, Barrierefreiheit und Performance.',
            da: 'Strukturerede kurser i HTML, CSS, responsivt design, tilgængelighed og ydeevne.',
          },
        },
        {
          name: 'The Modern JavaScript Tutorial',
          url: 'https://javascript.info/',
          provider: 'javascript.info',
          type: 'course',
          blurb: {
            en: 'The clearest path from JavaScript basics to async, modules and the DOM.',
            de: 'Der klarste Weg von den JavaScript-Grundlagen zu Async, Modulen und dem DOM.',
            da: 'Den klareste vej fra JavaScript-grundlaget til async, moduler og DOM’en.',
          },
        },
      ],
    },
    {
      id: 'fullstack',
      accent: 'emerald',
      icon: 'layers',
      title: { en: 'Full-Stack', de: 'Full-Stack', da: 'Full-stack' },
      tagline: {
        en: 'Design, build and ship complete apps.',
        de: 'Entwirf, baue und veröffentliche komplette Apps.',
        da: 'Design, byg og udgiv komplette apps.',
      },
      level: { en: 'Intermediate', de: 'Fortgeschritten', da: 'Øvet' },
      who: {
        en: 'Past the basics and ready to build real, deployable apps.',
        de: 'Über die Grundlagen hinaus und bereit für echte Apps, die online gehen.',
        da: 'Ud over det grundlæggende og klar til rigtige apps, der kan sættes i drift.',
      },
      intro: {
        en: 'Tie front-end and back-end together: a UI people use, an API you control, a database, types and a real deployment.',
        de: 'Bring Frontend und Backend zusammen: eine Oberfläche, die Leute nutzen, eine API, die du kontrollierst, eine Datenbank, Typen und ein echtes Deployment.',
        da: 'Få frontend og backend til at spille sammen: en brugerflade, folk bruger, en API, du styrer, en database, typer og en rigtig udrulning.',
      },
      outcome: {
        en: 'You can design, build and ship a full-stack app end to end.',
        de: 'Du kannst eine Full-Stack-App von vorn bis hinten entwerfen, bauen und veröffentlichen.',
        da: 'Du kan designe, bygge og udgive en full-stack-app fra ende til anden.',
      },
      steps: [
        {
          name: 'Full Stack Open',
          url: 'https://fullstackopen.com/en/',
          provider: 'University of Helsinki',
          type: 'course',
          blurb: {
            en: 'React, Node, databases, GraphQL, TypeScript and testing — all in one real project.',
            de: 'React, Node, Datenbanken, GraphQL, TypeScript und Tests – alles in einem echten Projekt.',
            da: 'React, Node, databaser, GraphQL, TypeScript og test – det hele i ét rigtigt projekt.',
          },
        },
      ],
    },
    {
      id: 'tools',
      accent: 'amber',
      icon: 'terminal',
      title: { en: 'Tools & Workflow', de: 'Werkzeuge & Workflow', da: 'Værktøjer & arbejdsgang' },
      tagline: {
        en: 'The terminal, Git, and how developers actually work.',
        de: 'Das Terminal, Git und wie Profis wirklich arbeiten.',
        da: 'Terminalen, Git og hvordan udviklere faktisk arbejder.',
      },
      level: {
        en: 'All levels · start early',
        de: 'Alle Niveaus · ruhig früh anfangen',
        da: 'Alle niveauer · start tidligt',
      },
      who: {
        en: 'Everyone — the sooner the better.',
        de: 'Für alle – je früher, desto besser.',
        da: 'For alle – jo før, jo bedre.',
      },
      intro: {
        en: 'The skills no course teaches directly: the command line, version control, and the everyday workflow that makes everything else faster.',
        de: 'Die Fähigkeiten, die dir kein Kurs direkt beibringt: Kommandozeile, Versionskontrolle und der Workflow, der alles andere schneller macht.',
        da: 'Færdighederne, intet kursus lærer dig direkte: kommandolinjen, versionsstyring og arbejdsgangen, der gør alt andet hurtigere.',
      },
      outcome: {
        en: 'You’re at home in the terminal and confident with Git and GitHub.',
        de: 'Du bist im Terminal zu Hause und gehst sicher mit Git und GitHub um.',
        da: 'Du er hjemmevant i terminalen og tryg ved Git og GitHub.',
      },
      next: 'foundations',
      steps: [
        {
          name: 'MIT Missing Semester (2026)',
          url: 'https://missing.csail.mit.edu/2026/',
          provider: 'MIT',
          type: 'course',
          blurb: {
            en: 'The shell, scripting, version control and debugging — the missing half of a CS education.',
            de: 'Shell, Skripte, Versionskontrolle und Debugging – die fehlende Hälfte einer Informatik-Ausbildung.',
            da: 'Shell, scripting, versionsstyring og fejlfinding – den manglende halvdel af en datalogiuddannelse.',
          },
        },
        {
          name: 'Pro Git',
          url: 'https://git-scm.com/book/en/v2',
          provider: 'git-scm.com',
          type: 'reference',
          blurb: {
            en: 'The free, official Git book — from everyday commands to how Git really works underneath.',
            de: 'Das kostenlose, offizielle Git-Buch – von den alltäglichen Befehlen bis dahin, wie Git wirklich funktioniert.',
            da: 'Den gratis, officielle Git-bog – fra de daglige kommandoer til, hvordan Git virkelig fungerer indeni.',
          },
        },
      ],
    },
  ];

  return { UI: UI, TIPS: TIPS, REFERENCES: REFERENCES, PATHS: PATHS };
})();
