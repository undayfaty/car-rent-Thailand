"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft, Car, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { login } from "@/app/actions/auth";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // If successful, it will redirect, so no need to stop loading
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
      <nav className="p-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("back")}
        </Link>
        <LanguageSwitcher />
      </nav>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="glass dark:glass-dark w-full max-w-md p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Car className="w-8 h-8" />
            </div>
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-surface-600 dark:text-surface-400">{t("subtitle")}</p>
          </div>

          <form action={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">{t("email")}</label>
              <input 
                id="email"
                name="email"
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                placeholder={t("emailPlaceholder")} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">{t("password")}</label>
              <input 
                id="password"
                name="password"
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                placeholder={t("passwordPlaceholder")} 
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" />
                <span>{t("rememberMe")}</span>
              </label>
              <Link href="#" className="text-brand-600 dark:text-brand-400 hover:underline">{t("forgotPassword")}</Link>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white text-center font-bold rounded-xl mt-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> {t("submitting")}</>
              ) : (
                t("submit")
              )}
            </button>
          </form>

          <p className="text-center text-sm text-surface-600 dark:text-surface-400 mt-8">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
              {t("registerHere")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
