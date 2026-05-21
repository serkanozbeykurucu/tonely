"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/lib/api/auth";
import { useTranslation } from "@/lib/i18n/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t.auth.passwordMismatch);
      return;
    }
    setLoading(true);
    try {
      await register({ fullName, email, password, confirmPassword });
      toast.success(t.toast.registerSuccess);
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.auth.registerFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <h1 className="font-display text-2xl font-medium text-(--text)">
          {t.auth.createAccount}
        </h1>
        <p className="text-sm text-(--text-secondary)">{t.auth.registerSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t.auth.fullName}
          type="text"
          placeholder={t.auth.fullNamePlaceholder}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />
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
          placeholder={t.auth.passwordRegisterPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />
        <Input
          label={t.auth.confirmPassword}
          type="password"
          placeholder={t.auth.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          variant="accent"
          loading={loading}
          className="w-full mt-2"
          size="md"
        >
          {t.auth.createAccountButton}
        </Button>
      </form>

      <p className="text-center text-sm text-(--text-secondary)">
        {t.auth.hasAccount}{" "}
        <Link
          href="/login"
          className="text-(--accent-light) hover:text-(--accent) transition-colors font-medium"
        >
          {t.auth.signInLink}
        </Link>
      </p>
    </div>
  );
}