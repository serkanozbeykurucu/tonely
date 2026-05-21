"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";

export default function HelpPage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-6 py-8 w-full max-w-5xl mx-auto">
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-medium text-[var(--text)] mb-3">{t.help.title}</h1>
        <p className="text-[var(--text-secondary)]">{t.help.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[var(--radius-lg)] p-6 hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] mb-4">
            <Mail size={24} />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">{t.help.contactSupport}</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
            {t.help.contactDescription}
          </p>
          <Button variant="ghost" size="sm" className="gap-2 px-0 hover:bg-transparent text-[var(--accent)]">
            support@tonely.dev
          </Button>
        </motion.div>
      </div>

      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="text-xl font-semibold text-[var(--text)] mb-6 flex items-center gap-2">
          <MessageSquare size={20} className="text-[var(--accent)]" />
          {t.help.faq}
        </h3>
        
        <div className="space-y-6">
          <div className="pb-6 border-b border-[var(--border)]">
            <h4 className="font-medium text-[var(--text)] mb-2">{t.help.faq1Title}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.help.faq1Desc}
            </p>
          </div>
          <div className="pb-6 border-b border-[var(--border)]">
            <h4 className="font-medium text-[var(--text)] mb-2">{t.help.faq2Title}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.help.faq2Desc}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-[var(--text)] mb-2">{t.help.faq3Title}</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {t.help.faq3Desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}