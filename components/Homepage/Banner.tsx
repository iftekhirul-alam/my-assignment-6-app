import React from 'react';
import Image from 'next/image';
import bannerImg from "@/assets/banner.png"; 

const Banner = () => {
  return (
    <section className="w-full bg-black rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden border border-neutral-900 container mx-auto">
      
      <div className="flex-1 max-w-xl text-left space-y-4 md:space-y-6">
        <span className="text-[#a3e635] text-xs font-bold tracking-widest uppercase block">
          Workout Library
        </span>
        
        <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none">
          Train with intent.Log <br />  every set.
        </h1>
        
        <p className="text-gray-400 text-sm sm:text-base font-normal leading-relaxed max-w-md">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it 
          into today's plan, and watch the week's work add up.
        </p>
        
        <div className="pt-2">
          <button className="bg-[#a3e635] hover:bg-[#b2f042] text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-sm">
            Browse Workouts
          </button>
        </div>

      </div>

      <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm md:max-w-md">
        <Image src={bannerImg} alt="Bicep Curl Workout Anatomy Illustration"/>
      </div>

    </section>
  );
};

export default Banner;
