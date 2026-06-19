/* ============================================================
   majland.de — Learning hub content & translations
   Single source of truth for every user-facing string.
   Languages: en (English), de (Deutsch), da (Dansk).
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
    lang_label: { en: 'Language', de: 'Sprache', da: 'Sprog' },

    hero_eyebrow: {
      en: 'A free learning hub · majland.de',
      de: 'Ein kostenloser Lern-Hub · majland.de',
      da: 'Et gratis lærings-hub · majland.de',
    },
    hero_title: {
      en: 'Curated paths to learn software.',
      de: 'Kuratierte Lernwege für Software.',
      da: 'Kuraterede forløb til at lære software.',
    },
    hero_lead: {
      en: 'No paywalls, no overwhelm. Pick a path, follow it step by step, and learn from the best free courses on the internet.',
      de: 'Keine Bezahlschranken, keine Überforderung. Wähle einen Lernweg, folge ihm Schritt für Schritt und lerne mit den besten kostenlosen Kursen im Netz.',
      da: 'Ingen betalingsmure, intet overvæld. Vælg et forløb, følg det skridt for skridt, og lær fra de bedste gratis kurser på internettet.',
    },
    hero_cta: { en: 'Choose your path', de: 'Wähle deinen Lernweg', da: 'Vælg dit forløb' },

    choose_title: { en: 'Choose your path', de: 'Wähle deinen Lernweg', da: 'Vælg dit forløb' },
    choose_lead: {
      en: 'Five focused tracks. Start anywhere — or follow the suggested order below.',
      de: 'Fünf fokussierte Tracks. Beginne, wo du willst – oder folge der empfohlenen Reihenfolge unten.',
      da: 'Fem fokuserede spor. Start hvor du vil – eller følg den foreslåede rækkefølge nedenfor.',
    },
    new_here: { en: 'New here?', de: 'Neu hier?', da: 'Ny her?' },
    new_here_text: {
      en: 'A good order is Tools → Foundations → The Web → Full-Stack → AI. But any path is a fine place to begin.',
      de: 'Eine gute Reihenfolge ist Werkzeuge → Grundlagen → Das Web → Full-Stack → KI. Aber jeder Lernweg ist ein guter Anfang.',
      da: 'En god rækkefølge er Værktøjer → Fundament → Nettet → Full-stack → AI. Men ethvert forløb er et fint sted at starte.',
    },

    level_label: { en: 'Level', de: 'Niveau', da: 'Niveau' },
    resources_word: { en: 'resources', de: 'Ressourcen', da: 'ressourcer' },
    view_path: { en: 'View path', de: 'Lernweg ansehen', da: 'Se forløb' },
    back_to_paths: { en: 'All paths', de: 'Alle Lernwege', da: 'Alle forløb' },
    who_for: { en: "Who it's for", de: 'Für wen', da: 'Hvem er det til' },
    in_this_path: { en: 'In this path', de: 'In diesem Lernweg', da: 'I dette forløb' },
    outcome_label: { en: 'By the end', de: 'Am Ende', da: 'Til sidst' },
    next_up: { en: 'Next up', de: 'Als Nächstes', da: 'Næste skridt' },
    step_word: { en: 'Step', de: 'Schritt', da: 'Trin' },
    mark_done: { en: 'Done', de: 'Erledigt', da: 'Færdig' },
    done_count: { en: 'done', de: 'erledigt', da: 'færdig' },

    reference_title: { en: 'Reference shelf', de: 'Nachschlagewerke', da: 'Opslagsværker' },
    reference_lead: {
      en: 'Bookmark these and look things up constantly — knowing where to find the answer is a skill in itself.',
      de: 'Setze Lesezeichen und schlage ständig nach – zu wissen, wo die Antwort steht, ist selbst eine Fähigkeit.',
      da: 'Sæt bogmærker, og slå op hele tiden – at vide, hvor svaret findes, er en færdighed i sig selv.',
    },

    method_title: {
      en: 'How to actually learn this',
      de: 'Wie du das wirklich lernst',
      da: 'Sådan lærer du det i praksis',
    },
    method_lead: {
      en: 'The courses are only half of it. How you work through them decides whether any of it sticks.',
      de: 'Die Kurse sind nur die Hälfte. Wie du sie durcharbeitest, entscheidet, ob etwas hängen bleibt.',
      da: 'Kurserne er kun det halve. Måden, du arbejder dig igennem dem på, afgør, om noget af det sætter sig fast.',
    },

    footer_tag: {
      en: 'A free, curated way to learn software — in your language.',
      de: 'Ein kostenloser, kuratierter Weg, Software zu lernen – in deiner Sprache.',
      da: 'En gratis, kurateret måde at lære software på – på dit sprog.',
    },
    footer_legal: {
      en: 'Course and reference links belong to their respective owners. No affiliation implied.',
      de: 'Kurs- und Referenzlinks gehören ihren jeweiligen Eigentümern. Keine Verbindung wird impliziert.',
      da: 'Kursus- og referencelinks tilhører deres respektive ejere. Ingen tilknytning antydes.',
    },
  };

  /* ---------- Learning tips (method) ---------- */
  var TIPS = [
    {
      t: {
        en: "Build, don't just watch.",
        de: 'Bauen, nicht nur zuschauen.',
        da: 'Byg – se ikke bare på.',
      },
      d: {
        en: 'Finish a lesson, then build something tiny with it. It teaches more than ten you only watched.',
        de: 'Beende eine Lektion und baue dann etwas Kleines damit. Das lehrt mehr als zehn, die du nur angesehen hast.',
        da: 'Afslut en lektion, og byg så noget lille med den. Det lærer dig mere end ti, du kun har set på.',
      },
    },
    {
      t: {
        en: 'Get stuck on purpose.',
        de: 'Bleib bewusst hängen.',
        da: 'Sæt dig fast med vilje.',
      },
      d: {
        en: 'Confusion is the feeling of learning, not of failing. Sit with the bug — the breakthrough is the point.',
        de: 'Verwirrung ist das Gefühl des Lernens, nicht des Scheiterns. Bleib am Fehler dran – der Durchbruch ist der Sinn.',
        da: 'Forvirring er følelsen af at lære, ikke af at fejle. Bliv ved fejlen – gennembruddet er pointen.',
      },
    },
    {
      t: {
        en: 'An hour a day beats a weekend cram.',
        de: 'Eine Stunde am Tag schlägt das Wochenend-Pauken.',
        da: 'En time om dagen slår en weekend-terpetur.',
      },
      d: {
        en: 'Small and steady wins. Revisit hard ideas a week later — the second pass is where they settle.',
        de: 'Klein und stetig gewinnt. Greife schwierige Themen eine Woche später noch einmal auf – beim zweiten Mal sitzt es.',
        da: 'Småt og stabilt vinder. Vend tilbage til svære emner en uge senere – det er anden gang, det sætter sig.',
      },
    },
    {
      t: {
        en: 'Type every line yourself.',
        de: 'Tippe jede Zeile selbst.',
        da: 'Skriv hver linje selv.',
      },
      d: {
        en: "Don't copy-paste the examples — typing them, and fixing your typos, is where it sinks in.",
        de: 'Kopiere die Beispiele nicht – beim Selbsttippen und Korrigieren der Tippfehler bleibt es hängen.',
        da: 'Undgå at kopiere eksemplerne – det er i selve skrivningen og i at rette dine tastefejl, det sætter sig.',
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
        de: 'HTML, CSS, JavaScript und Browser-APIs – die maßgebliche Referenz des Webs.',
        da: 'HTML, CSS, JavaScript og browser-API’er – nettets definitive opslagsværk.',
      },
    },
    {
      name: 'javascript.info',
      url: 'https://javascript.info/',
      host: 'javascript.info',
      d: {
        en: 'Clear, example-driven explanations of every corner of JavaScript.',
        de: 'Klare, beispielreiche Erklärungen zu jedem Winkel von JavaScript.',
        da: 'Klare, eksempeldrevne forklaringer på hver en krog af JavaScript.',
      },
    },
    {
      name: 'TypeScript Handbook',
      url: 'https://www.typescriptlang.org/docs/handbook/',
      host: 'typescriptlang.org',
      d: {
        en: 'The TypeScript language and configuration reference.',
        de: 'Die Referenz zu TypeScript-Sprache und -Konfiguration.',
        da: 'Reference til TypeScript-sproget og dets konfiguration.',
      },
    },
    {
      name: 'web.dev',
      url: 'https://web.dev/learn',
      host: 'web.dev',
      d: {
        en: 'Guidance on accessibility, performance and responsive design.',
        de: 'Leitfäden zu Barrierefreiheit, Performance und responsivem Design.',
        da: 'Vejledning i tilgængelighed, ydeevne og responsivt design.',
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
        en: 'Understand how computers and code really work.',
        de: 'Verstehe, wie Computer und Code wirklich funktionieren.',
        da: 'Forstå, hvordan computere og kode virkelig fungerer.',
      },
      level: {
        en: 'Beginner → Intermediate',
        de: 'Anfänger → Fortgeschritten',
        da: 'Begynder → Øvet',
      },
      who: {
        en: 'Total beginners, and anyone who wants real computer-science depth.',
        de: 'Komplette Anfänger und alle, die echte Informatik-Tiefe wollen.',
        da: 'Helt nye, og alle der vil have rigtig dybde i datalogi.',
      },
      intro: {
        en: 'Start at the very bottom — logic, data, memory, algorithms — and build the problem-solving instincts everything else depends on.',
        de: 'Beginne ganz unten – Logik, Daten, Speicher, Algorithmen – und entwickle das Problemlösungs-Gespür, auf dem alles andere aufbaut.',
        da: 'Start helt fra bunden – logik, data, hukommelse, algoritmer – og opbyg den problemløsnings-sans, alt andet bygger på.',
      },
      outcome: {
        en: 'You can break a problem into steps and solve it in code — and you understand what’s happening under the hood.',
        de: 'Du kannst ein Problem in Schritte zerlegen und in Code lösen – und verstehst, was unter der Haube passiert.',
        da: 'Du kan dele et problem op i trin og løse det i kode – og du forstår, hvad der sker under motorhjelmen.',
      },
      next: 'web',
      steps: [
        {
          name: 'CS50x — Introduction to Computer Science',
          url: 'https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home',
          provider: 'HarvardX',
          type: 'course',
          blurb: {
            en: 'The most loved intro to programming there is: C, Python, algorithms, and how computers think.',
            de: 'Die beliebteste Programmier-Einführung überhaupt: C, Python, Algorithmen und wie Computer denken.',
            da: 'Den mest elskede introduktion til programmering: C, Python, algoritmer og hvordan computere tænker.',
          },
        },
        {
          name: 'CS61A — Structure and Interpretation of Programs',
          url: 'https://cs61a.org/',
          provider: 'UC Berkeley',
          type: 'course',
          blurb: {
            en: 'The big ideas of programming: abstraction, recursion, and even building your own interpreter.',
            de: 'Die großen Ideen des Programmierens: Abstraktion, Rekursion und sogar der Bau eines eigenen Interpreters.',
            da: 'De store idéer i programmering: abstraktion, rekursion og endda at bygge din egen fortolker.',
          },
        },
        {
          name: 'MIT 6.006 — Introduction to Algorithms',
          url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
          provider: 'MIT OCW',
          type: 'course',
          blurb: {
            en: 'Data structures, sorting, graphs, and the complexity analysis to reason about them.',
            de: 'Datenstrukturen, Sortierung, Graphen und die Komplexitätsanalyse, um sie zu beurteilen.',
            da: 'Datastrukturer, sortering, grafer og den kompleksitetsanalyse, der lader dig ræsonnere om dem.',
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
        en: 'Build for the browser with HTML, CSS and JavaScript.',
        de: 'Baue für den Browser mit HTML, CSS und JavaScript.',
        da: 'Byg til browseren med HTML, CSS og JavaScript.',
      },
      level: {
        en: 'Beginner → Intermediate',
        de: 'Anfänger → Fortgeschritten',
        da: 'Begynder → Øvet',
      },
      who: {
        en: 'Anyone who wants to build websites and web apps.',
        de: 'Alle, die Websites und Web-Apps bauen wollen.',
        da: 'Alle, der vil bygge hjemmesider og web-apps.',
      },
      intro: {
        en: 'Learn the three languages of the web — structure, style and behaviour — and how to make pages that are fast, responsive and accessible to everyone.',
        de: 'Lerne die drei Sprachen des Webs – Struktur, Stil und Verhalten – und wie du Seiten baust, die schnell, responsiv und für alle zugänglich sind.',
        da: 'Lær nettets tre sprog – struktur, stil og adfærd – og hvordan du laver sider, der er hurtige, responsive og tilgængelige for alle.',
      },
      outcome: {
        en: 'You can build an interactive, responsive website from a blank file.',
        de: 'Du kannst eine interaktive, responsive Website aus einer leeren Datei bauen.',
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
            en: 'Structured courses on HTML, CSS, accessibility, responsive design and performance.',
            de: 'Strukturierte Kurse zu HTML, CSS, Barrierefreiheit, responsivem Design und Performance.',
            da: 'Strukturerede kurser i HTML, CSS, tilgængelighed, responsivt design og ydeevne.',
          },
        },
        {
          name: 'The Modern JavaScript Tutorial',
          url: 'https://javascript.info/',
          provider: 'javascript.info',
          type: 'course',
          blurb: {
            en: 'The clearest path from JavaScript basics to async, modules and the DOM.',
            de: 'Der klarste Weg von JavaScript-Grundlagen zu Async, Modulen und dem DOM.',
            da: 'Den klareste vej fra JavaScript-grundlaget til async, moduler og DOM’en.',
          },
        },
        {
          name: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/',
          provider: 'Mozilla',
          type: 'reference',
          blurb: {
            en: 'The web’s definitive reference — keep it open in a tab while you work.',
            de: 'Die maßgebliche Referenz des Webs – halte sie beim Arbeiten in einem Tab offen.',
            da: 'Nettets definitive opslagsværk – hold det åbent i en fane, mens du arbejder.',
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
        en: 'Design, build and ship complete applications.',
        de: 'Entwirf, baue und veröffentliche komplette Anwendungen.',
        da: 'Design, byg og udgiv komplette applikationer.',
      },
      level: { en: 'Intermediate', de: 'Fortgeschritten', da: 'Øvet' },
      who: {
        en: 'Developers past the basics, ready to build real, deployable apps.',
        de: 'Entwickler:innen jenseits der Grundlagen, bereit für echte, veröffentlichbare Apps.',
        da: 'Udviklere ud over det grundlæggende, klar til rigtige apps, der kan udgives.',
      },
      intro: {
        en: 'Tie the front-end and back-end together: a UI people use, an API you control, a database, types, and a real deployment.',
        de: 'Verbinde Frontend und Backend: eine UI, die Menschen nutzen, eine API, die du kontrollierst, eine Datenbank, Typen und ein echtes Deployment.',
        da: 'Bind frontend og backend sammen: en brugerflade, folk bruger, en API du styrer, en database, typer og en rigtig udrulning.',
      },
      outcome: {
        en: 'You can design, build and ship a full-stack app end to end.',
        de: 'Du kannst eine Full-Stack-App von Anfang bis Ende entwerfen, bauen und veröffentlichen.',
        da: 'Du kan designe, bygge og udgive en full-stack-app fra ende til anden.',
      },
      next: 'ai',
      steps: [
        {
          name: 'Full Stack Open',
          url: 'https://fullstackopen.com/en/',
          provider: 'University of Helsinki',
          type: 'course',
          blurb: {
            en: 'React, Node, databases, GraphQL, TypeScript and testing — one real project throughout.',
            de: 'React, Node, Datenbanken, GraphQL, TypeScript und Testing – durchgehend an einem echten Projekt.',
            da: 'React, Node, databaser, GraphQL, TypeScript og test – ét rigtigt projekt hele vejen.',
          },
        },
        {
          name: 'TypeScript Handbook',
          url: 'https://www.typescriptlang.org/docs/handbook/',
          provider: 'Microsoft',
          type: 'reference',
          blurb: {
            en: 'Add a type system to JavaScript for safer, more maintainable apps.',
            de: 'Ergänze JavaScript um ein Typsystem für sicherere, wartbarere Apps.',
            da: 'Tilføj et typesystem til JavaScript for sikrere apps, der er lettere at vedligeholde.',
          },
        },
        {
          name: 'CS50 Web — Python & JavaScript',
          url: 'https://cs50.harvard.edu/web/',
          provider: 'HarvardX',
          type: 'course',
          blurb: {
            en: 'A second take, with a Python/Django back-end, testing and deployment.',
            de: 'Eine zweite Perspektive, mit Python/Django-Backend, Testing und Deployment.',
            da: 'En anden vinkel, med en Python/Django-backend, test og udrulning.',
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
        de: 'Das Terminal, Git und wie Entwickler:innen wirklich arbeiten.',
        da: 'Terminalen, Git og hvordan udviklere faktisk arbejder.',
      },
      level: {
        en: 'All levels · start early',
        de: 'Alle Niveaus · früh anfangen',
        da: 'Alle niveauer · start tidligt',
      },
      who: {
        en: 'Everyone — the sooner the better.',
        de: 'Alle – je früher, desto besser.',
        da: 'Alle – jo før, jo bedre.',
      },
      intro: {
        en: 'The practical skills no course teaches directly: the command line, version control, and the everyday workflow that makes all the other work faster.',
        de: 'Die praktischen Fähigkeiten, die kein Kurs direkt lehrt: die Kommandozeile, Versionskontrolle und der Alltags-Workflow, der alle andere Arbeit beschleunigt.',
        da: 'De praktiske færdigheder, intet kursus underviser direkte i: kommandolinjen, versionsstyring og den daglige arbejdsgang, der gør alt andet arbejde hurtigere.',
      },
      outcome: {
        en: 'You’re at home in the terminal and confident with Git and GitHub.',
        de: 'Du bist im Terminal zu Hause und sicher mit Git und GitHub.',
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
            de: 'Shell, Skripting, Versionskontrolle und Debugging – die fehlende Hälfte der Informatik-Ausbildung.',
            da: 'Shell, scripting, versionsstyring og fejlfinding – den manglende halvdel af en datalogi-uddannelse.',
          },
        },
        {
          name: 'GitHub Skills',
          url: 'https://learn.github.com/skills',
          provider: 'GitHub',
          type: 'course',
          blurb: {
            en: 'Hands-on, interactive practice with Git, branches and pull requests.',
            de: 'Praktische, interaktive Übungen zu Git, Branches und Pull Requests.',
            da: 'Praktisk, interaktiv træning i Git, brancher og pull requests.',
          },
        },
      ],
    },
    {
      id: 'ai',
      accent: 'pink',
      icon: 'spark',
      title: { en: 'Build with AI', de: 'Mit KI bauen', da: 'Byg med AI' },
      tagline: {
        en: 'Add large language models to what you build.',
        de: 'Erweitere deine Projekte um große Sprachmodelle.',
        da: 'Tilføj store sprogmodeller til det, du bygger.',
      },
      level: { en: 'Intermediate', de: 'Fortgeschritten', da: 'Øvet' },
      who: {
        en: 'Developers who can build, and want to build with AI.',
        de: 'Entwickler:innen, die bauen können und mit KI bauen wollen.',
        da: 'Udviklere, der kan bygge, og som vil bygge med AI.',
      },
      intro: {
        en: 'Once you can ship apps, learn to weave in language models — prompting, the API, tool use and agents — and where AI helps versus where it doesn’t.',
        de: 'Wenn du Apps veröffentlichen kannst, lerne, Sprachmodelle einzubinden – Prompting, die API, Tool-Nutzung und Agenten – und wo KI hilft und wo nicht.',
        da: 'Når du kan udgive apps, så lær at flette sprogmodeller ind – prompting, API’en, værktøjsbrug og agenter – og hvor AI hjælper, og hvor den ikke gør.',
      },
      outcome: {
        en: 'You can integrate an LLM into a real app and design prompts that reliably work.',
        de: 'Du kannst ein LLM in eine echte App integrieren und Prompts entwerfen, die zuverlässig funktionieren.',
        da: 'Du kan integrere en LLM i en rigtig app og designe prompts, der virker pålideligt.',
      },
      next: 'web',
      steps: [
        {
          name: 'Anthropic Academy',
          url: 'https://anthropic.skilljar.com/',
          provider: 'Anthropic',
          type: 'course',
          blurb: {
            en: 'Prompt engineering, the Claude API, tool use and building agents — straight from the source.',
            de: 'Prompt-Engineering, die Claude-API, Tool-Nutzung und der Bau von Agenten – direkt von der Quelle.',
            da: 'Prompt engineering, Claude-API’en, værktøjsbrug og at bygge agenter – direkte fra kilden.',
          },
        },
      ],
    },
  ];

  return { UI: UI, TIPS: TIPS, REFERENCES: REFERENCES, PATHS: PATHS };
})();
