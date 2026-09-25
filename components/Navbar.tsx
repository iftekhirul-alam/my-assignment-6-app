import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-black text-white px-6 py-3 shadow-md">
      <div className="navbar-start flex items-center gap-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-[#12131a] rounded-box z-index: 1 mt-3 w-52 p-2 shadow text-gray-300">
            <li><a className="text-[#a3e635] font-semibold">Workouts</a></li>
            <li><a>My Plan</a></li>
          </ul>
        </div>

        <div className="flex items-center gap-2 font-black tracking-wider text-xl cursor-pointer">
          <Image src={logo} alt="Logo"/>
          <span className="text-white font-sans text-lg uppercase font-bold tracking-tight">Fitlog</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center gap-4 bg-[#12131a] p-1.5 rounded-full border border-gray-800/40">
          <button className="px-5 py-1.5 rounded-full text-xs font-semibold bg-[#1a2312] text-[#a3e635] transition-all">
            Workouts
          </button>
          <button className="px-5 py-1.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white transition-all">
            My Plan
          </button>
        </div>
      </div>

      <div className="navbar-end flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-gray-400 group-hover:text-white transition-colors text-xs font-medium">Plan</span>
          <span className="w-5 h-5 flex items-center justify-center bg-[#a3e635] text-black text-[11px] font-bold rounded-full">
            0
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-gray-400 group-hover:text-white transition-colors text-xs font-medium">Saved</span>
          <span className="w-5 h-5 flex items-center justify-center border border-gray-700 text-gray-300 text-[11px] font-bold rounded-full group-hover:border-gray-500 transition-colors">
            0
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
