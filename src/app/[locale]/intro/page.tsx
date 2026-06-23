"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Car, ShieldCheck, Star } from "lucide-react";

export default function CompanyIntroPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Auto-progress bar for loading effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2; // increments of 2%
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/60 via-surface-50 to-surface-50"></div>
      
      <main className="z-10 w-full max-w-3xl glass p-10 md:p-16 rounded-[2.5rem] text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 bg-brand-100 rounded-3xl flex items-center justify-center text-brand-600 mb-8"
        >
          <Car className="w-12 h-12" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-surface-900"
        >
          Car Rent Thailand
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-surface-600 max-w-xl mb-12"
        >
          ผู้ให้บริการรถเช่าพร้อมคนขับระดับพรีเมียม ประสบการณ์มากกว่า 10 ปี มุ่งเน้นความปลอดภัย ความสะดวกสบาย และการบริการระดับ First Class
        </motion.p>

        {/* Features / Guarantees */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12 text-left"
        >
          <div className="flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-2" />
            <h3 className="font-bold text-surface-800">ปลอดภัยสูงสุด</h3>
            <p className="text-sm text-surface-500 mt-1">ตรวจสอบคนขับและรถอย่างเคร่งครัด</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl">
            <Star className="w-8 h-8 text-accent-500 mb-2" />
            <h3 className="font-bold text-surface-800">บริการระดับ 5 ดาว</h3>
            <p className="text-sm text-surface-500 mt-1">คนขับมารยาทดี ตรงต่อเวลา</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl">
            <Car className="w-8 h-8 text-brand-500 mb-2" />
            <h3 className="font-bold text-surface-800">รถยนต์พรีเมียม</h3>
            <p className="text-sm text-surface-500 mt-1">รถใหม่ สะอาด พร้อมประกันภัยชั้น 1</p>
          </div>
        </motion.div>

        {/* Loading Bar & Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-full max-w-md flex flex-col items-center"
        >
          {progress < 100 ? (
            <div className="w-full">
              <div className="flex justify-between text-sm text-surface-500 mb-2">
                <span>กำลังโหลดระบบ...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-brand-500 h-2.5 rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/register')}
              className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-xl transition-all"
            >
              เข้าสู่หน้าลงทะเบียน
            </motion.button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
