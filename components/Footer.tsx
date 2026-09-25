import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logo.png";

const Footer = () => {
  
  return (
    <footer className="w-full bg-black text-gray-500 text-xs px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-900/50 container mx-auto m-4">
      
      <div className="flex items-center gap-2 cursor-pointer">
        <Image src={logo} alt="FitLog Logo" />
        <span className="text-white font-sans text-sm uppercase font-bold tracking-wider">
          FitLog
        </span>
      </div>

      <div className="text-center sm:text-right font-medium tracking-wide">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </div>

    </footer>
  );
};

export default Footer;
