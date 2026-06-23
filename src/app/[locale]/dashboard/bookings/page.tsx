"use client";

import { useState } from "react";
import { Search, Plus, Calendar, MapPin, User, Clock, FileText, Car, X, Send, CheckCircle, Loader2, Sparkles } from "lucide-react";

// Mockup Data
const COLUMNS = [
  { id: "pending_deposit", title: "รอโอนมัดจำ", color: "bg-orange-50 text-orange-500 border-orange-100" },
  { id: "awaiting_driver", title: "รอจัดคนขับ", color: "bg-brand-50 text-brand-600 border-brand-100" },
  { id: "in_progress", title: "กำลังเดินทาง", color: "bg-accent-50 text-accent-500 border-accent-100" },
  { id: "awaiting_final", title: "รอชำระส่วนที่เหลือ", color: "bg-pink-50 text-pink-500 border-pink-100" },
  { id: "completed", title: "เสร็จสิ้น", color: "bg-emerald-50 text-emerald-500 border-emerald-100" },
];

// Mockup Data
const INITIAL_BOOKINGS = [
  { id: "BK005", customer: "มานะ อดทน", phone: "089-xxx-xxxx", vehicle: "SUV", dates: "1-3 พ.ย.", startDate: "2026-11-01", time: "06:00", status: "completed", total: 9000, paid: 9000 },
  { id: "BK004", customer: "Li Wei", phone: "liwei@tour.com", vehicle: "VIP Van", dates: "5-9 พ.ย.", startDate: "2026-11-05", time: "13:00", status: "awaiting_final", total: 25000, paid: 12500, driver: "วิทยา พารวย", ot: 1000 },
  { id: "BK003", customer: "บริษัท เอบีซี", phone: "02-xxx-xxxx", vehicle: "Toyota Camry", dates: "10-12 พ.ย.", startDate: "2026-11-10", time: "09:00", status: "in_progress", total: 7500, paid: 3750, driver: "สมชาย ใจดี" },
  { id: "BK001", customer: "สมหญิง รักดี", phone: "081-xxx-xxxx", vehicle: "Toyota Alphard", dates: "12-14 พ.ย.", startDate: "2026-11-12", time: "08:00", status: "pending_deposit", total: 15000, paid: 0 },
  { id: "BK002", customer: "John Smith", phone: "john@email.com", vehicle: "Hyundai Staria", dates: "15-18 พ.ย.", startDate: "2026-11-15", time: "10:30", status: "awaiting_driver", total: 14000, paid: 7000 },
];

export default function KanbanBookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<"auto" | "manual">("auto");
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"status" | "date">("status");

  const filteredBookings = bookings.filter(b => 
    b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate Date Columns sorted chronologically
  const uniqueDates = Array.from(new Set(bookings.map(b => b.startDate))).sort();
  const DATE_COLUMNS = uniqueDates.map((date, index) => {
    const d = new Date(date);
    const title = d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
    const colors = ["bg-blue-50 text-blue-600 border-blue-100", "bg-purple-50 text-purple-600 border-purple-100", "bg-emerald-50 text-emerald-600 border-emerald-100", "bg-orange-50 text-orange-600 border-orange-100", "bg-pink-50 text-pink-600 border-pink-100"];
    return { id: date, title, color: colors[index % colors.length] };
  });

  const activeColumns = viewMode === "status" ? COLUMNS : DATE_COLUMNS;

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, bookingId: string) => {
    e.dataTransfer.setData("bookingId", bookingId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const bookingId = e.dataTransfer.getData("bookingId");
    if (!bookingId) return;

    if (viewMode === "status") {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: columnId } : b));
    } else {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, startDate: columnId } : b));
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">กระดานจัดการคิวรถ (Kanban Board)</h1>
          <p className="text-surface-500">ติดตามสถานะการจอง จัดการคิวรถ และตรวจสอบการชำระเงิน</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* View Toggle */}
          <div className="flex bg-surface-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("status")}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${viewMode === "status" ? "bg-white text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700"}`}
            >
              กลุ่มตามสถานะ
            </button>
            <button 
              onClick={() => setViewMode("date")}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${viewMode === "date" ? "bg-white text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700"}`}
            >
              กลุ่มตามวันที่
            </button>
          </div>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input 
              type="text" 
              placeholder="ค้นหา Booking ID, ชื่อลูกค้า..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-surface-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" /> สร้าง Booking
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {activeColumns.map((column) => {
          const columnBookings = filteredBookings
            .filter(b => viewMode === "status" ? b.status === column.id : b.startDate === column.id)
            .sort((a, b) => a.time.localeCompare(b.time)); // Sort by time

          return (
          <div key={column.id} className="w-[300px] flex-shrink-0 flex flex-col bg-surface-100/50 rounded-2xl border border-surface-200">
            <div className={`px-4 py-3 border-b rounded-t-2xl font-bold flex justify-between items-center ${column.color}`}>
              <span>{column.title}</span>
              <span className="bg-white/50 text-surface-900 text-xs px-2 py-1 rounded-full">
                {columnBookings.length}
              </span>
            </div>
            
            <div 
              className="flex-1 p-3 overflow-y-auto space-y-3"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {columnBookings.map(booking => (
                <div 
                  key={booking.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, booking.id)}
                  onClick={() => setSelectedBooking(booking)}
                  className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-surface-400">{booking.id}</span>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">฿{booking.total.toLocaleString()}</span>
                  </div>
                  
                  <h3 className="font-bold text-surface-900 mb-1">{booking.customer}</h3>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center text-sm font-bold text-brand-600 bg-brand-50 p-1.5 rounded-lg mb-2">
                      <Clock className="w-4 h-4 mr-1.5" /> เวลา {booking.time} น.
                    </div>
                    <div className="flex items-center text-xs text-surface-500">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" /> {booking.dates}
                    </div>
                    <div className="flex items-center text-xs text-surface-500">
                      <Car className="w-3.5 h-3.5 mr-1.5" /> {booking.vehicle}
                    </div>
                    {booking.driver && (
                      <div className="flex items-center text-xs text-emerald-600 font-medium">
                        <User className="w-3.5 h-3.5 mr-1.5" /> {booking.driver}
                      </div>
                    )}
                  </div>
                  
                  {/* Financial Progress */}
                  <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
                    <div className="flex items-center text-xs text-surface-500">
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      จ่ายแล้ว: ฿{booking.paid.toLocaleString()}
                    </div>
                    {booking.ot && (
                      <div className="flex items-center text-xs text-red-500 font-medium" title="ค่าล่วงเวลา">
                        <Clock className="w-3.5 h-3.5 mr-1" /> +฿{booking.ot.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {columnBookings.length === 0 && (
                <div className="h-24 flex items-center justify-center text-sm text-surface-400 border-2 border-dashed border-surface-200 rounded-xl">
                  ลากการ์ดมาวางที่นี่
                </div>
              )}
            </div>
          </div>
        )})}
      </div>

      {/* Document Preview Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-surface-100">
              <h2 className="text-xl font-bold text-surface-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" /> Preview เอกสารก่อนส่งลูกค้า
              </h2>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-surface-400 hover:bg-surface-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-surface-50">
              {/* Simulated A4 Document */}
              <div className="bg-white shadow-sm border border-surface-200 p-8 min-h-[500px] text-surface-800 text-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-black text-brand-600 mb-1">Car Rent Thailand</h1>
                    <p className="text-surface-500">บริการเช่ารถพร้อมคนขับระดับพรีเมียม</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold text-surface-900">ใบแจ้งหนี้ / INVOICE</h2>
                    <p className="text-surface-500 mt-1">เลขที่: INV-{selectedBooking.id}</p>
                    <p className="text-surface-500">วันที่: {new Date().toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                
                <div className="mb-8 border-l-4 border-brand-500 pl-4">
                  <p className="font-bold text-surface-900">ลูกค้า: {selectedBooking.customer}</p>
                  <p className="text-surface-600">เบอร์โทร: {selectedBooking.phone}</p>
                  <p className="text-surface-600">วันที่เดินทาง: {selectedBooking.dates}</p>
                  <p className="text-surface-600">รถที่จอง: {selectedBooking.vehicle}</p>
                </div>
                
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b-2 border-surface-200 text-left text-surface-900">
                      <th className="py-2">รายการ (Description)</th>
                      <th className="py-2 text-right">จำนวนเงิน (Amount)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surface-100">
                      <td className="py-3">ค่าบริการเช่ารถ {selectedBooking.vehicle} พร้อมคนขับ</td>
                      <td className="py-3 text-right">฿{selectedBooking.total.toLocaleString()}</td>
                    </tr>
                    {selectedBooking.ot && (
                      <tr className="border-b border-surface-100">
                        <td className="py-3">ค่าล่วงเวลา (OT)</td>
                        <td className="py-3 text-right">฿{selectedBooking.ot.toLocaleString()}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between font-bold text-lg text-surface-900">
                      <span>ยอดสุทธิ:</span>
                      <span>฿{(selectedBooking.total + (selectedBooking.ot || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-brand-600 font-bold bg-brand-50 p-2 rounded-lg">
                      <span>ยอดที่ต้องชำระ:</span>
                      <span>฿{((selectedBooking.total + (selectedBooking.ot || 0)) - selectedBooking.paid).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-surface-100 bg-white flex justify-end gap-3">
              <button onClick={() => setSelectedBooking(null)} className="px-5 py-2.5 text-surface-600 font-medium hover:bg-surface-100 rounded-xl transition-colors">
                ยกเลิก (แก้ไขใหม่)
              </button>
              <button 
                onClick={() => {
                  alert("ส่งเอกสารให้ลูกค้าผ่าน Email / Line เรียบร้อยแล้ว!");
                  setSelectedBooking(null);
                }}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" /> อนุมัติและส่งให้ลูกค้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Booking Intelligent Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-surface-100 bg-gradient-to-r from-brand-50 to-white">
              <h2 className="text-xl font-bold text-brand-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" /> ระบบจัดคิวรถอัจฉริยะ
              </h2>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setMatchResult(null);
                  setIsMatching(false);
                }} 
                className="p-2 text-surface-400 hover:bg-surface-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {!matchResult ? (
                <div className="space-y-4">
                  
                  {/* Mode Toggle */}
                  <div className="flex bg-surface-100 p-1 rounded-xl mb-6">
                    <button 
                      onClick={() => setBookingMode("auto")}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex justify-center items-center gap-2 ${bookingMode === "auto" ? "bg-white text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700"}`}
                    >
                      <Sparkles className="w-4 h-4" /> ระบบอัจฉริยะ (Auto)
                    </button>
                    <button 
                      onClick={() => setBookingMode("manual")}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors flex justify-center items-center gap-2 ${bookingMode === "manual" ? "bg-white text-brand-600 shadow-sm" : "text-surface-500 hover:text-surface-700"}`}
                    >
                      <User className="w-4 h-4" /> แอดมินเลือกเอง (Manual)
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-1">ชื่อลูกค้า</label>
                    <input type="text" placeholder="ระบุชื่อลูกค้าที่ต้องการจอง" className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-surface-700 mb-1">วันที่เริ่มเดินทาง</label>
                      <input type="date" className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-surface-700 mb-1">วันที่สิ้นสุด</label>
                      <input type="date" className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                    </div>
                  </div>
                  
                  {bookingMode === "auto" ? (
                    <>
                      <div>
                        <label className="block text-sm font-bold text-surface-700 mb-1">ประเภทรถที่ต้องการ</label>
                        <select className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500">
                          <option>รถตู้ VIP (เช่น Alphard)</option>
                          <option>รถเก๋งพรีเมียม (เช่น Camry)</option>
                          <option>รถ SUV</option>
                        </select>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setIsMatching(true);
                          setTimeout(() => {
                            setIsMatching(false);
                            setMatchResult({
                              vehicle: "Toyota Alphard (กท 1234)",
                              driver: "สมชาย ใจดี",
                              price: 15000
                            });
                          }, 2000);
                        }}
                        disabled={isMatching}
                        className="w-full mt-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                      >
                        {isMatching ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> กำลังค้นหาคิวรถว่าง...</>
                        ) : (
                          <><Search className="w-5 h-5" /> ค้นหาและจับคู่รถอัตโนมัติ</>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-surface-700 mb-1">เลือกรถยนต์</label>
                          <select className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500">
                            <option>เลือก...</option>
                            <option>กท 1234 (Toyota Alphard)</option>
                            <option>นข 5555 (Hyundai Staria)</option>
                            <option>สท 9999 (Toyota Camry)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-surface-700 mb-1">เลือกคนขับ</label>
                          <select className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500">
                            <option>เลือก...</option>
                            <option>สมชาย ใจดี</option>
                            <option>วิทยา พารวย</option>
                            <option>มานะ อดทน</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-surface-700 mb-1">ราคาที่ตกลง (บาท)</label>
                        <input type="number" placeholder="เช่น 15000" className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500" />
                      </div>
                      <button 
                        onClick={() => {
                          alert("สร้าง Booking แบบกำหนดเองสำเร็จ!");
                          setIsCreateModalOpen(false);
                        }}
                        className="w-full mt-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" /> ยืนยันสร้าง Booking ทันที
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">พบรถว่างพร้อมให้บริการ!</h3>
                    <p className="text-emerald-700">ระบบได้ทำการจับคู่รถและคนขับที่เหมาะสมที่สุดในช่วงเวลาดังกล่าว</p>
                  </div>
                  
                  <div className="border border-surface-200 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                      <span className="text-surface-500 font-medium">รถที่จัดสรร</span>
                      <span className="font-bold text-surface-900 flex items-center gap-2"><Car className="w-4 h-4 text-brand-500" /> {matchResult.vehicle}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-surface-100 pb-3">
                      <span className="text-surface-500 font-medium">คนขับรถ</span>
                      <span className="font-bold text-surface-900 flex items-center gap-2"><User className="w-4 h-4 text-emerald-500" /> {matchResult.driver}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-surface-500 font-medium">ราคาประเมินเบื้องต้น</span>
                      <span className="font-bold text-brand-600 text-lg">฿{matchResult.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setMatchResult(null)}
                      className="flex-1 py-3 text-surface-600 font-medium hover:bg-surface-100 rounded-xl transition-colors border border-surface-200"
                    >
                      ค้นหาใหม่
                    </button>
                    <button 
                      onClick={() => {
                        alert("สร้าง Booking สำเร็จ! ระบบได้นำรถและคนขับเข้าสู่ระบบคิวเรียบร้อยแล้ว");
                        setIsCreateModalOpen(false);
                        setMatchResult(null);
                      }}
                      className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2"
                    >
                      ยืนยันสร้าง Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
