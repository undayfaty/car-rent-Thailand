import { Link } from "@/i18n/routing";
import { Car, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navigation');
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-yellow-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-5 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3 mr-4 border-r border-white/20 pr-6">
            <LanguageSwitcher />
          </div>
          <Link href="/login" className="text-sm font-bold tracking-widest uppercase hover:text-yellow-500 transition-colors">
            {tNav('login')}
          </Link>
          <Link href="/register" className="px-6 py-2.5 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-yellow-500 transition-colors">
            {tNav('register')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 relative overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10"></div>
          <img 
            src="/hero_chauffeur.png" 
            alt="Premium Chauffeur Service" 
            className="w-full h-full object-cover object-center opacity-100"
          />
        </div>
        
        <div className="z-10 w-full max-w-5xl flex flex-col items-center">
          <h2 className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-yellow-500/50"></span>
            Premium Chauffeur Service
            <span className="w-12 h-px bg-yellow-500/50"></span>
          </h2>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-white">
            {t('title')}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 font-light leading-relaxed">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/intro" className="px-10 py-4 bg-yellow-500 text-black text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              {t('cta1')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/destinations" className="px-10 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              {t('cta2')}
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left">
            <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="mb-6 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity">
                <Car className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-wide">{t('features.variety')}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{t('features.varietyDesc')}</p>
            </div>
            
            <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="mb-6 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-wide">{t('features.safety')}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{t('features.safetyDesc')}</p>
            </div>
            
            <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="mb-6 text-yellow-500 opacity-80 group-hover:opacity-100 transition-opacity">
                <MapPin className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-wide">{t('features.payment')}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{t('features.paymentDesc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
