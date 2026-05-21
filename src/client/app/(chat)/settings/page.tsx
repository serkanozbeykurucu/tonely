"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { api } from "@/lib/api/client";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<{ fullName: string; email: string }>({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get<{ data: { fullName: string; email: string } }>("/api/v1/Account/profile");
        if (res) {
          if ("data" in res && res.data) {
            setProfile(res.data);
          } else {
            setProfile(res as unknown as { fullName: string; email: string });
          }
        }
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await api.put("/api/v1/Account/profile", { fullName: profile?.fullName ?? "" });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto px-6 py-8 w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-medium text-[var(--text)] mb-2">{t.settings.title}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{t.settings.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-hover)] text-[var(--text)] font-medium text-sm transition-colors">
              <User size={18} />
              {t.settings.profile}
            </button>
          </nav>
        </div>

        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[var(--radius-lg)] p-6 space-y-6"
          >
            <div>
              <h2 className="text-lg font-semibold text-[var(--text)] mb-4">{t.settings.profileInformation}</h2>
              {loading ? (
                <div className="py-8 flex justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin text-[var(--accent)]" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)] text-xl font-medium">
                      {profile?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>
                  
                  <Input 
                    label={t.settings.fullName} 
                    value={profile?.fullName ?? ""} 
                    onChange={e => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                  <Input 
                    label={t.settings.emailAddress} 
                    value={profile?.email ?? ""} 
                    disabled 
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex justify-end">
              <Button onClick={handleSave} disabled={loading} loading={saving}>{t.settings.saveChanges}</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
