"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft, Upload, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { signup } from "@/app/actions/auth";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function RegisterPage() {
  const t = useTranslations("Register");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const result = await signup(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col">
      <nav className="p-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("back")}
        </Link>
        <LanguageSwitcher />
      </nav>

      <main className="flex-1 flex items-center justify-center p-4 pb-20">
        <div className="glass dark:glass-dark w-full max-w-2xl p-8 rounded-3xl shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
            <p className="text-surface-600 dark:text-surface-400">{t("subtitle")}</p>
          </div>

          <form action={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm font-medium border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="firstName">{t("firstName")}</label>
                <input id="firstName" name="firstName" type="text" required className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("firstNamePlaceholder")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="lastName">{t("lastName")}</label>
                <input id="lastName" name="lastName" type="text" required className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("lastNamePlaceholder")} />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-surface-200 dark:border-surface-800 pb-2">{t("contactInfo")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="phone">{t("phone")}</label>
                  <input id="phone" name="phone" type="tel" required className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("phonePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">{t("email")}</label>
                  <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("emailPlaceholder")} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="password">{t("password")}</label>
                  <input id="password" name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("passwordPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("lineId")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("linePlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("whatsapp")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("whatsappPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("wechat")}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder={t("wechatPlaceholder")} />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold border-b border-surface-200 dark:border-surface-800 pb-2">{t("documents")}</h3>
              <p className="text-sm text-surface-500">{t("documentsDesc")}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 mb-2 text-surface-400 group-hover:text-brand-500 transition-colors" />
                  <span className="text-sm font-medium">{t("uploadId")}</span>
                  <input type="file" className="hidden" />
                </div>
                <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer group">
                  <Upload className="w-8 h-8 mb-2 text-surface-400 group-hover:text-brand-500 transition-colors" />
                  <span className="text-sm font-medium">{t("uploadLicense")}</span>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl mt-8 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> {t("submitting")}</> : t("submit")}
            </button>
            <p className="text-center text-sm text-surface-500 mt-4">
              {t("note")}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
