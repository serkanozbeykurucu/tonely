import type { Dictionary } from "../types";

export const en: Dictionary = {
  hero: {
    title: "Ready when you are.",
    subtitle:
      "Craft personalized LinkedIn DMs, post content, and outreach messages for the candidate you're targeting. Describe the role and we'll handle the rest.",
    placeholder: "e.g. Looking for a React Developer",
  },
  prompt: {
    default: "Ask anything",
    description: "Describe the position...",
    tone: "Type a tone or pick one above...",
    context: "Additional details (optional)...",
    message: "Send a message...",
  },
  flow: {
    skip: "Skip",
    skipUserMessage: "Skip",
  },
  assistant: {
    description: (positionTitle) =>
      `Great! Let's craft an outreach message for **${positionTitle}**.\n\n` +
      `First, briefly describe the role: required skills, experience level, ` +
      `work arrangement, or company culture.`,
    tone:
      "Thanks! What tone should the message have? " +
      "Pick one below or type your preferred tone.",
    context:
      "One last step: any extra details to include? " +
      "(Optional — e.g. remote-friendly, Series B startup, salary range)\n\n" +
      "Or press the **Skip** button to continue.",
    generating: "Generating your message, one moment...",
    invalidTone:
      "I didn't recognize that tone. Please pick or type one of: " +
      "Professional, Friendly, Formal, Casual, Confident, Conversational.",
    loginRequired:
      "You need to sign in to generate the message. " +
      "After signing in, you can return to this chat.",
    generateError:
      "Something went wrong while generating the message. Please try again.",
  },
  composer: {
    disclaimer:
      "Tonely generates personalized LinkedIn DMs, post content, and recruiter outreach messages. By continuing you accept our terms of use.",
  },
  auth: {
    logIn: "Log in",
    signUpFree: "Sign up for free",
    signOut: "Sign out",
    welcomeBack: "Welcome back",
    signInSubtitle: "Sign in to your Tonely account",
    createAccount: "Create account",
    registerSubtitle: "Start generating personalized outreach",
    fullName: "Full Name",
    fullNamePlaceholder: "Your Full Name",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    createAccountButton: "Create account",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    createOne: "Create one",
    signInLink: "Sign in",
    loginFailed: "Login failed",
    registerFailed: "Registration failed",
    emailPlaceholder: "you@company.com",
    passwordPlaceholder: "••••••••",
    passwordRegisterPlaceholder: "At least 8 characters",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Repeat your password",
    passwordMismatch: "Passwords do not match",
  },
  message: {
    copy: "Copy",
    copied: "Copied",
  },
  sidebar: {
    newChat: "New chat",
    history: "History",
    plans: "See plans and pricing",
    settings: "Settings",
    help: "Help",
    noChats: "No conversations yet. Start a new chat to craft LinkedIn DMs, post content, or outreach messages.",
    authCtaTitle: "Save your conversations",
    authCtaBody:
      "Sign in to keep your LinkedIn DMs, post content, and outreach messages in one place.",
    newConversation: "New conversation",
  },
  legal: {
    prefix: "By messaging Tonely, an AI chatbot, you agree to our",
    terms: "Terms",
    middle: "and have read our",
    privacy: "Privacy Policy",
    suffix: ".",
  },
  common: {
    brand: "Tonely",
    badge: "Recruiter outreach",
    send: "Send message",
    userMenu: "User menu",
    deleteConversation: "Delete conversation",
  },
  locale: {
    label: "Language",
    en: "English",
    tr: "Turkish",
    de: "German",
    it: "Italian"
  },
  toast: {
    conversationLoadFailed: "Failed to load conversations",
    conversationCreateFailed: "Failed to create conversation",
    conversationDeleteFailed: "Failed to delete conversation",
    messageLoadFailed: "Failed to load messages",
    registerSuccess: "Account created! You can now sign in.",
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your account preferences and application settings.",
    profile: "Profile",
    profileInformation: "Profile Information",
    fullName: "Full Name",
    emailAddress: "Email Address",
    saveChanges: "Save Changes",
  },
  help: {
    title: "How can we help?",
    subtitle: "Search our knowledge base or get in touch with our support team.",
    contactSupport: "Contact Support",
    contactDescription: "Having technical issues or questions about your billing? Our support team is here to help.",
    faq: "Frequently Asked Questions",
    faq1Title: "How does the AI choose the right tone?",
    faq1Desc: "Our AI analyzes the context you provide and applies specialized prompting techniques to ensure the output matches your desired style, whether it's strictly professional or highly enthusiastic.",
    faq2Title: "Can I save my generated messages?",
    faq2Desc: "Yes! All your generated messages are automatically saved in the History tab, where you can view and copy them at any time.",
    faq3Title: "How is my data handled?",
    faq3Desc: "We do not use your generated messages or candidate data to train our public models. All data is securely stored and encrypted."
  },
  quota: {
    exceeded: "You've reached your free message limit.",
    upgradeCta: "See plans →",
  },
  plans: {
    title: "Plans & Pricing",
    subtitle: "Simple, transparent plans designed for recruiters and HR professionals.",
    free: {
      name: "Free",
      price: "0 €",
      period: "forever",
      description: "Perfect for getting started with personalized candidate outreach.",
      buttonText: "Current Plan",
      currentPlanBadge: "Active",
      features: [
        "1 outreach messages / mo",
        "Standard AI tone tuning",
        "Save history for 7 days",
      ]
    }
  }
};