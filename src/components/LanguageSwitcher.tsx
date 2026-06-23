"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe, Check } from 'lucide-react';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'th', display: 'TH', name: 'ไทย' },
  { code: 'en', display: 'EN', name: 'English' },
  { code: 'jp', display: 'JP', name: '日本語' },
  { code: 'ru', display: 'RU', name: 'Русский' },
  { code: 'vn', display: 'VN', name: 'Tiếng Việt' },
  { code: 'cn', display: 'CN', name: '中文' },
];


export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }
    
    // Save preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLocale', newLocale);
      
      // Direct navigation: replace current locale in path with new locale
      const url = new URL(window.location.href);
      // Replace /locale from pathname with new locale
      const newPathname = url.pathname.replace(`/${locale}`, `/${newLocale}`);
      url.pathname = newPathname;
      window.location.href = url.toString();
    }
    
    setIsOpen(false);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === locale);

  return (
    <div className="relative">
      {/* Language Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 active:bg-white/30 transition-all duration-200 group"
        title="เปลี่ยนภาษา / Change Language"
      >
        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-bold hidden sm:inline">
          {currentLanguage?.display}
        </span>
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-900 rounded-xl shadow-2xl z-50 border border-surface-200 dark:border-surface-700 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-900/10 border-b border-surface-200 dark:border-surface-700">
              <p className="text-xs font-semibold text-surface-600 dark:text-surface-400">เลือกภาษา / Select Language</p>
            </div>
            
            {/* Language Options */}
            <div className="py-2">
              {LANGUAGES.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full px-4 py-2.5 text-sm flex items-center gap-3 transition-all duration-150 ${
                      isActive
                        ? 'bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-semibold'
                        : 'text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800/50'
                    }`}
                  >
                    <span className="text-sm font-bold w-6">{lang.display}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {isActive && (
                      <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
