"use client";

import { useState } from "react";
import { Upload, Car, User, FileText, CheckCircle, AlertCircle, Building, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function PartnerRegisterPage() {
  const t = useTranslations("PartnerRegister");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call or Sheet integration
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-xl border border-surface-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 mb-2">{t("successTitle")}</h2>
          <p className="text-surface-600 mb-8">
            {t("successDesc")}
          </p>
          <Link href="/" className="block w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors">
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      <nav className="p-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("backToHome")}
        </Link>
        <LanguageSwitcher />
      </nav>

      <div className="flex-1 py-6 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-600 mb-3">{t("title")}</h1>
            <p className="text-surface-600">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-surface-100 overflow-hidden">
            <div className="p-8 space-y-8">
              
              {/* Section 1 */}
              <section>
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-500" /> {t("section1")}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("applyType")}</label>
                    <select required className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none">
                      <option value="">{t("applyTypePlaceholder")}</option>
                      <option value="individual">{t("typeIndividual")}</option>
                      <option value="company">{t("typeCompany")}</option>
                      <option value="partnership">{t("typePartnership")}</option>
                      <option value="group">{t("typeGroup")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("ownerName")}</label>
                    <input type="text" required placeholder={t("ownerNamePlaceholder")} className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-brand-500" /> {t("section2")}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("plateNumber")}</label>
                    <input type="text" required placeholder={t("plateNumberPlaceholder")} className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("insuranceType")}</label>
                    <select required className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none">
                      <option value="">{t("insuranceTypePlaceholder")}</option>
                      <option value="class1">{t("ins1")}</option>
                      <option value="class2plus">{t("ins2")}</option>
                      <option value="class3plus">{t("ins3")}</option>
                      <option value="commercial">{t("insCom")}</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-500" /> {t("section3")}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("licenseNumber")}</label>
                    <input type="text" required placeholder={t("licenseNumberPlaceholder")} className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">{t("licenseExpiry")}</label>
                    <input type="date" required className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" />
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h3 className="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-500" /> {t("section4")}
                </h3>
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-orange-800">
                    {t("docNotice")}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* File Upload 1 */}
                  <div className="border-2 border-dashed border-surface-300 rounded-xl p-6 text-center hover:bg-surface-50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                    <p className="font-bold text-surface-700 text-sm">{t("uploadLicense")}</p>
                    <p className="text-xs text-surface-500 mt-1">{t("clickToUpload")}</p>
                  </div>
                  
                  {/* File Upload 2 */}
                  <div className="border-2 border-dashed border-surface-300 rounded-xl p-6 text-center hover:bg-surface-50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                    <p className="font-bold text-surface-700 text-sm">{t("uploadReg")}</p>
                    <p className="text-xs text-surface-500 mt-1">{t("regDesc")}</p>
                  </div>

                  {/* Car Photos Upload */}
                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-surface-900 mb-3 flex items-center gap-2">
                      <Car className="w-4 h-4 text-brand-500" /> {t("carPhotos")}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoFront")}</p>
                      </div>
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoBack")}</p>
                      </div>
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoRight")}</p>
                      </div>
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoLeft")}</p>
                      </div>
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoPlate")}</p>
                      </div>
                      <div className="border-2 border-dashed border-surface-300 rounded-xl p-4 text-center hover:bg-surface-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                        <Upload className="w-6 h-6 text-surface-400 mb-2" />
                        <p className="font-bold text-surface-700 text-xs">{t("photoOther")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
            </div>
            
            <div className="bg-surface-50 p-8 border-t border-surface-200">
              <button type="submit" className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2">
                <CheckCircle className="w-5 h-5" /> {t("submit")}
              </button>
              <p className="text-center text-xs text-surface-500 mt-4">
                {t("agreementPrefix")} <Link href="#" className="text-brand-600 underline">{t("agreementLink")}</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
