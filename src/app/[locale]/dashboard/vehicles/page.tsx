"use client";

import { useState } from "react";
import { Search, Plus, Car, User, Settings, CheckCircle, AlertTriangle, Wrench, XCircle, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import DocumentPreviewModal, { DocumentInfo } from "@/components/DocumentPreviewModal";

// Initial Mockup Data
const INITIAL_VEHICLES = [
  { id: "V01", plate: "กท 1234", brand: "Toyota", model: "Alphard", status: "available", insurance: "ชั้น 1 (พาณิชย์)" },
  { id: "V02", plate: "นข 5555", brand: "Hyundai", model: "Staria", status: "on_trip", insurance: "ชั้น 1 (พาณิชย์)" },
  { id: "V03", plate: "สท 9999", brand: "Toyota", model: "Camry", status: "maintenance", insurance: "ชั้น 1 (พาณิชย์)" },
];

const INITIAL_DRIVERS = [
  { id: "D01", name: "สมชาย ใจดี", phone: "081-111-1111", license: "ท.123456", status: "available" },
  { id: "D02", name: "วิทยา พารวย", phone: "082-222-2222", license: "ท.654321", status: "on_trip" },
  { id: "D03", name: "ประเสริฐ เก่งขับ", phone: "083-333-3333", license: "ท.999999", status: "leave" },
];

export default function VehiclesDriversPage() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [tab, setTab] = useState<"vehicles" | "drivers">("vehicles");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemType, setItemType] = useState<"vehicle" | "driver" | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewDocuments, setPreviewDocuments] = useState<DocumentInfo[]>([]);

  const openVehiclePreview = () => {
    setPreviewDocuments([
      { id: 'v-front', name: 'รูปหน้ารถ.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?w=800&auto=format&fit=crop' },
      { id: 'v-back', name: 'รูปหลังรถ.jpg', type: 'image', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop' },
      { id: 'v-reg', name: 'เล่มทะเบียนรถ.pdf', type: 'pdf', url: '/mock-pdf.pdf' },
      { id: 'v-ins', name: 'เอกสารประกันภัย.pdf', type: 'pdf', url: '/mock-pdf.pdf' },
    ]);
  };

  const openDriverPreview = () => {
    setPreviewDocuments([
      { id: 'd-license', name: 'สำเนาใบอนุญาตขับขี่.pdf', type: 'pdf', url: '/mock-pdf.pdf' },
      { id: 'd-id', name: 'สำเนาบัตรประชาชน.pdf', type: 'pdf', url: '/mock-pdf.pdf' },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">จัดการรถและคนขับ</h1>
          <p className="text-surface-500">จัดการสถานะรถยนต์และจัดตารางเวลาคนขับในระบบ</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/partner-register" className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> เพิ่มข้อมูลใหม่
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-surface-200 gap-6">
        <button 
          onClick={() => setTab("vehicles")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${tab === "vehicles" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          <Car className="w-4 h-4" /> ข้อมูลรถยนต์ ({vehicles.length})
        </button>
        <button 
          onClick={() => setTab("drivers")}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${tab === "drivers" ? "border-brand-600 text-brand-600" : "border-transparent text-surface-500 hover:text-surface-700"}`}
        >
          <User className="w-4 h-4" /> ข้อมูลคนขับ ({drivers.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden p-6">
        
        {tab === "vehicles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(v => (
              <div 
                key={v.id} 
                onClick={() => { setSelectedItem(v); setItemType("vehicle"); }}
                className="border border-surface-200 p-5 rounded-2xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[140px] bg-white group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-surface-50 rounded-xl flex items-center justify-center text-surface-600 border border-surface-100 shadow-sm">
                    <Car className="w-6 h-6" />
                  </div>
                  {v.status === "available" && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5"/> ว่าง</span>}
                  {v.status === "on_trip" && <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-full flex items-center gap-1.5"><Car className="w-3.5 h-3.5"/> กำลังวิ่งงาน</span>}
                  {v.status === "maintenance" && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5"/> ซ่อมบำรุง</span>}
                  {v.status === "cancelled" && <span className="px-3 py-1 bg-surface-100 text-surface-600 text-xs font-bold rounded-full flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> ยกเลิก</span>}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-surface-900 mb-1">{v.plate}</h3>
                  <p className="text-surface-500 text-sm">{v.brand} {v.model}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "drivers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map(d => (
              <div 
                key={d.id} 
                onClick={() => { setSelectedItem(d); setItemType("driver"); }}
                className="border border-surface-200 p-5 rounded-2xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[140px] bg-white group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-surface-50 rounded-xl flex items-center justify-center text-surface-600 border border-surface-100 shadow-sm">
                    <User className="w-6 h-6" />
                  </div>
                  {d.status === "available" && <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5"/> พร้อมรับงาน</span>}
                  {d.status === "on_trip" && <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-full flex items-center gap-1.5"><Car className="w-3.5 h-3.5"/> กำลังวิ่งงาน</span>}
                  {d.status === "leave" && <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> ลาพัก</span>}
                  {d.status === "cancelled" && <span className="px-3 py-1 bg-surface-100 text-surface-600 text-xs font-bold rounded-full flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5"/> ยกเลิก</span>}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-surface-900 mb-1">{d.name}</h3>
                  <div className="flex justify-between items-end">
                    <p className="text-surface-500 text-sm">โทร: {d.phone}</p>
                    <p className="text-surface-500 text-sm">ใบขับขี่: {d.license}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-surface-100 bg-gradient-to-r from-brand-50 to-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-brand-600 rounded-xl flex items-center justify-center shadow-sm border border-brand-100">
                  {itemType === "vehicle" ? <Car className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-surface-900">
                    {itemType === "vehicle" ? "ข้อมูลรถยนต์ (Vehicle Details)" : "ข้อมูลคนขับ (Driver Details)"}
                  </h2>
                  <p className="text-sm text-surface-500 font-medium">
                    {itemType === "vehicle" ? `รหัสอ้างอิง: ${selectedItem.id}` : `รหัสพนักงาน: ${selectedItem.id}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-brand-50 text-brand-600 text-sm font-bold rounded-lg hover:bg-brand-100 transition-colors">
                    แก้ไขข้อมูล
                  </button>
                )}
                <button onClick={() => { setSelectedItem(null); setItemType(null); setIsEditing(false); }} className="p-2 hover:bg-surface-100 rounded-full transition-colors text-surface-500">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface-50/50">
              
              {itemType === "vehicle" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ทะเบียนรถ</p>
                      {isEditing ? (
                        <input type="text" value={selectedItem.plate} onChange={(e) => setSelectedItem({...selectedItem, plate: e.target.value})} className="w-full font-black text-xl text-surface-900 p-1 border border-surface-200 rounded" />
                      ) : (
                        <p className="font-black text-xl text-surface-900">{selectedItem.plate}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ยี่ห้อ / รุ่น</p>
                      {isEditing ? (
                        <div className="flex gap-2">
                          <input type="text" value={selectedItem.brand} onChange={(e) => setSelectedItem({...selectedItem, brand: e.target.value})} className="w-1/2 font-bold text-lg text-surface-900 p-1 border border-surface-200 rounded" />
                          <input type="text" value={selectedItem.model} onChange={(e) => setSelectedItem({...selectedItem, model: e.target.value})} className="w-1/2 font-bold text-lg text-surface-900 p-1 border border-surface-200 rounded" />
                        </div>
                      ) : (
                        <p className="font-bold text-lg text-surface-900">{selectedItem.brand} {selectedItem.model}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">สถานะปัจจุบัน</p>
                      {isEditing ? (
                        <select value={selectedItem.status} onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})} className="w-full font-bold text-lg p-1 border border-surface-200 rounded text-surface-900">
                          <option value="available">ว่าง (Available)</option>
                          <option value="on_trip">กำลังวิ่งงาน (On Trip)</option>
                          <option value="maintenance">ซ่อมบำรุง (Maintenance)</option>
                          <option value="cancelled">ยกเลิกข้อมูล (Cancelled)</option>
                        </select>
                      ) : (
                        <p className={`font-bold text-lg flex items-center gap-2 ${selectedItem.status === 'available' ? 'text-emerald-600' : selectedItem.status === 'on_trip' ? 'text-brand-600' : selectedItem.status === 'cancelled' ? 'text-surface-600' : 'text-orange-600'}`}>
                          {selectedItem.status === 'available' ? <><CheckCircle className="w-4 h-4"/> ว่าง (Available)</> : selectedItem.status === 'on_trip' ? <><Car className="w-4 h-4"/> กำลังวิ่งงาน</> : selectedItem.status === 'cancelled' ? <><AlertTriangle className="w-4 h-4"/> ยกเลิกแล้ว</> : <><Wrench className="w-4 h-4"/> ซ่อมบำรุง</>}
                        </p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ประเภทประกันภัย</p>
                      {isEditing ? (
                        <select value={selectedItem.insurance || "ชั้น 1 (พาณิชย์)"} onChange={(e) => setSelectedItem({...selectedItem, insurance: e.target.value})} className="w-full font-bold text-lg p-1 border border-surface-200 rounded text-surface-900">
                          <option value="ชั้น 1 (พาณิชย์)">ชั้น 1 (พาณิชย์)</option>
                          <option value="ชั้น 1 (ส่วนบุคคล)">ชั้น 1 (ส่วนบุคคล)</option>
                          <option value="ชั้น 2+">ชั้น 2+</option>
                          <option value="ชั้น 3+">ชั้น 3+</option>
                          <option value="ชั้น 3">ชั้น 3</option>
                        </select>
                      ) : (
                        <p className="font-bold text-lg text-surface-900">{selectedItem.insurance || "ชั้น 1 (พาณิชย์)"}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-surface-200 shadow-sm">
                    <h3 className="font-bold text-surface-900 mb-4 flex items-center gap-2 border-b border-surface-100 pb-3">
                      <FileText className="w-4 h-4 text-brand-500" /> เอกสารและรูปถ่ายอ้างอิง
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div onClick={openVehiclePreview} className="aspect-video bg-surface-100 rounded-lg border border-surface-200 flex flex-col items-center justify-center text-xs text-surface-500 hover:bg-surface-200 cursor-pointer transition-colors">
                        <Car className="w-5 h-5 mb-1 opacity-50" />
                        รูปหน้ารถ
                      </div>
                      <div onClick={openVehiclePreview} className="aspect-video bg-surface-100 rounded-lg border border-surface-200 flex flex-col items-center justify-center text-xs text-surface-500 hover:bg-surface-200 cursor-pointer transition-colors">
                        <Car className="w-5 h-5 mb-1 opacity-50" />
                        รูปหลังรถ
                      </div>
                      <div onClick={openVehiclePreview} className="aspect-video bg-surface-100 rounded-lg border border-surface-200 flex flex-col items-center justify-center text-xs text-surface-500 hover:bg-surface-200 cursor-pointer transition-colors">
                        <FileText className="w-5 h-5 mb-1 opacity-50" />
                        ทะเบียนรถ
                      </div>
                      <div className="col-span-3 mt-3">
                        <button onClick={openVehiclePreview} className="w-full py-2.5 bg-brand-50 text-brand-600 font-bold rounded-lg border border-brand-100 hover:bg-brand-100 transition-colors flex items-center justify-center gap-2">
                          ดูเอกสารทั้งหมด (เล่มทะเบียน, ประกัน)
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {itemType === "driver" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ชื่อ-นามสกุล</p>
                      {isEditing ? (
                        <input type="text" value={selectedItem.name} onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})} className="w-full font-bold text-lg text-surface-900 p-1 border border-surface-200 rounded" />
                      ) : (
                        <p className="font-bold text-lg text-surface-900">{selectedItem.name}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">เบอร์ติดต่อ</p>
                      {isEditing ? (
                        <input type="text" value={selectedItem.phone} onChange={(e) => setSelectedItem({...selectedItem, phone: e.target.value})} className="w-full font-bold text-lg text-surface-900 p-1 border border-surface-200 rounded" />
                      ) : (
                        <p className="font-bold text-lg text-surface-900">{selectedItem.phone}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">ใบอนุญาตขับขี่</p>
                      {isEditing ? (
                        <input type="text" value={selectedItem.license} onChange={(e) => setSelectedItem({...selectedItem, license: e.target.value})} className="w-full font-bold text-lg text-surface-900 p-1 border border-surface-200 rounded" />
                      ) : (
                        <p className="font-bold text-lg text-surface-900">{selectedItem.license}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                      <p className="text-xs font-bold text-surface-400 uppercase tracking-wider mb-1">สถานะ</p>
                      {isEditing ? (
                        <select value={selectedItem.status} onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})} className="w-full font-bold text-lg p-1 border border-surface-200 rounded text-surface-900">
                          <option value="available">พร้อมรับงาน</option>
                          <option value="on_trip">กำลังวิ่งงาน</option>
                          <option value="leave">ลาพัก</option>
                          <option value="cancelled">ยกเลิกข้อมูล</option>
                        </select>
                      ) : (
                        <p className={`font-bold text-lg flex items-center gap-2 ${selectedItem.status === 'available' ? 'text-emerald-600' : selectedItem.status === 'on_trip' ? 'text-brand-600' : selectedItem.status === 'cancelled' ? 'text-surface-600' : 'text-red-600'}`}>
                          {selectedItem.status === 'available' ? <><CheckCircle className="w-4 h-4"/> พร้อมรับงาน</> : selectedItem.status === 'on_trip' ? <><Car className="w-4 h-4"/> กำลังวิ่งงาน</> : selectedItem.status === 'cancelled' ? <><AlertTriangle className="w-4 h-4"/> ยกเลิกแล้ว</> : <><AlertTriangle className="w-4 h-4"/> ลาพัก</>}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-surface-200 shadow-sm">
                    <h3 className="font-bold text-surface-900 mb-4 flex items-center gap-2 border-b border-surface-100 pb-3">
                      <FileText className="w-4 h-4 text-brand-500" /> เอกสารอ้างอิง
                    </h3>
                    <div className="space-y-3">
                      <button onClick={openDriverPreview} className="w-full py-3 px-4 bg-surface-50 text-left font-medium text-surface-700 rounded-lg border border-surface-200 hover:bg-surface-100 transition-colors flex justify-between items-center group">
                        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-surface-400 group-hover:text-brand-500" /> สำเนาใบอนุญาตขับขี่ (PDF)</span>
                        <span className="text-xs bg-emerald-100 text-emerald-600 font-bold px-2.5 py-1 rounded-md flex items-center gap-1"><CheckCircle className="w-3 h-3"/> ตรวจสอบแล้ว</span>
                      </button>
                      <button onClick={openDriverPreview} className="w-full py-3 px-4 bg-surface-50 text-left font-medium text-surface-700 rounded-lg border border-surface-200 hover:bg-surface-100 transition-colors flex justify-between items-center group">
                        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-surface-400 group-hover:text-brand-500" /> สำเนาบัตรประชาชน (PDF)</span>
                        <span className="text-xs bg-emerald-100 text-emerald-600 font-bold px-2.5 py-1 rounded-md flex items-center gap-1"><CheckCircle className="w-3 h-3"/> ตรวจสอบแล้ว</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons & Audit Trail */}
              {isEditing ? (
                <div className="flex justify-end gap-3 pt-6 border-t border-surface-200">
                  <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-white border border-surface-200 text-surface-600 font-bold rounded-xl hover:bg-surface-50 transition-colors">
                    ยกเลิก
                  </button>
                  <button onClick={() => { 
                    alert("บันทึกข้อมูลเรียบร้อยแล้ว"); 
                    setIsEditing(false); 
                    
                    if (itemType === "vehicle") {
                      setVehicles(prev => prev.map(v => v.id === selectedItem.id ? { ...v, ...selectedItem } : v));
                    } else if (itemType === "driver") {
                      setDrivers(prev => prev.map(d => d.id === selectedItem.id ? { ...d, ...selectedItem } : d));
                    }
                  }} className="px-6 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-md flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> บันทึกข้อมูล
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-surface-200 flex justify-between items-end">
                  <p className="text-xs text-red-500 font-medium">
                    * ไม่สามารถลบข้อมูลการลงทะเบียนออกจากระบบได้ (สามารถใช้การ "แก้ไข &gt; ยกเลิกข้อมูล" แทน)
                  </p>
                  <div className="text-right text-xs text-surface-500">
                    <p>อัปเดตข้อมูลล่าสุดเมื่อ: {new Date().toLocaleDateString('th-TH')} เวลา {new Date().toLocaleTimeString('th-TH')} น.</p>
                    <p>แก้ไข/ปรับปรุงโดย: <strong className="text-surface-700">Admin Prime</strong> (ผู้ดูแลระบบ)</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      <DocumentPreviewModal 
        documents={previewDocuments} 
        isOpen={previewDocuments.length > 0} 
        onClose={() => setPreviewDocuments([])} 
        title={itemType === "vehicle" ? "เอกสารรถยนต์" : "เอกสารคนขับ"}
      />

    </div>
  );
}
