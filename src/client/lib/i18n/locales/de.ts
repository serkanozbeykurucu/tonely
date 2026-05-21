import type { Dictionary } from "../types";

export const de: Dictionary = {
  hero: {
    title: "Bereit, wenn Sie es sind.",
    subtitle: "Erstellen Sie personalisierte LinkedIn-DMs, Beitragsinhalte und Outreach-Nachrichten für Ihre Zielkandidaten. Beschreiben Sie die Rolle und wir erledigen den Rest.",
    placeholder: "z.B. Suche nach einem React-Entwickler"
  },
  prompt: {
    default: "Fragen Sie alles",
    description: "Beschreiben Sie die Position...",
    tone: "Geben Sie einen Ton ein oder wählen Sie einen oben aus...",
    context: "Zusätzliche Details (optional)...",
    message: "Schreiben Sie eine Nachricht..."
  },
  flow: {
    skip: "Überspringen",
    skipUserMessage: "Überspringen"
  },
  assistant: {
    description: (positionTitle) =>
      `Großartig! Lassen Sie uns eine Outreach-Nachricht für **${positionTitle}** erstellen.\n\n` +
      `Beschreiben Sie zunächst kurz die Rolle: erforderliche Fähigkeiten, Erfahrungsstufe, ` +
      `Arbeitsvereinbarung oder Unternehmenskultur.`,
    tone: "Danke! Welchen Ton soll die Nachricht haben? Wählen Sie unten einen aus oder geben Sie Ihren bevorzugten Ton ein.",
    context:
      "Ein letzter Schritt: Sollen weitere Details hinzugefügt werden? " +
      "(Optional – z. B. remote-freundlich, Series-B-Startup, Gehaltsspanne)\n\n" +
      "Or drücken Sie die Schaltfläche **Überspringen**, um fortzufahren.",
    generating: "Ihre Nachricht wird generiert, einen Moment bitte...",
    invalidTone: "Ich habe diesen Ton nicht erkannt. Bitte wählen Sie einen aus oder geben Sie einen ein: Professional, Friendly, Formal, Casual, Confident, Conversational.",
    loginRequired: "Sie müssen sich anmelden, um die Nachricht zu generieren. Nach der Anmeldung können Sie zu diesem Chat zurückkehren.",
    generateError: "Beim Generieren der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
  },
  composer: {
    disclaimer: "Tonely generiert personalisierte LinkedIn-DMs, Beitragsinhalte und Outreach-Nachrichten für Personalvermittler. Mit dem Fortfahren akzeptieren Sie unsere Nutzungsbedingungen."
  },
  auth: {
    logIn: "Einloggen",
    signUpFree: "Kostenlos registrieren",
    signOut: "Abmelden",
    welcomeBack: "Willkommen zurück",
    signInSubtitle: "Melden Sie sich bei Ihrem Tonely-Konto an",
    createAccount: "Konto erstellen",
    registerSubtitle: "Beginnen Sie mit der Erstellung personalisierter Outreach-Nachrichten",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Ihr vollständiger Name",
    email: "E-Mail-Adresse",
    password: "Passwort",
    signIn: "Einloggen",
    createAccountButton: "Konto erstellen",
    noAccount: "Haben Sie noch kein Konto?",
    hasAccount: "Haben Sie bereits ein Konto?",
    createOne: "Erstellen Sie eines",
    signInLink: "Einloggen",
    loginFailed: "Anmeldung fehlgeschlagen",
    registerFailed: "Registrierung fehlgeschlagen",
    emailPlaceholder: "ihrname@unternehmen.com",
    passwordPlaceholder: "••••••••",
    passwordRegisterPlaceholder: "Mindestens 8 Zeichen",
    confirmPassword: "Passwort bestätigen",
    confirmPasswordPlaceholder: "Passwort wiederholen",
    passwordMismatch: "Passwörter stimmen nicht überein",
  },
  message: {
    copy: "Kopieren",
    copied: "Kopiert"
  },
  sidebar: {
    newChat: "Neuer Chat",
    history: "Verlauf",
    plans: "Pläne & Preise anzeigen",
    settings: "Einstellungen",
    help: "Hilfe",
    noChats: "Noch keine Unterhaltungen. Starten Sie einen neuen Chat, um LinkedIn-DMs, Beitragsinhalte oder Outreach-Nachrichten zu erstellen.",
    authCtaTitle: "Speichern Sie Ihre Unterhaltungen",
    authCtaBody: "Melden Sie sich an, um Ihre LinkedIn-DMs, Beitragsinhalte und Outreach-Nachrichten an einem Ort zu speichern.",
    newConversation: "Neue Unterhaltung"
  },
  legal: {
    prefix: "Durch das Senden einer Nachricht an Tonely, einen KI-Chatbot, stimmen Sie unseren",
    terms: "Nutzungsbedingungen",
    middle: "zu und bestätigen, dass Sie unsere",
    privacy: "Datenschutzerklärung",
    suffix: "gelesen haben."
  },
  common: {
    brand: "Tonely",
    badge: "Personalbeschaffung",
    send: "Nachricht senden",
    userMenu: "Benutzermenü",
    deleteConversation: "Unterhaltung löschen"
  },
  locale: {
    label: "Sprache",
    en: "English",
    tr: "Türkçe",
    de: "Deutsch",
    it: "Italiano"
  },
  toast: {
    conversationLoadFailed: "Unterhaltungen konnten nicht geladen werden",
    conversationCreateFailed: "Unterhaltung konnte nicht erstellt werden",
    conversationDeleteFailed: "Unterhaltung konnte nicht gelöscht werden",
    messageLoadFailed: "Nachrichten konnten nicht geladen werden",
    registerSuccess: "Konto erstellt! Sie können sich jetzt anmelden."
  },
  settings: {
    title: "Einstellungen",
    subtitle: "Verwalten Sie Ihre Kontoeinstellungen und Anwendungseinstellungen.",
    profile: "Profil",
    profileInformation: "Profilinformationen",
    fullName: "Vollständiger Name",
    emailAddress: "E-Mail-Adresse",
    saveChanges: "Änderungen speichern"
  },
  help: {
    title: "Wie können wir helfen?",
    subtitle: "Durchsuchen Sie unsere Wissensdatenbank oder kontaktieren Sie unser Support-Team.",
    contactSupport: "Support kontaktieren",
    contactDescription: "Haben Sie technische Probleme oder Fragen zu Ihrer Abrechnung? Unser Support-Team hilft Ihnen gerne weiter.",
    faq: "Häufig gestellte Fragen",
    faq1Title: "Wie wählt die KI den richtigen Ton aus?",
    faq1Desc: "Unsere KI analysiert den von Ihnen bereitgestellten Kontext und wendet spezielle Prompting-Techniken an, um sicherzustellen, dass die Ausgabe Ihrem gewünschten Stil entspricht, egal ob streng professionell oder hochgradig enthusiastisch.",
    faq2Title: "Kann ich meine generierten Nachrichten speichern?",
    faq2Desc: "Ja! Alle Ihre generierten Nachrichten werden automatisch im Tab 'Verlauf' gespeichert, wo Sie sie jederzeit anzeigen und kopieren können.",
    faq3Title: "Wie werden meine Daten behandelt?",
    faq3Desc: "Wir verwenden Ihre generierten Nachrichten oder Kandidatendaten nicht zum Trainieren unserer öffentlichen Modelle. Alle Daten werden sicher gespeichert und verschlüsselt."
  },
  quota: {
    exceeded: "Sie haben Ihr kostenloses Nachrichtenlimit erreicht.",
    upgradeCta: "Pläne ansehen →",
  },
  plans: {
    title: "Pläne & Preise",
    subtitle: "Einfache, transparente Pläne, entwickelt für Personalvermittler und HR-Profis.",
    free: {
      name: "Kostenlos",
      price: "0 €",
      period: "dauerhaft",
      description: "Perfekt für den Einstieg in die personalisierte Kandidatenansprache.",
      buttonText: "Aktueller Plan",
      currentPlanBadge: "Aktiv",
      features: [
        "1 Outreach-Nachrichten / Monat",
        "Standard-KI-Tuning für Tonalität",
        "Verlauf für 7 Tage speichern",
      ]
    }
  }
};