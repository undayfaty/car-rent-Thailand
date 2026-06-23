"use client";

import { useState } from "react";
import { Shield, UserPlus, Trash2, Edit, FileText, CheckCircle } from "lucide-react";

// Mockup Data
const SYSTEM_USERS = [
  { id: "U01", name: "วิชัย เจ้าของ", email: "wichai@carrentthailand.com", role: "admin", accessLevel: "Full Access" },
  { id: "U02", name: "สมศรี บัญชี", email: "somsri@carrentthailand.com", role: "staff", accessLevel: "Financial & Bookings" },
  { id: "U03", name: "สุชาดา จองคิว", email: "suchada@carrentthailand.com", role: "staff", accessLevel: "Bookings & Customers" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">การตั้งค่าและกำหนดสิทธิ์ (Settings & Permissions)</h1>
        <p className="text-surface-500">จัดการสิทธิ์การเข้าถึงระบบของพนักงานและผู้ดูแลระบบ</p>
      </div>

      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-surface-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" />
            ผู้ใช้งานระบบ (System Users)
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" /> เพิ่มพนักงาน
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50 text-surface-600 text-sm border-y border-surface-200">
                <th className="p-4 font-medium">ชื่อพนักงาน</th>
                <th className="p-4 font-medium">บทบาท (Role)</th>
                <th className="p-4 font-medium">สิทธิ์การเข้าถึง</th>
                <th className="p-4 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {SYSTEM_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-surface-900">{user.name}</div>
                    <div className="text-sm text-surface-500">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-surface-600 text-sm">
                    {user.accessLevel}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-surface-500 hover:bg-surface-100 rounded-lg transition-colors" title="แก้ไขสิทธิ์">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="ลบผู้ใช้">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-surface-200 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 text-surface-900">กฎของลูกค้าที่ลงทะเบียน (Customer Rules)</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-600" />
              <div>
                <div className="font-medium">ต้องแนบเอกสารครบถ้วนก่อนจึงจะจองรถได้</div>
                <div className="text-sm text-surface-500">บังคับใช้อัปโหลดบัตรประชาชน/พาสปอร์ต</div>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-brand-600" />
              <div>
                <div className="font-medium">ต้องรอแอดมินอนุมัติ (Verify) ก่อนถึงจะจองรถได้</div>
                <div className="text-sm text-surface-500">หากปิด ลูกค้าที่ลงทะเบียนใหม่จะจองรถได้ทันที</div>
              </div>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-brand-600" />
              <div>
                <div className="font-medium">ระบบอนุมัติอัตโนมัติ (Auto-Approve) สำหรับลูกค้าบริษัท</div>
                <div className="text-sm text-surface-500">ลดภาระพนักงานตรวจเอกสารสำหรับลูกค้ากลุ่ม Corporate</div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 text-surface-900">ตั้งค่าระบบทั่วไป</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">เปอร์เซ็นต์มัดจำเริ่มต้น</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={50} className="w-20 px-3 py-2 border border-surface-200 rounded-lg outline-none focus:border-brand-500 text-center" />
                <span className="text-surface-600">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">ภาษีมูลค่าเพิ่ม (VAT)</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={7} className="w-20 px-3 py-2 border border-surface-200 rounded-lg outline-none focus:border-brand-500 text-center" />
                <span className="text-surface-600">%</span>
              </div>
            </div>
            <button onClick={() => alert('บันทึกการตั้งค่าระบบเรียบร้อยแล้ว')} className="px-4 py-2 bg-brand-50 text-brand-600 font-bold rounded-lg hover:bg-brand-100 transition-colors w-full mt-2">
              บันทึกการตั้งค่า
            </button>
          </div>
        </div>
      </div>

      {/* Document Settings */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6 mt-6">
        <h3 className="font-bold text-lg mb-2 text-surface-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-500" /> การตั้งค่าหัวกระดาษ / ท้ายกระดาษเอกสาร (Header & Footer)
        </h3>
        <p className="text-sm text-surface-500 mb-6">ข้อความเหล่านี้จะถูกนำไปใช้ในเอกสารที่ส่งออก เช่น ใบเสร็จรับเงิน ใบกำกับภาษี และใบสรุปยอดทั้งหมด</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-surface-700 mb-2">ข้อความหัวกระดาษ (Header / Company Info)</label>
            <textarea 
              className="w-full px-4 py-3 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 h-32 text-surface-700"
              defaultValue={`บริษัท คาร์เรนท์ (ประเทศไทย) จำกัด\n123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110\nโทร: 02-123-4567 | เลขประจำตัวผู้เสียภาษี: 010555xxxxxxx`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-surface-700 mb-2">ข้อความท้ายกระดาษ (Footer / Notes)</label>
            <textarea 
              className="w-full px-4 py-3 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 bg-surface-50 h-32 text-surface-700"
              defaultValue={`ขอบคุณที่ใช้บริการ Car Rent Thailand\nหากมีข้อสงสัยเกี่ยวกับเอกสารนี้ โปรดติดต่อฝ่ายบัญชี โทร 02-123-4568\n** เอกสารนี้ออกโดยระบบคอมพิวเตอร์และมีผลสมบูรณ์เมื่อมีการลงนาม **`}
            />
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-surface-100 flex justify-end">
          <button onClick={() => alert('บันทึกการตั้งค่าเอกสารเรียบร้อยแล้ว')} className="px-6 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> บันทึกการตั้งค่าเอกสาร
          </button>
        </div>
      </div>

    </div>
  );
}
