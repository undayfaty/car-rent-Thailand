"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, Eye, Wallet, Download, AlertCircle, FileText } from "lucide-react";

// Mockup Data
const INITIAL_PAYMENTS = [
  { id: "PAY-1001", bookingRef: "BK-2024-001", customer: "สมหญิง รักดี", amount: 5000, date: "15 พ.ย. 2024", time: "10:30", status: "pending", slip: "slip1.jpg" },
  { id: "PAY-1002", bookingRef: "BK-2024-005", customer: "John Smith", amount: 12000, date: "15 พ.ย. 2024", time: "09:15", status: "approved", slip: "slip2.jpg" },
  { id: "PAY-1003", bookingRef: "BK-2024-008", customer: "บริษัท เอบีซี จำกัด", amount: 45000, date: "14 พ.ย. 2024", time: "14:20", status: "rejected", slip: "slip3.jpg" },
  { id: "PAY-1004", bookingRef: "BK-2024-012", customer: "Li Wei", amount: 8500, date: "14 พ.ย. 2024", time: "11:00", status: "pending", slip: "slip4.jpg" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [filter, setFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<typeof INITIAL_PAYMENTS[0] | null>(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);

  const filteredPayments = payments.filter(p => filter === "all" || p.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-900 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-brand-600" /> ตรวจสอบการรับชำระเงิน
          </h1>
          <p className="text-surface-500">ตรวจสอบและอนุมัติสลิปการโอนเงินจากลูกค้า พร้อมออกใบเสร็จรับเงิน</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input 
              type="text" 
              placeholder="ค้นหาเลขอ้างอิง, ชื่อ..." 
              className="pl-10 pr-4 py-2 border border-surface-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-surface-200 rounded-xl text-surface-600 hover:bg-surface-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-200">
        <button onClick={() => setFilter("all")} className={`px-4 py-3 font-bold text-sm ${filter === "all" ? "text-brand-600 border-b-2 border-brand-600" : "text-surface-500 hover:text-surface-700"}`}>
          ทั้งหมด ({payments.length})
        </button>
        <button onClick={() => setFilter("pending")} className={`px-4 py-3 font-bold text-sm ${filter === "pending" ? "text-brand-600 border-b-2 border-brand-600" : "text-surface-500 hover:text-surface-700"}`}>
          รอตรวจสอบ ({payments.filter(p => p.status === "pending").length})
        </button>
        <button onClick={() => setFilter("approved")} className={`px-4 py-3 font-bold text-sm ${filter === "approved" ? "text-brand-600 border-b-2 border-brand-600" : "text-surface-500 hover:text-surface-700"}`}>
          อนุมัติแล้ว ({payments.filter(p => p.status === "approved").length})
        </button>
        <button onClick={() => setFilter("rejected")} className={`px-4 py-3 font-bold text-sm ${filter === "rejected" ? "text-brand-600 border-b-2 border-brand-600" : "text-surface-500 hover:text-surface-700"}`}>
          ไม่ผ่าน ({payments.filter(p => p.status === "rejected").length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-50 border-b border-surface-200 text-surface-500 text-sm">
              <th className="p-4 font-bold">รหัสชำระเงิน / อ้างอิงจอง</th>
              <th className="p-4 font-bold">ลูกค้า</th>
              <th className="p-4 font-bold">จำนวนเงิน (THB)</th>
              <th className="p-4 font-bold">วัน-เวลาที่แจ้งโอน</th>
              <th className="p-4 font-bold">สถานะ</th>
              <th className="p-4 font-bold text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-surface-900">{payment.id}</p>
                  <p className="text-sm text-surface-500">{payment.bookingRef}</p>
                </td>
                <td className="p-4 font-medium text-surface-700">{payment.customer}</td>
                <td className="p-4 font-black text-brand-600">{payment.amount.toLocaleString()}</td>
                <td className="p-4 text-surface-600 text-sm">
                  <p>{payment.date}</p>
                  <p>{payment.time} น.</p>
                </td>
                <td className="p-4">
                  {payment.status === "pending" && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full flex items-center gap-1.5 w-fit"><AlertCircle className="w-3 h-3"/> รอตรวจสอบ</span>}
                  {payment.status === "approved" && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1.5 w-fit"><CheckCircle className="w-3 h-3"/> อนุมัติแล้ว</span>}
                  {payment.status === "rejected" && <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full flex items-center gap-1.5 w-fit"><XCircle className="w-3 h-3"/> ไม่ผ่าน</span>}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => setSelectedPayment(payment)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors inline-flex items-center gap-2 font-bold text-sm">
                    <Eye className="w-4 h-4" /> ตรวจสอบสลิป
                  </button>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-surface-500">
                  ไม่มีรายการชำระเงินในสถานะนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Slip Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            
            {/* Left: Image Viewer */}
            <div className="md:w-1/2 bg-surface-100 border-r border-surface-200 flex flex-col items-center justify-center p-6 relative">
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-surface-600">
                สลิปโอนเงิน (Slip)
              </div>
              <div className="w-full max-w-[300px] aspect-[1/2] bg-surface-200 rounded-xl border-2 border-dashed border-surface-300 flex items-center justify-center shadow-inner overflow-hidden">
                <span className="text-surface-400 font-bold">ตัวอย่างรูปสลิป</span>
              </div>
            </div>

            {/* Right: Details & Actions */}
            <div className="md:w-1/2 flex flex-col p-8 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-surface-900 mb-1">ตรวจสอบการชำระเงิน</h2>
                  <p className="text-surface-500">รหัสอ้างอิงจอง: <span className="font-bold text-surface-700">{selectedPayment.bookingRef}</span></p>
                </div>
                <button onClick={() => setSelectedPayment(null)} className="p-2 hover:bg-surface-100 rounded-full transition-colors text-surface-500">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 space-y-6">
                <div className="bg-surface-50 p-4 rounded-xl border border-surface-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-surface-400 uppercase">ลูกค้า</p>
                    <p className="font-bold text-surface-900">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-surface-400 uppercase">จำนวนเงินแจ้งโอน</p>
                    <p className="font-black text-brand-600 text-lg">{selectedPayment.amount.toLocaleString()} THB</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-surface-400 uppercase">วันที่โอน</p>
                    <p className="font-bold text-surface-900">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-surface-400 uppercase">เวลาที่โอน</p>
                    <p className="font-bold text-surface-900">{selectedPayment.time} น.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-surface-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-600" /> เอกสารที่จะส่งออก (Preview)
                  </h3>
                  <button onClick={() => setShowReceiptPreview(true)} className="w-full py-3 px-4 bg-surface-50 hover:bg-brand-50 border border-surface-200 hover:border-brand-200 text-surface-700 hover:text-brand-700 font-bold rounded-xl transition-all flex items-center justify-between group">
                    <span className="flex items-center gap-2"><Download className="w-5 h-5 text-surface-400 group-hover:text-brand-500"/> ใบเสร็จรับเงิน (Receipt).pdf</span>
                    <span className="text-xs bg-white border border-surface-200 px-2 py-1 rounded shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-colors">ตรวจสอบเอกสาร</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-surface-200 space-y-3">
                {selectedPayment.status === "pending" ? (
                  <>
                    <button onClick={() => { 
                      alert("อนุมัติการชำระเงินเรียบร้อย ระบบกำลังส่งใบเสร็จให้ลูกค้า"); 
                      setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status: "approved" } : p));
                      setSelectedPayment({ ...selectedPayment, status: "approved" }); 
                    }} className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2 text-lg">
                      <CheckCircle className="w-5 h-5" /> ยืนยันการรับยอดและออกใบเสร็จ
                    </button>
                    <button onClick={() => { 
                      alert("ปฏิเสธการชำระเงิน"); 
                      setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status: "rejected" } : p));
                      setSelectedPayment({ ...selectedPayment, status: "rejected" }); 
                    }} className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors">
                      แจ้งสลิปไม่ถูกต้อง / ปฏิเสธ
                    </button>
                  </>
                ) : (
                  <div className="p-4 bg-surface-50 rounded-xl text-center">
                    <p className="text-surface-600 font-medium">รายการนี้ได้รับการตรวจสอบแล้ว</p>
                    <p className="font-bold mt-1 text-surface-900">
                      สถานะ: {selectedPayment.status === "approved" ? <span className="text-emerald-600">อนุมัติแล้ว</span> : <span className="text-red-600">ไม่ผ่าน</span>}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Receipt Preview Modal */}
      {showReceiptPreview && selectedPayment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-900/60 backdrop-blur-sm p-4">
          <div className="bg-surface-100 w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
            
            {/* Toolbar */}
            <div className="bg-surface-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-400" />
                <span className="font-bold">ตัวอย่างไฟล์: ใบเสร็จรับเงิน (Receipt).pdf</span>
              </div>
              <button onClick={() => setShowReceiptPreview(false)} className="p-2 hover:bg-surface-700 rounded-full transition-colors text-surface-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Document Container (A4 Ratio roughly) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
              <div className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-lg p-10 sm:p-14 text-surface-900 font-sans">
                
                {/* Header from Settings */}
                <div className="border-b-2 border-brand-600 pb-6 mb-8 flex justify-between items-end">
                  <div>
                    <h1 className="text-2xl font-black text-brand-600 mb-2">บริษัท คาร์เรนท์ (ประเทศไทย) จำกัด</h1>
                    <p className="text-sm text-surface-600">123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</p>
                    <p className="text-sm text-surface-600">โทร: 02-123-4567 | เลขประจำตัวผู้เสียภาษี: 010555xxxxxxx</p>
                  </div>
                  <div className="text-right">
                    <h2 className="text-3xl font-black text-surface-800 tracking-wider">ใบเสร็จรับเงิน</h2>
                    <p className="font-bold text-surface-500 mt-2">RECEIPT</p>
                  </div>
                </div>

                {/* Info */}
                <div className="flex justify-between mb-8 text-sm">
                  <div className="space-y-1">
                    <p><span className="font-bold w-24 inline-block">ชื่อลูกค้า:</span> {selectedPayment.customer}</p>
                    <p><span className="font-bold w-24 inline-block">เลขอ้างอิงจอง:</span> {selectedPayment.bookingRef}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p><span className="font-bold w-24 inline-block">เลขที่ใบเสร็จ:</span> RC-{new Date().getFullYear()}-{selectedPayment.id.split('-')[1]}</p>
                    <p><span className="font-bold w-24 inline-block">วันที่:</span> {selectedPayment.date}</p>
                  </div>
                </div>

                {/* Table */}
                <table className="w-full mb-8 text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-50 text-brand-800 border-y-2 border-brand-200">
                      <th className="py-3 px-4 text-left font-bold">รายการ (Description)</th>
                      <th className="py-3 px-4 text-center font-bold">จำนวน (Qty)</th>
                      <th className="py-3 px-4 text-right font-bold">จำนวนเงิน (Amount)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surface-100">
                      <td className="py-4 px-4">ชำระค่าบริการเช่ารถยนต์ (อ้างอิง: {selectedPayment.bookingRef})</td>
                      <td className="py-4 px-4 text-center">1</td>
                      <td className="py-4 px-4 text-right">{(selectedPayment.amount * 0.93).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="text-right">
                      <td colSpan={2} className="py-3 px-4 font-medium text-surface-600">มูลค่าก่อนภาษี (Subtotal)</td>
                      <td className="py-3 px-4 font-bold">{(selectedPayment.amount * 0.93).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    <tr className="text-right">
                      <td colSpan={2} className="py-3 px-4 font-medium text-surface-600">ภาษีมูลค่าเพิ่ม 7% (VAT)</td>
                      <td className="py-3 px-4 font-bold">{(selectedPayment.amount * 0.07).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    <tr className="text-right bg-surface-50 border-y border-surface-200">
                      <td colSpan={2} className="py-4 px-4 font-black text-brand-600 text-base">ยอดรวมทั้งสิ้น (Grand Total)</td>
                      <td className="py-4 px-4 font-black text-brand-600 text-base">{selectedPayment.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} THB</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Signature & Footer */}
                <div className="mt-20 pt-8 border-t border-surface-200 text-sm text-center space-y-4">
                  <div className="flex justify-around mb-12">
                    <div className="text-center">
                      <div className="border-b border-surface-400 w-40 mx-auto mb-2"></div>
                      <p className="text-surface-600">ผู้จ่ายเงิน (Payer)</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-surface-400 w-40 mx-auto mb-2 mt-4 text-xl font-signature text-brand-600 font-black">System Auto</div>
                      <p className="text-surface-600">ผู้รับเงิน (Receiver)</p>
                    </div>
                  </div>
                  
                  <div className="text-surface-500 text-xs space-y-1">
                    <p>ขอบคุณที่ใช้บริการ Car Rent Thailand</p>
                    <p>หากมีข้อสงสัยเกี่ยวกับเอกสารนี้ โปรดติดต่อฝ่ายบัญชี โทร 02-123-4568</p>
                    <p className="font-bold text-surface-700">** เอกสารนี้ออกโดยระบบคอมพิวเตอร์และมีผลสมบูรณ์เมื่อมีการลงนาม **</p>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
