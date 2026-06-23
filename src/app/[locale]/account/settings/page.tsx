"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Shield, CreditCard, Upload } from "lucide-react";

export default function AccountSettingsPage() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่าบัญชีและเอกสาร</h1>
        <p className="text-surface-500">จัดการข้อมูลส่วนตัวและเอกสารยืนยันตัวตนสำหรับเช่ารถ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass dark:glass-dark rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-brand-500" />
                ข้อมูลส่วนตัว
              </h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
              >
                {isEditing ? "ยกเลิก" : "แก้ไขข้อมูล"}
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">ชื่อ - นามสกุล</label>
                  <input 
                    type="text" 
                    defaultValue="สมชาย ลูกค้าดี" 
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 disabled:opacity-70 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">อีเมล</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input 
                      type="email" 
                      defaultValue="somchai@email.com" 
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 disabled:opacity-70 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">เบอร์โทรศัพท์</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input 
                      type="tel" 
                      defaultValue="081-234-5678" 
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 disabled:opacity-70 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">เลขบัตรประชาชน / Passport</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input 
                      type="text" 
                      defaultValue="1-1234-56789-00-1" 
                      disabled={true} // Usually shouldn't be easily editable
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900/80 opacity-70 outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-surface-600 dark:text-surface-400">ที่อยู่ปัจจุบัน</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 w-4 h-4 text-surface-400" />
                    <textarea 
                      defaultValue="123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110" 
                      disabled={!isEditing}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50 disabled:opacity-70 focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <button 
                    type="button"
                    onClick={() => {
                      alert("บันทึกข้อมูลเรียบร้อย (Mockup)");
                      setIsEditing(false);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" /> บันทึกการเปลี่ยนแปลง
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Documents */}
        <div className="space-y-6">
          <div className="glass dark:glass-dark rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-brand-500" />
              เอกสารยืนยันตัวตน
            </h2>

            <div className="space-y-4">
              <div className="p-4 border border-surface-200 dark:border-surface-800 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">บัตรประชาชน / Passport</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-black uppercase">อนุมัติแล้ว</span>
                </div>
                <div className="h-24 bg-surface-200 dark:bg-surface-800 rounded-xl flex items-center justify-center text-surface-400 text-sm overflow-hidden border border-surface-300 dark:border-surface-700">
                  <div className="text-center">
                    <CreditCard className="w-6 h-6 mx-auto mb-1 opacity-50" />
                    <span>id_card_front.jpg</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-surface-200 dark:border-surface-800 rounded-2xl bg-surface-50 dark:bg-surface-900/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">ใบขับขี่ (Driver License)</h3>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-black uppercase">รอตรวจสอบ</span>
                </div>
                <div className="h-24 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl flex flex-col items-center justify-center text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer group">
                  <Upload className="w-6 h-6 mb-1 text-surface-400 group-hover:text-brand-500 transition-colors" />
                  <span className="text-xs font-medium group-hover:text-brand-600">อัปโหลดไฟล์ใหม่</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-surface-500 mt-6 text-center">
              เอกสารของคุณจะถูกเข้ารหัสและจัดเก็บอย่างปลอดภัยตามนโยบาย PDPA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
