import type { Dictionary } from "../types";

export const it: Dictionary = {
  hero: {
    title: "Pronto quando lo sei tu.",
    subtitle: "Crea DM di LinkedIn, contenuti di post e messaggi di presentazione personalizzati per il candidato che stai puntando. Descrivi il ruolo e noi faremo il resto.",
    placeholder: "es. Ricerca di uno sviluppatore React"
  },
  prompt: {
    default: "Chiedi qualsiasi cosa",
    description: "Descrivi la posizione...",
    tone: "Scrivi un tono o scegline uno sopra...",
    context: "Dettagli aggiuntivi (opzionale)...",
    message: "Invia un messaggio..."
  },
  flow: {
    skip: "Salta",
    skipUserMessage: "Salta"
  },
  assistant: {
    description: (positionTitle) =>
      `Ottimo! Creiamo un messaggio di presentazione per **${positionTitle}**.\n\n` +
      `Innanzitutto, descrivi brevemente il ruolo: competenze richieste, livello di esperienza, ` +
      `modalità di lavoro o cultura aziendale.`,
    tone: "Grazie! Che tono dovrebbe avere il messaggio? Scegline uno qui sotto o inserisci il tuo tono preferito.",
    context:
      "Un ultimo passaggio: eventuali dettagli extra da includere? " +
      "(Opzionale — es. remote-friendly, startup Series B, fascia salariale)\n\n" +
      "Oppure premi il pulsante **Salta** per continuare.",
    generating: "Generazione del messaggio in corso, un momento...",
    invalidTone: "Non ho riconosciuto questo tono. Per favore, scegline o inseriscine uno tra: Professional, Friendly, Formal, Casual, Confident, Conversational.",
    loginRequired: "Devi accedere per generare il messaggio. Dopo aver effettuato l'accesso, puoi tornare a questa chat.",
    generateError: "Si è verificato un errore durante la generazione del messaggio. Per favore riprova."
  },
  composer: {
    disclaimer: "Tonely genera DM personalizzati di LinkedIn, contenuti di post e messaggi di presentazione per recruiter. Continuando accetti le nostre condizioni d'uso."
  },
  auth: {
    logIn: "Accedi",
    signUpFree: "Registrati gratis",
    signOut: "Disconnetti",
    welcomeBack: "Bentornato",
    signInSubtitle: "Accedi al tuo account Tonely",
    createAccount: "Crea un account",
    registerSubtitle: "Inizia a generare messaggi di presentazione personalizzati",
    fullName: "Nome completo",
    fullNamePlaceholder: "Il tuo nome completo",
    email: "E-mail",
    password: "Password",
    signIn: "Accedi",
    createAccountButton: "Crea un account",
    noAccount: "Non hai un account?",
    hasAccount: "Hai già un account?",
    createOne: "Creane uno",
    signInLink: "Accedi",
    loginFailed: "Accesso non riuscito",
    registerFailed: "Registrazione non riuscita",
    emailPlaceholder: "tu@azienda.com",
    passwordPlaceholder: "••••••••",
    passwordRegisterPlaceholder: "Almeno 8 caratteri",
    confirmPassword: "Conferma password",
    confirmPasswordPlaceholder: "Ripeti la password",
    passwordMismatch: "Le password non corrispondono",
  },
  message: {
    copy: "Copia",
    copied: "Copiato"
  },
  sidebar: {
    newChat: "Nuova chat",
    history: "Cronologia",
    plans: "Visualizza piani e prezzi",
    settings: "Impostazioni",
    help: "Aiuto",
    noChats: "Ancora nessuna conversazione. Avvia una nuova chat per creare DM di LinkedIn, contenuti di post o messaggi di presentazione.",
    authCtaTitle: "Salva le tue conversazioni",
    authCtaBody: "Accedi per salvare i tuoi DM di LinkedIn, contenuti di post e messaggi di presentazione in un unico posto.",
    newConversation: "Nuova conversazione"
  },
  legal: {
    prefix: "Inviando un messaggio a Tonely, un chatbot AI, accetti i nostri",
    terms: "Termini",
    middle: "e dichiari di aver letto la nostra",
    privacy: "Informativa sulla privacy",
    suffix: "."
  },
  common: {
    brand: "Tonely",
    badge: "Presentazione recruiter",
    send: "Invia messaggio",
    userMenu: "Menu utente",
    deleteConversation: "Elimina conversazione"
  },
  locale: {
    label: "Lingua",
    en: "English",
    tr: "Türkçe",
    de: "Deutsch",
    it: "Italiano"
  },
  toast: {
    conversationLoadFailed: "Impossibile caricare le conversazioni",
    conversationCreateFailed: "Impossibile creare la conversazione",
    conversationDeleteFailed: "Impossibile eliminare la conversazione",
    messageLoadFailed: "Impossibile caricare i messaggi",
    registerSuccess: "Account creato! Ora puoi accedere."
  },
  settings: {
    title: "Impostazioni",
    subtitle: "Gestisci le preferenze del tuo account e le impostazioni dell'applicazione.",
    profile: "Profilo",
    profileInformation: "Informazioni sul profilo",
    fullName: "Nome completo",
    emailAddress: "Indirizzo e-mail",
    saveChanges: "Salva modifiche"
  },
  help: {
    title: "Come possiamo aiutarti?",
    subtitle: "Cerca nella nostra knowledge base o contatta il nostro team di supporto.",
    contactSupport: "Contatta il supporto",
    contactDescription: "Hai problemi tecnici o domande sulla fatturazione? Il nostro team di supporto è qui per aiutarti.",
    faq: "Domande frequenti",
    faq1Title: "In che modo l'IA sceglie il tono giusto?",
    faq1Desc: "La nostra IA analizza il contesto fornito e applica tecniche di prompting specializzate per garantire che il risultato corrisponda allo stile desiderato, che sia strettamente professionale o altamente entusiasta.",
    faq2Title: "Posso salvare i messaggi generati?",
    faq2Desc: "Sì! Tutti i messaggi generati vengono salvati automaticamente nella scheda Cronologia, dove è possibile visualizzarli e copiarli in qualsiasi momento.",
    faq3Title: "Come vengono gestiti i miei dati?",
    faq3Desc: "Non utilizziamo i messaggi generati o i dati dei candidati per addestrare i nostri modelli pubblici. Tutti i dati sono memorizzati in modo sicuro e crittografati."
  },
  quota: {
    exceeded: "Hai raggiunto il limite gratuito di messaggi.",
    upgradeCta: "Vedi i piani →",
  },
  plans: {
    title: "Piani e prezzi",
    subtitle: "Piani semplici e trasparenti pensati per recruiter e professionisti delle risorse umane.",
    free: {
      name: "Gratuito",
      price: "0 €",
      period: "per sempre",
      description: "Perfetto per iniziare con messaggi di presentazione personalizzati per i candidati.",
      buttonText: "Piano attuale",
      currentPlanBadge: "Attivo",
      features: [
        "1 messaggi di presentazione al mese",
        "Regolazione standard del tono AI",
        "Salva la cronologia per 7 giorni",
      ]
    }
  }
};