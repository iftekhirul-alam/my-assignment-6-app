"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWorkouts } from '../context/WorkoutsContext';

export default function MyPlanPage() {
  const { addToPlan, setAddToPlan, saveLater, setSaveLater } = useWorkouts();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>('duration');

  const displayedList = activeTab === 'plan' ? addToPlan : saveLater;

  const totalExercises = addToPlan.length;
  const totalMinutes = addToPlan.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = addToPlan.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const sortedList = [...displayedList].sort((a, b) => {
    if (sortBy === 'duration') return b.duration - a.duration;
    if (sortBy === 'calories') return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleRemove = (id: number) => {
    if (activeTab === 'plan') {
      setAddToPlan(addToPlan.filter((item) => item.id !== id));
    } else {
      setSaveLater(saveLater.filter((item) => item.id !== id));
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white p-6 sm:p-10 lg:p-16">
      <div className="container max-w-6xl mx-auto space-y-8">
        
        <div className="space-y-1">
          <h1 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#12131a] border border-neutral-900 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Exercises</span>
            <p className="text-[#a3e635] text-4xl sm:text-5xl font-black">{totalExercises}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Minutes</span>
            <p className="text-white text-4xl sm:text-5xl font-black">{totalMinutes}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Calories</span>
            <p className="text-white text-4xl sm:text-5xl font-black">{totalCalories}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="bg-[#12131a] p-1.5 rounded-xl border border-neutral-900 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'plan' ? 'bg-[#1a2312] text-[#a3e635]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'saved' ? 'bg-[#1a2312] text-[#a3e635]' : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved ({saveLater.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#12131a] border border-neutral-800 text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedList.length === 0 ? (
            <div className="bg-[#12131a] border border-neutral-900 rounded-2xl p-12 text-center text-gray-500 text-sm">
              No workouts found in {activeTab === 'plan' ? "today's plan" : 'saved list'}.
            </div>
          ) : (
            sortedList.map((workout) => (
              <div 
                key={workout.id}
                className="bg-[#12131a] border border-neutral-900 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-neutral-800 transition-all shadow-lg"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-neutral-900">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white text-base sm:text-lg font-black uppercase tracking-wide">
                      {workout.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-semibold">{workout.equipment}</p>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-400 pt-1">
                      <span className="flex items-center gap-1">
                        ⏱️ {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        🔥 {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {workout.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-5 py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button className="px-5 py-2.5 rounded-xl bg-[#a3e635] hover:bg-[#b5f34c] text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5">
                      ✓ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(workout.id)}
                    className="p-2.5 rounded-xl bg-neutral-900 text-gray-500 hover:text-red-400 hover:bg-neutral-800 transition-all"
                    title="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  );
}