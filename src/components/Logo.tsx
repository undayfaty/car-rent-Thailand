import React from 'react';
import { Link } from '@/i18n/routing';

export default function Logo() {
  return (
    <Link href="/" className="relative flex items-center justify-center group cursor-pointer hover:opacity-80 transition-opacity">
      <div className="bg-white w-40 h-12 md:w-48 md:h-14 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.2)] flex items-center justify-center overflow-hidden">
        <img 
          src="/logo.png" 
          alt="AURUM Luxury Car Rent" 
          className="h-[160%] max-w-none object-contain mix-blend-multiply" 
        />
      </div>
    </Link>
  );
}
