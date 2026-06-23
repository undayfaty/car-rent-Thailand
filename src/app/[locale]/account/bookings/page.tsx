"use client";

import { useState } from "react";
import { Search, Calendar, MapPin, Clock, FileText, Upload, CheckCircle, AlertCircle, XCircle, Car } from "lucide-react";

// Mockup Data for Customer Bookings
const INITIAL_BOOKINGS = [
  {
    id: "BK-2024-001",
    vehicle: "Toyota Alphard SC",
    date: "15 พ.ย. 2024",
    time: "10:00 - 18:00",
    location: "สนามบินสุวรรณภูมิ -> โรงแรม Siam Kempinski",
    status: "confirmed",
    totalPrice: 5000,
    paidAmount: 5000,
    driver: { name: "สมพงษ์ ใจดี", phone: "081-234-5678" }
  },
  {
    id: "BK-2024-002",
    vehicle: "Mercedes Benz S-Class",
    date: "20 พ.ย. 2024",
    time: "08:00 - 12:00",
    location: "โรงแรม Siam Kempinski -> อยุธยา",
    status: "pending_payment",
    totalPrice: 8000,
    paidAmount: 0,
    driver: null
  },
  {
    id: "BK-2024-003",
    vehicle: "Toyota Commuter (VIP)",
    date: "01 ธ.ค. 2024",
    time: "09:00 - 20:00",
    location: "กรุงเทพฯ -> พัทยา",
    status: "cancelled",
    totalPrice: 4500,
    paidAmount: 0,
    driver: null
  }
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredBookings = bookings.filter((b) => 
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3"/> ยืนยันแล้ว (ชำระครบ)</span>;
      case "pending_payment":
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> รอชำระเงิน</span>;
      case "cancelled":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1"><XCircle className="w-3 h-3"/> ยกเลิกแล้ว</span>;
      default:
        return <span className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const handleUploadPayment = () => {
    // Mock upload logic
    alert(`อัปโหลดสลิปชำระเงินสำหรับ ${selectedBooking?.id} สำเร็จ! (ระบบกำลังรอแอดมินตรวจสอบ)`);
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">ประวัติการจองของฉัน</h1>
          <p className="text-surface-500">ตรวจสอบสถานะการจองรถและอัปโหลดหลักฐานการชำระเงิน</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input 
            type="text" 
            placeholder="ค้นหาเลขที่จอง, รถ..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="glass dark:glass-dark p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-brand-500 transition-colors border border-transparent">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-brand-600 dark:text-brand-400">{booking.id}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                
                <h4 className="text-xl font-bold">{booking.vehicle}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-surface-600 dark:text-surface-400">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-500"/> {booking.date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-500"/> {booking.time}</div>
                  <div className="flex items-start gap-2 sm:col-span-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-500"/> {booking.location}</div>
                </div>

                {booking.driver && (
                  <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center gap-3 border border-brand-100 dark:border-brand-800">
                    <div className="w-10 h-10 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center">
                      <Car className="w-5 h-5 text-brand-700 dark:text-brand-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase">ข้อมูลคนขับ</p>
                      <p className="text-sm font-medium">{booking.driver.name} (โทร: {booking.driver.phone})</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 min-w-[200px] w-full md:w-auto p-4 md:p-0 bg-surface-50 dark:bg-surface-900 md:bg-transparent rounded-xl md:rounded-none">
                <div className="text-left md:text-right w-full">
                  <p className="text-sm text-surface-500">ยอดรวมทั้งสิ้น</p>
                  <p className="text-2xl font-black text-brand-600 dark:text-brand-400">฿{booking.totalPrice.toLocaleString()}</p>
                  {booking.status === "pending_payment" && (
                    <p className="text-sm text-amber-600 font-medium mt-1">ค้างชำระ: ฿{(booking.totalPrice - booking.paidAmount).toLocaleString()}</p>
                  )}
                </div>

                <div className="flex gap-2 w-full">
                  <button className="flex-1 md:flex-none px-4 py-2 bg-surface-200 hover:bg-surface-300 dark:bg-surface-800 dark:hover:bg-surface-700 text-surface-900 dark:text-surface-50 font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                    <FileText className="w-4 h-4" /> ดูรายละเอียด
                  </button>
                  {booking.status === "pending_payment" && (
                    <button 
                      onClick={() => { setSelectedBooking(booking); setShowUploadModal(true); }}
                      className="flex-1 md:flex-none px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                    >
                      <Upload className="w-4 h-4" /> แจ้งชำระเงิน
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass dark:glass-dark p-12 rounded-3xl text-center">
            <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4 text-surface-400">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">ไม่พบประวัติการจอง</h3>
            <p className="text-surface-500 max-w-md mx-auto">คุณยังไม่มีประวัติการจองรถ หรือไม่พบข้อมูลที่ค้นหา</p>
          </div>
        )}
      </div>

      {/* Upload Payment Modal */}
      {showUploadModal && selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-950 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-surface-200 dark:border-surface-800 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-surface-200 dark:border-surface-800 flex justify-between items-center bg-brand-50 dark:bg-brand-900/20">
              <h2 className="text-xl font-bold flex items-center gap-2 text-brand-700 dark:text-brand-300">
                <Upload className="w-5 h-5" /> อัปโหลดสลิปชำระเงิน
              </h2>
              <button onClick={() => setShowUploadModal(false)} className="text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-800 p-2 rounded-full transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-xl border border-surface-200 dark:border-surface-800 text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-surface-500">หมายเลขจอง:</span>
                  <span className="font-bold">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-surface-500">ยอดที่ต้องชำระ:</span>
                  <span className="font-bold text-brand-600">฿{(selectedBooking.totalPrice - selectedBooking.paidAmount).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">บัญชีธนาคาร (กสิกรไทย)</label>
                <div className="p-4 bg-white dark:bg-surface-950 border border-surface-200 dark:border-surface-800 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold">บจก. คาร์เรนท์ ไทยแลนด์</p>
                    <p className="text-surface-500 text-sm tracking-widest mt-1">123-4-56789-0</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-black">
                    K
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">แนบไฟล์สลิป (JPG, PNG)</label>
                <div className="border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-surface-50 dark:hover:bg-surface-900 transition-colors cursor-pointer group">
                  <Upload className="w-10 h-10 mb-3 text-surface-400 group-hover:text-brand-500 transition-colors" />
                  <span className="text-sm font-bold text-brand-600 mb-1">คลิกเพื่ออัปโหลด</span>
                  <span className="text-xs text-surface-500">หรือลากไฟล์มาวางที่นี่</span>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 flex justify-end gap-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-6 py-3 font-medium text-surface-600 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-xl transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={handleUploadPayment}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
