"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Map, Mountain, Umbrella, MapPin, Search, Navigation, Utensils } from "lucide-react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function DestinationsPage() {
  const t = useTranslations("Destinations");

  const [filterRegion, setFilterRegion] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const MOCK_DESTINATIONS = [
    { id: 1, name: t("mockData.d1.name"), province: t("mockData.d1.province"), regionValue: "north", region: t("filters.regionNorth"), typeValue: "mountain", type: t("filters.typeMountain"), festival: t("mockData.d1.festival"), image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d1.mustEat") },
    { id: 2, name: t("mockData.d2.name"), province: t("mockData.d2.province"), regionValue: "west", region: t("filters.regionWest"), typeValue: "waterfall", type: t("filters.typeWaterfall"), festival: t("mockData.d2.festival"), image: "https://images.unsplash.com/photo-1506198653696-613d11b8b80b?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d2.mustEat") },
    { id: 3, name: t("mockData.d3.name"), province: t("mockData.d3.province"), regionValue: "south", region: t("filters.regionSouth"), typeValue: "beach", type: t("filters.typeBeach"), festival: t("mockData.d3.festival"), image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d3.mustEat") },
    { id: 4, name: t("mockData.d4.name"), province: t("mockData.d4.province"), regionValue: "central", region: t("filters.regionCentral"), typeValue: "checkin", type: t("filters.typeCheckin"), festival: t("mockData.d4.festival"), image: "https://images.unsplash.com/photo-1583095034601-523c6c1cb417?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d4.mustEat") },
    { id: 5, name: t("mockData.d5.name"), province: t("mockData.d5.province"), regionValue: "northeast", region: t("filters.regionNortheast"), typeValue: "culture", type: t("filters.typeCulture"), festival: t("mockData.d5.festival"), image: "https://images.unsplash.com/photo-1596700684179-c5c2a13cc75b?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d5.mustEat") },
    { id: 6, name: t("mockData.d6.name"), province: t("mockData.d6.province"), regionValue: "east", region: t("filters.regionEast"), typeValue: "beach", type: t("filters.typeBeach"), festival: t("mockData.d6.festival"), image: "https://images.unsplash.com/photo-1575402636540-c3d3ef0c0d0a?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d6.mustEat") },
    { id: 7, name: t("mockData.d7.name"), province: t("mockData.d7.province"), regionValue: "central", region: t("filters.regionCentral"), typeValue: "buffet", type: t("filters.typeBuffet"), festival: t("mockData.d7.festival"), image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d7.mustEat") },
    { id: 8, name: t("mockData.d8.name"), province: t("mockData.d8.province"), regionValue: "central", region: t("filters.regionCentral"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d8.festival"), image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d8.mustEat") },
    { id: 9, name: t("mockData.d9.name"), province: t("mockData.d9.province"), regionValue: "north", region: t("filters.regionNorth"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d9.festival"), image: "https://images.unsplash.com/photo-1565557613262-b8d00922416f?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d9.mustEat") },
    { id: 10, name: t("mockData.d10.name"), province: t("mockData.d10.province"), regionValue: "central", region: t("filters.regionCentral"), typeValue: "buffet", type: t("filters.typeBuffet"), festival: t("mockData.d10.festival"), image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d10.mustEat") },
    { id: 11, name: t("mockData.d11.name"), province: t("mockData.d11.province"), regionValue: "east", region: t("filters.regionEast"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d11.festival"), image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d11.mustEat") },
    { id: 12, name: t("mockData.d12.name"), province: t("mockData.d12.province"), regionValue: "northeast", region: t("filters.regionNortheast"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d12.festival"), image: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d12.mustEat") },
    { id: 13, name: t("mockData.d13.name"), province: t("mockData.d13.province"), regionValue: "north", region: t("filters.regionNorth"), typeValue: "buffet", type: t("filters.typeBuffet"), festival: t("mockData.d13.festival"), image: "https://images.unsplash.com/photo-1526413232644-8a40f411edfb?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d13.mustEat") },
    { id: 14, name: t("mockData.d14.name"), province: t("mockData.d14.province"), regionValue: "south", region: t("filters.regionSouth"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d14.festival"), image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d14.mustEat") },
    { id: 15, name: t("mockData.d15.name"), province: t("mockData.d15.province"), regionValue: "central", region: t("filters.regionCentral"), typeValue: "buffet", type: t("filters.typeBuffet"), festival: t("mockData.d15.festival"), image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d15.mustEat") },
    { id: 16, name: t("mockData.d16.name"), province: t("mockData.d16.province"), regionValue: "east", region: t("filters.regionEast"), typeValue: "buffet", type: t("filters.typeBuffet"), festival: t("mockData.d16.festival"), image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d16.mustEat") },
    { id: 17, name: t("mockData.d17.name"), province: t("mockData.d17.province"), regionValue: "northeast", region: t("filters.regionNortheast"), typeValue: "restaurant", type: t("filters.typeRestaurant"), festival: t("mockData.d17.festival"), image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80", mustEat: t("mockData.d17.mustEat") },
  ];

  const filteredDestinations = MOCK_DESTINATIONS.filter(dest => {
    if (filterRegion !== "all" && dest.regionValue !== filterRegion) return false;
    if (filterType !== "all" && dest.typeValue !== filterType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/register" className="px-5 py-2 bg-brand-600 text-white font-medium rounded-full shadow-md">
            {t("bookNow")}
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-surface-900">{t("title")}</h1>
          <p className="text-lg text-surface-600">{t("subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="glass p-6 rounded-3xl mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-surface-200 bg-white focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <select 
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-4 py-3 rounded-xl border border-surface-200 bg-white outline-none min-w-[150px]"
            >
              <option value="all">{t("filters.regionAll")}</option>
              <option value="north">{t("filters.regionNorth")}</option>
              <option value="northeast">{t("filters.regionNortheast")}</option>
              <option value="central">{t("filters.regionCentral")}</option>
              <option value="east">{t("filters.regionEast")}</option>
              <option value="west">{t("filters.regionWest")}</option>
              <option value="south">{t("filters.regionSouth")}</option>
            </select>
            
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-surface-200 bg-white outline-none min-w-[150px]"
            >
              <option value="all">{t("filters.typeAll")}</option>
              <option value="mountain">{t("filters.typeMountain")}</option>
              <option value="beach">{t("filters.typeBeach")}</option>
              <option value="waterfall">{t("filters.typeWaterfall")}</option>
              <option value="culture">{t("filters.typeCulture")}</option>
              <option value="checkin">{t("filters.typeCheckin")}</option>
              <option value="restaurant">{t("filters.typeRestaurant")}</option>
              <option value="buffet">{t("filters.typeBuffet")}</option>
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-600 rounded-full shadow-sm">
                    {dest.region}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-accent-600 rounded-full shadow-sm">
                    {dest.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-surface-900">{dest.name}</h3>
                </div>
                <p className="flex items-center text-surface-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-red-500" /> {dest.province}
                </p>
                {dest.mustEat && (
                  <div className="mb-4 bg-orange-50 border border-orange-100 text-orange-700 px-3 py-2 rounded-xl text-sm flex items-start gap-2">
                    <Utensils className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><span className="font-bold">{t("labels.mustEat")}</span> {dest.mustEat}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-100">
                  <div className="flex items-center text-sm text-surface-500">
                    <Umbrella className="w-4 h-4 mr-2" />
                    {t("labels.festival")} <span className="font-medium text-surface-800 ml-1">{dest.festival}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors">
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <Map className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-surface-600">{t("labels.noResults")}</h3>
          </div>
        )}
      </main>
    </div>
  );
}
