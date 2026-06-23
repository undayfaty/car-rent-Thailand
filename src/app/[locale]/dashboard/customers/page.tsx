"use client";

import { useState } from "react";
import { Search, Filter, CheckCircle, XCircle, FileImage, Eye, MoreVertical, FileText, Send, Download, Printer } from "lucide-react";
import Logo from "@/components/Logo";
import DocumentPreviewModal, { DocumentInfo } from "@/components/DocumentPreviewModal";

// Mockup Data for Customers
const INITIAL_CUSTOMERS = [
  { id: 1, name: "สมหญิง รักดี", email: "somying@email.com", group: "คนไทย - ท่องเที่ยว", status: "pending", docsSubmitted: 2 },
  { id: 2, name: "John Smith", email: "john@business.com", group: "ต่างชาติ - ธุรกิจ", status: "approved", docsSubmitted: 3 },
  { id: 3, name: "บริษัท เอบีซี จำกัด", email: "contact@abc.co.th", group: "คนไทย - บริษัท", status: "rejected", docsSubmitted: 1 },
  { id: 4, name: "Li Wei", email: "liwei@tour.com", group: "ต่างชาติ - ท่องเที่ยว", status: "pending", docsSubmitted: 2 },
  { id: 5, name: "มานะ อดทน", email: "mana@email.com", group: "คนไทย - ท่องเที่ยว", status: "approved", docsSubmitted: 2 },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [previewDocuments, setPreviewDocuments] = useState<DocumentInfo[]>([]);

  const handlePreviewAttachments = (customerName: string, numDocs: number) => {
    // Generate mock documents based on the number of documents submitted
    const mockDocs: DocumentInfo[] = Array.from({ length: Math.max(1, numDocs) }).map((_, i) => {
      const type = i === 0 ? "image" : i === 1 ? "pdf" : "image";
      return {
        id: `doc-${i}`,
        name: i === 0 ? `บัตรประชาชน - ${customerName}.jpg` : i === 1 ? `ใบขับขี่ - ${customerName}.pdf` : `เอกสารเพิ่มเติม ${i+1}.jpg`,
        type: type,
        url: type === "image" 
          ? `https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop` // Placeholder ID/Document image
          : `/mock-pdf.pdf`
      };
    });
    setPreviewDocuments(mockDocs);
  };

  const filteredCustomers = customers.filter(c => 
    filterStatus === "all" ? true : c.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">จัดการลูกค้าและตรวจสอบเอกสาร</h1>
          <p className="text-surface-500">ตรวจสอบและอนุมัติการลงทะเบียนของลูกค้าก่อนทำการจองรถ</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ, อีเมล..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-surface-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <button aria-label="ตัวกรอง" className="p-2 bg-white border border-surface-200 rounded-lg hover:bg-surface-50">
            <Filter className="w-5 h-5 text-surface-600" />
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex border-b border-surface-200 gap-6">
        <button 
          onClick={() => setFilterStatus("all")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${filterStatus === "all" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          ทั้งหมด (5)
        </button>
        <button 
          onClick={() => setFilterStatus("pending")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${filterStatus === "pending" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          รอตรวจสอบ (2)
        </button>
        <button 
          onClick={() => setFilterStatus("approved")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${filterStatus === "approved" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          อนุมัติแล้ว (2)
        </button>
        <button 
          onClick={() => setFilterStatus("rejected")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${filterStatus === "rejected" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          ไม่อนุมัติ (1)
        </button>
      </div>

      {/* Customer List Table */}
      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-50 text-surface-600 text-sm">
                <th className="p-4 font-medium">ชื่อลูกค้า / อีเมล</th>
                <th className="p-4 font-medium">กลุ่มลูกค้า</th>
                <th className="p-4 font-medium text-center">เอกสารแนบ</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-surface-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-surface-900">{customer.name}</div>
                    <div className="text-sm text-surface-500">{customer.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-xs font-medium">
                      {customer.group}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handlePreviewAttachments(customer.name, customer.docsSubmitted)}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-full text-xs font-bold transition-colors cursor-pointer"
                      title="คลิกเพื่อดูเอกสารแนบ"
                    >
                      <FileImage className="w-3 h-3" /> {customer.docsSubmitted} ไฟล์
                    </button>
                  </td>
                  <td className="p-4">
                    {customer.status === "pending" && (
                      <span className="inline-flex items-center gap-1 text-accent-600 font-medium text-sm">
                        <Clock className="w-4 h-4" /> รอตรวจสอบ
                      </span>
                    )}
                    {customer.status === "approved" && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm">
                        <CheckCircle className="w-4 h-4" /> อนุมัติแล้ว
                      </span>
                    )}
                    {customer.status === "rejected" && (
                      <span className="inline-flex items-center gap-1 text-red-600 font-medium text-sm">
                        <XCircle className="w-4 h-4" /> ไม่อนุมัติ
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handlePreviewAttachments(customer.name, customer.docsSubmitted)}
                        className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" 
                        title="ดูเอกสารแนบ (Preview)"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {customer.status === "pending" && (
                        <>
                          <button onClick={() => {
                            setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, status: "approved" } : c));
                            alert("อนุมัติลูกค้าเรียบร้อยแล้ว");
                          }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="อนุมัติ">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => {
                            setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, status: "rejected" } : c));
                            alert("ปฏิเสธลูกค้า");
                          }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ปฏิเสธ">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      <button aria-label="ตัวเลือกเพิ่มเติม" className="p-2 text-surface-400 hover:bg-surface-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-surface-500">
                    ไม่พบข้อมูลลูกค้าในสถานะนี้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* PDF Document Preview Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 backdrop-blur-sm p-4">
          <div className="bg-surface-100 w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header (PDF Viewer Controls) */}
            <div className="flex justify-between items-center px-4 py-3 bg-surface-800 text-white">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-300" />
                <span className="font-medium text-sm">Preview_Customer_Document_{selectedCustomer.id}.pdf</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-surface-700 rounded transition-colors" title="พิมพ์">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-surface-700 rounded transition-colors" title="ดาวน์โหลด">
                  <Download className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-surface-600 mx-1"></div>
                <button aria-label="ปิดหน้าต่าง" onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-red-500 hover:text-white rounded transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* PDF Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-surface-200">
              {/* Simulated A4 Paper */}
              <div className="bg-white shadow-xl w-full max-w-[210mm] min-h-[297mm] p-[20mm] text-surface-900 relative">
                
                {/* PDF Header */}
                <div className="flex justify-between items-start mb-10 border-b-2 border-brand-500 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="scale-75 origin-top-left -ml-4 -mt-4">
                      <Logo />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black text-brand-700 tracking-tight uppercase">Car Rent Thailand</h1>
                      <p className="text-sm text-surface-500 mt-1">Premium Car Rental Services & Management</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold tracking-widest text-surface-400">DOCUMENT</h2>
                    <p className="text-sm font-medium mt-1 text-surface-600">Ref: CUS-{new Date().getFullYear()}-{selectedCustomer.id.toString().padStart(4, '0')}</p>
                    <p className="text-sm text-surface-500">Date: {new Date().toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                
                {/* PDF Body */}
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-bold underline underline-offset-4 mb-2">เอกสารยืนยันประวัติลูกค้า (Customer Verification Form)</h3>
                    <p className="text-sm text-surface-500">ใช้สำหรับยืนยันการลงทะเบียนและส่งให้ลูกค้าเพื่อเป็นหลักฐาน</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ชื่อลูกค้า (Customer Name)</p>
                        <p className="font-medium text-base border-b border-surface-200 pb-1">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">กลุ่มลูกค้า (Customer Group)</p>
                        <p className="font-medium text-base border-b border-surface-200 pb-1">{selectedCustomer.group}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">อีเมล (Email Address)</p>
                        <p className="font-medium text-base border-b border-surface-200 pb-1">{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">สถานะ (Verification Status)</p>
                        <p className={`font-medium text-base border-b border-surface-200 pb-1 ${selectedCustomer.status === 'approved' ? 'text-emerald-600' : 'text-accent-600'}`}>
                          {selectedCustomer.status === 'approved' ? 'อนุมัติแล้ว (Approved)' : 'รอตรวจสอบ (Pending Review)'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-3">รายการเอกสารแนบ (Attachments & Documents)</p>
                    <table className="w-full text-sm border border-surface-200">
                      <thead className="bg-surface-50">
                        <tr>
                          <th className="p-3 text-left border-b border-surface-200">ลำดับ</th>
                          <th className="p-3 text-left border-b border-surface-200">รายการเอกสาร</th>
                          <th className="p-3 text-center border-b border-surface-200">สถานะ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: selectedCustomer.docsSubmitted > 0 ? selectedCustomer.docsSubmitted : 1 }).map((_, i) => (
                          <tr key={i} className="border-b border-surface-100 last:border-0">
                            <td className="p-3 text-surface-500">{i + 1}</td>
                            <td className="p-3 font-medium">
                              {selectedCustomer.docsSubmitted > 0 
                                ? (i === 0 ? "สำเนาบัตรประชาชน / Passport" : i === 1 ? "ใบขับขี่" : "เอกสารอื่นๆ") 
                                : "ไม่มีเอกสารแนบ (ระบบสร้างเอกสารนี้อัตโนมัติเพื่อส่งยืนยัน)"}
                            </td>
                            <td className="p-3 text-center">
                              {selectedCustomer.docsSubmitted > 0 ? (
                                <span className="text-emerald-600 font-bold flex items-center justify-center gap-1"><CheckCircle className="w-4 h-4"/> แนบแล้ว</span>
                              ) : (
                                <span className="text-surface-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* PDF Footer / Signatures */}
                <div className="absolute bottom-[20mm] left-[20mm] right-[20mm]">
                  <div className="grid grid-cols-2 gap-20">
                    <div className="text-center">
                      <div className="border-b border-surface-400 h-16 mb-2"></div>
                      <p className="text-sm font-bold">ลายมือชื่อลูกค้า</p>
                      <p className="text-xs text-surface-500 mt-1">วันที่: ____/____/______</p>
                    </div>
                    <div className="text-center">
                      <div className="border-b border-surface-400 h-16 mb-2 flex items-end justify-center pb-2">
                        <span className="font-signature text-2xl text-brand-700 opacity-50">Admin Prime</span>
                      </div>
                      <p className="text-sm font-bold">ผู้อนุมัติ (Car Rent Thailand)</p>
                      <p className="text-xs text-surface-500 mt-1">วันที่: {new Date().toLocaleDateString('th-TH')}</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-surface-200 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedCustomer(null)} 
                className="px-6 py-2.5 text-surface-600 font-bold hover:bg-surface-100 rounded-xl transition-colors"
              >
                ปิดหน้าต่าง
              </button>
              <button 
                onClick={() => {
                  alert("กำลังส่งเอกสาร PDF ผ่าน Email ให้กับลูกค้า...");
                  setSelectedCustomer(null);
                }}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" /> ส่งเอกสารให้ลูกค้า
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Document Preview Modal for Attachments */}
      <DocumentPreviewModal 
        documents={previewDocuments} 
        isOpen={previewDocuments.length > 0} 
        onClose={() => setPreviewDocuments([])} 
        title="ตรวจสอบเอกสารแนบ"
      />
      
    </div>
  );
}

// Temporary import for the icon used above but missing from standard lucide-react list
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
