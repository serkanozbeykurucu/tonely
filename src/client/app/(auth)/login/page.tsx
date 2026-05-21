"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      setAuthenticated(true);
      router.push("/chat");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.auth.loginFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <h1 className="font-display text-2xl font-medium text-[var(--text)]">
          {t.auth.welcomeBack}
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">{t.auth.signInSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t.auth.email}
          type="email"
          placeholder={t.auth.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label={t.auth.password}
          type="password"
          placeholder={t.auth.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="accent"
          loading={loading}
          className="w-full mt-2"
          size="md"
        >
          {t.auth.signIn}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--text-secondary)]">
        {t.auth.noAccount}{" "}
        <Link
          href="/register"
          className="text-[var(--accent-light)] hover:text-[var(--accent)] transition-colors font-medium"
        >
          {t.auth.createOne}
        </Link>
      </p>
    </div>
  );
}