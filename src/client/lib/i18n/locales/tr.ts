import type { Dictionary } from "../types";

export const tr: Dictionary = {
  hero: {
    title: "Hazır olduğunda buradayız.",
    subtitle:
      "Aradığın kişiye özel LinkedIn DM, post içeriği ve outreach mesajı hazırlayabilirsin. Pozisyonu yaz, gerisini birlikte tamamlayalım.",
    placeholder: "Örn. React Developer arıyorum",
  },
  prompt: {
    default: "Bir şey sor",
    description: "Pozisyon açıklamasını yaz...",
    tone: "Ton yaz veya yukarıdan seç...",
    context: "Ek detay (isteğe bağlı)...",
    message: "Mesaj yaz...",
  },
  flow: {
    skip: "Atla",
    skipUserMessage: "Atla",
  },
  assistant: {
    description: (positionTitle) =>
      `Harika! **${positionTitle}** pozisyonu için bir outreach mesajı hazırlayalım.\n\n` +
      `Önce pozisyonu kısaca tanımlar mısın? Gerekli beceriler, deneyim seviyesi, ` +
      `çalışma şekli veya şirket kültürü gibi detaylar yeterli.`,
    tone:
      "Teşekkürler! Mesajın tonu nasıl olsun? " +
      "Aşağıdan birini seçebilir veya istediğin tonu yazabilirsin.",
    context:
      "Son bir adım: eklemek istediğin özel bir detay var mı? " +
      "(İsteğe bağlı — örn. uzaktan çalışma, Seri B startup, teklif aralığı)\n\n" +
      "Yoksa **Atla** butonuna basabilirsin.",
    generating: "Mesajını hazırlıyorum, bir saniye...",
    invalidTone:
      "Bu tonu tanıyamadım. Lütfen şunlardan birini seç veya yaz: " +
      "Professional, Friendly, Formal, Casual, Confident, Conversational.",
    loginRequired:
      "Mesajı oluşturmak için giriş yapman gerekiyor. " +
      "Giriş yaptıktan sonra bu sohbete geri dönebilirsin.",
    generateError:
      "Mesaj oluşturulurken bir hata oluştu. Lütfen tekrar dene.",
  },
  composer: {
    disclaimer:
      "Tonely, aradığınız kişiye özel LinkedIn DM, post içeriği ve outreach mesajları üretir. Devam ederek kullanım koşullarını kabul etmiş olursun.",
  },
  auth: {
    logIn: "Giriş yap",
    signUpFree: "Ücretsiz kayıt ol",
    signOut: "Çıkış yap",
    welcomeBack: "Tekrar hoş geldin",
    signInSubtitle: "Tonely hesabına giriş yap",
    createAccount: "Hesap oluştur",
    registerSubtitle: "Kişiselleştirilmiş outreach üretmeye başla",
    fullName: "Ad Soyad",
    fullNamePlaceholder: "Adın Soyadın",
    email: "E-posta",
    password: "Şifre",
    signIn: "Giriş yap",
    createAccountButton: "Hesap oluştur",
    noAccount: "Hesabın yok mu?",
    hasAccount: "Zaten hesabın var mı?",
    createOne: "Oluştur",
    signInLink: "Giriş yap",
    loginFailed: "Giriş başarısız",
    registerFailed: "Kayıt başarısız",
    emailPlaceholder: "sen@sirket.com",
    passwordPlaceholder: "••••••••",
    passwordRegisterPlaceholder: "En az 8 karakter",
    confirmPassword: "Şifreyi Onayla",
    confirmPasswordPlaceholder: "Şifrenizi tekrar girin",
    passwordMismatch: "Şifreler eşleşmiyor",
  },
  message: {
    copy: "Kopyala",
    copied: "Kopyalandı",
  },
  sidebar: {
    newChat: "Yeni sohbet",
    history: "Geçmiş",
    plans: "Planlar ve fiyatlandırma",
    settings: "Ayarlar",
    help: "Yardım",
    noChats: "Henüz sohbet yok. LinkedIn DM, post içeriği veya outreach mesajı hazırlamak için yeni sohbet başlat.",
    authCtaTitle: "Sohbetlerini kaydet",
    authCtaBody:
      "Giriş yaparak LinkedIn DM, post içeriği ve outreach mesajlarını tek yerde kaydet ve yönet.",
    newConversation: "Yeni sohbet",
  },
  legal: {
    prefix: "Tonely yapay zeka sohbet botuna mesaj göndererek",
    terms: "Koşulları",
    middle: "kabul ettiğini ve",
    privacy: "Gizlilik Politikası",
    suffix: "'nı okuduğunu onaylamış olursun.",
  },
  common: {
    brand: "Tonely",
    badge: "İşe alım outreach",
    send: "Mesaj gönder",
    userMenu: "Kullanıcı menüsü",
    deleteConversation: "Sohbeti sil",
  },
  locale: {
    label: "Dil",
    en: "English",
    tr: "Türkçe",
    de: "Almanca",
    it: "İtalyanca"
  },
  toast: {
    conversationLoadFailed: "Sohbetler yüklenemedi",
    conversationCreateFailed: "Sohbet oluşturulamadı",
    conversationDeleteFailed: "Sohbet silinemedi",
    messageLoadFailed: "Mesajlar yüklenemedi",
    registerSuccess: "Hesap oluşturuldu! Giriş yapabilirsin.",
  },
  settings: {
    title: "Ayarlar",
    subtitle: "Hesap tercihlerinizi ve uygulama ayarlarını yönetin.",
    profile: "Profil",
    profileInformation: "Profil Bilgileri",
    fullName: "Ad Soyad",
    emailAddress: "E-posta Adresi",
    saveChanges: "Değişiklikleri Kaydet",
  },
  help: {
    title: "Nasıl yardımcı olabiliriz?",
    subtitle: "Bilgi bankamızda arama yapın veya destek ekibimizle iletişime geçin.",
    contactSupport: "Destek ile İletişime Geçin",
    contactDescription: "Teknik sorunlar mı yaşıyorsunuz veya faturalandırmayla ilgili sorularınız mı var? Destek ekibimiz yardım etmek için burada.",
    faq: "Sık Sorulan Sorular",
    faq1Title: "Yapay zeka doğru tonu nasıl seçiyor?",
    faq1Desc: "Yapay zekamız sağladığınız bağlamı analiz eder ve tamamen profesyonel veya son derece hevesli olmasını istediğiniz mesajın, tercih ettiğiniz stile uygun olmasını sağlamak için özel prompt teknikleri uygular.",
    faq2Title: "Oluşturduğum mesajları kaydedebilir miyim?",
    faq2Desc: "Evet! Tüm oluşturduğunuz mesajlar Geçmiş sekmesinde otomatik olarak kaydedilir. Orada istediğiniz zaman görüntüleyebilir ve kopyalayabilirsiniz.",
    faq3Title: "Verilerim nasıl işleniyor?",
    faq3Desc: "Oluşturduğunuz mesajları veya aday verilerini açık modellerimizi eğitmek için kullanmıyoruz. Tüm veriler güvenli bir şekilde saklanır ve şifrelenir."
  },
  quota: {
    exceeded: "Ücretsiz mesaj limitine ulaştın.",
    upgradeCta: "Planları gör →",
  },
  plans: {
    title: "Planlar ve Fiyatlandırma",
    subtitle: "İşe alım uzmanları ve İK profesyonelleri için tasarlanmış basit, şeffaf planlar.",
    free: {
      name: "Ücretsiz",
      price: "0 €",
      period: "süresiz",
      description: "Kişiselleştirilmiş aday iletişimine başlamak için mükemmel bir seçenek.",
      buttonText: "Mevcut Plan",
      currentPlanBadge: "Aktif",
      features: [
        "Aylık 1 outreach mesajı",
        "Standart yapay zeka ton ayarlama",
        "7 günlük sohbet geçmişi saklama",
      ]
    }
  }
};