"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Calendar, Car, Info, MapPin, CheckCircle, Baby, Clock, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

// Mockup Data
const VEHICLES = [
  { id: "v1", name: "Toyota Alphard", type: "VIP Van", pricePerDay: 5000, seats: 5, image: "https://images.unsplash.com/photo-1590362891991-f705b908eb82?auto=format&fit=crop&w=400&q=80" },
  { id: "v2", name: "Hyundai Staria", type: "Van", pricePerDay: 3500, seats: 7, image: "https://images.unsplash.com/photo-1629897048514-3dd741432f83?auto=format&fit=crop&w=400&q=80" },
  { id: "v3", name: "Toyota Camry", type: "Sedan", pricePerDay: 2500, seats: 4, image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=400&q=80" },
];

export default function BookingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [days, setDays] = useState<number>(1);
  const [needChildSeat, setNeedChildSeat] = useState<boolean>(false);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);

  // Constants
  const CHILD_SEAT_PRICE = 300; // per day
  const OVERTIME_PRICE = 200; // per hour

  // Calculations
  const vehicle = VEHICLES.find(v => v.id === selectedVehicle);
  const baseRentalPrice = vehicle ? vehicle.pricePerDay * days : 0;
  const childSeatTotal = needChildSeat ? CHILD_SEAT_PRICE * days : 0;
  const overtimeTotal = overtimeHours * OVERTIME_PRICE;
  const subTotal = baseRentalPrice + childSeatTotal + overtimeTotal;
  const vat = subTotal * 0.07;
  const grandTotal = subTotal + vat;
  const depositRequired = grandTotal * 0.5;

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col pb-20">
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <div className="text-sm font-medium text-surface-500">ขั้นตอนที่ 1/3: เลือกรถและบริการ</div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Trip Details */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-surface-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-surface-900">
              <Calendar className="w-6 h-6 text-brand-500" /> ข้อมูลการเดินทาง
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-2">สถานที่รับรถ</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input type="text" placeholder="สนามบิน, โรงแรม, ที่อยู่..." className="w-full pl-10 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-2">จำนวนวันเช่า</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setDays(Math.max(1, days - 1))} className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center font-bold text-xl hover:bg-surface-200">-</button>
                  <span className="text-xl font-bold w-8 text-center">{days}</span>
                  <button onClick={() => setDays(days + 1)} className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xl hover:bg-brand-100">+</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Choose Vehicle */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-surface-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-surface-900">
              <Car className="w-6 h-6 text-brand-500" /> เลือกรถที่ต้องการ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {VEHICLES.map((v) => (
                <div 
                  key={v.id} 
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`cursor-pointer border-2 rounded-2xl overflow-hidden transition-all ${selectedVehicle === v.id ? 'border-brand-500 bg-brand-50' : 'border-surface-100 hover:border-surface-300'}`}
                >
                  <div className="h-32 bg-surface-200 relative">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                    {selectedVehicle === v.id && (
                      <div className="absolute top-2 right-2 bg-brand-500 text-white rounded-full p-1">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-surface-900">{v.name}</h3>
                    <p className="text-sm text-surface-500 mb-2">{v.type} • {v.seats} ที่นั่ง</p>
                    <p className="font-bold text-brand-600 text-lg">฿{v.pricePerDay.toLocaleString()} <span className="text-sm font-normal text-surface-500">/วัน</span></p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Extra Options */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-surface-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-surface-900">
              <Info className="w-6 h-6 text-brand-500" /> บริการเสริม
            </h2>
            <div className="space-y-4">
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${needChildSeat ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:bg-surface-50'}`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${needChildSeat ? 'bg-brand-100 text-brand-600' : 'bg-surface-100 text-surface-500'}`}>
                    <Baby className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">คาร์ซีทสำหรับเด็ก (Child Seat)</h4>
                    <p className="text-sm text-surface-500">เพิ่มความปลอดภัยสำหรับเด็กเล็ก</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">฿{CHILD_SEAT_PRICE} /วัน</span>
                  <input type="checkbox" checked={needChildSeat} onChange={(e) => setNeedChildSeat(e.target.checked)} className="w-5 h-5 accent-brand-500" />
                </div>
              </label>

              <div className="flex items-center justify-between p-4 border border-surface-200 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-surface-100 text-surface-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">บริการคนขับล่วงเวลา (OT)</h4>
                    <p className="text-sm text-surface-500">เกินจาก 10 ชั่วโมง/วัน (จองล่วงหน้าเพื่อล็อคคิว)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">฿{OVERTIME_PRICE} /ชม.</span>
                  <div className="flex items-center gap-2 bg-surface-50 rounded-lg p-1 border border-surface-200">
                    <button onClick={() => setOvertimeHours(Math.max(0, overtimeHours - 1))} className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center font-bold">-</button>
                    <span className="w-6 text-center font-bold">{overtimeHours}</span>
                    <button onClick={() => setOvertimeHours(overtimeHours + 1)} className="w-8 h-8 rounded bg-white shadow-sm flex items-center justify-center font-bold">+</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-900 text-white p-6 rounded-3xl sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">สรุปการจอง</h3>
            
            {!vehicle ? (
              <div className="text-center py-10 text-surface-400">
                <Car className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>กรุณาเลือกรถเพื่อดูสรุปราคา</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 text-sm mb-6 border-b border-surface-700 pb-6">
                  <div className="flex justify-between">
                    <span className="text-surface-300">{vehicle.name} x {days} วัน</span>
                    <span className="font-medium">฿{baseRentalPrice.toLocaleString()}</span>
                  </div>
                  {needChildSeat && (
                    <div className="flex justify-between">
                      <span className="text-surface-300">คาร์ซีท x {days} วัน</span>
                      <span className="font-medium">฿{childSeatTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {overtimeHours > 0 && (
                    <div className="flex justify-between">
                      <span className="text-surface-300">ล่วงเวลา x {overtimeHours} ชม.</span>
                      <span className="font-medium">฿{overtimeTotal.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-surface-300">
                    <span>ราคาก่อนรวมภาษี</span>
                    <span>฿{subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-surface-300">
                    <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                    <span>฿{vat.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-brand-400 pt-4 border-t border-surface-700">
                    <span>ยอดสุทธิ</span>
                    <span>฿{grandTotal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>

                <div className="bg-surface-800 rounded-xl p-4 mb-6">
                  <p className="text-xs text-surface-400 mb-1">ยอดมัดจำที่ต้องชำระ (50%)</p>
                  <p className="text-2xl font-bold text-white">฿{depositRequired.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </div>

                <button className="w-full py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                  ยืนยันการจอง <ArrowRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
