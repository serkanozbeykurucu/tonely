export type Locale = "en" | "tr" | "de" | "it";

export interface Dictionary {
  hero: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
  prompt: {
    default: string;
    description: string;
    tone: string;
    context: string;
    message: string;
  };
  flow: {
    skip: string;
    skipUserMessage: string;
  };
  assistant: {
    description: (positionTitle: string) => string;
    tone: string;
    context: string;
    generating: string;
    invalidTone: string;
    loginRequired: string;
    generateError: string;
  };
  composer: {
    disclaimer: string;
  };
  auth: {
    logIn: string;
    signUpFree: string;
    signOut: string;
    welcomeBack: string;
    signInSubtitle: string;
    createAccount: string;
    registerSubtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    password: string;
    signIn: string;
    createAccountButton: string;
    noAccount: string;
    hasAccount: string;
    createOne: string;
    signInLink: string;
    loginFailed: string;
    registerFailed: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    passwordRegisterPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    passwordMismatch: string;
  };
  message: {
    copy: string;
    copied: string;
  };
  sidebar: {
    newChat: string;
    history: string;
    plans: string;
    settings: string;
    help: string;
    noChats: string;
    authCtaTitle: string;
    authCtaBody: string;
    newConversation: string;
  };
  legal: {
    prefix: string;
    terms: string;
    middle: string;
    privacy: string;
    suffix: string;
  };
  common: {
    brand: string;
    badge: string;
    send: string;
    userMenu: string;
    deleteConversation: string;
  };
  locale: {
    label: string;
    en: string;
    tr: string;
    de: string;
    it: string;
  };
  toast: {
    conversationLoadFailed: string;
    conversationCreateFailed: string;
    conversationDeleteFailed: string;
    messageLoadFailed: string;
    registerSuccess: string;
  };
  settings: {
    title: string;
    subtitle: string;
    profile: string;
    profileInformation: string;
    fullName: string;
    emailAddress: string;
    saveChanges: string;
  };
  help: {
    title: string;
    subtitle: string;
    contactSupport: string;
    contactDescription: string;
    faq: string;
    faq1Title: string;
    faq1Desc: string;
    faq2Title: string;
    faq2Desc: string;
    faq3Title: string;
    faq3Desc: string;
  };
  plans: {
    title: string;
    subtitle: string;
    free: {
      name: string;
      price: string;
      period: string;
      description: string;
      buttonText: string;
      currentPlanBadge: string;
      features: string[];
    };
  };
  quota: {
    exceeded: string;
    upgradeCta: string;
  };
}