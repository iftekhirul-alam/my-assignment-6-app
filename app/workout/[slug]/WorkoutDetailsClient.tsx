"use client";

import React from 'react';
import Image from 'next/image';
import { IWorkout } from '@/components/types';
import { useWorkouts } from '@/app/context/WorkoutsContext';

interface WorkoutDetailsClientProps {
  workout: IWorkout;
}

export default function WorkoutDetailsClient({ workout }: WorkoutDetailsClientProps) {
  const { addToPlan, setAddToPlan, saveLater, setSaveLater } = useWorkouts();

  const isInPlan = addToPlan.some((item) => item.id === workout.id);
  const isSaved = saveLater.some((item) => item.id === workout.id);

  const handleTogglePlan = () => {
    if (isInPlan) {
      setAddToPlan(addToPlan.filter((item) => item.id !== workout.id));
    } else {
      if (addToPlan.length >= 5) {
        alert("Cap of five lifts for today. Finish them, then load more.");
        return;
      }
      setAddToPlan([...addToPlan, workout]);
    }
  };

  const handleToggleSave = () => {
    if (isSaved) {
      setSaveLater(saveLater.filter((item) => item.id !== workout.id));
    } else {
      setSaveLater([...saveLater, workout]);
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white p-4 sm:p-8 lg:p-12 flex items-center justify-center">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
        
        <div className="w-full lg:w-1/2 relative aspect-[4/3] sm:aspect-square bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-900 shadow-2xl">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 550px"
          />
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-3">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed font-normal">
              {workout.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group, idx) => (
              <span key={idx} className="bg-[#a3e635] text-black text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full">
                {group}
              </span>
            ))}
          </div>

          <div className="bg-[#12131a] rounded-2xl border border-neutral-900 overflow-hidden divide-y divide-neutral-900/60 text-sm font-semibold tracking-wide text-gray-400">
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Equipment</span>
              <span className="text-gray-200">{workout.equipment}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Difficulty</span>
              <span className="text-gray-200">{workout.difficulty}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Sets</span>
              <span className="text-gray-200">{workout.sets}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Reps</span>
              <span className="text-gray-200">{workout.reps}</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Duration</span>
              <span className="text-gray-200">{workout.duration} min</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Calories</span>
              <span className="text-gray-200">{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="uppercase text-xs text-gray-500 font-bold">Rating</span>
              <div className="flex items-center gap-1.5 text-gray-200">
                <svg className="w-4 h-4 fill-yellow-500 text-yellow-500" viewBox="0 0 24 24" xmlns="http://w3.org">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="font-bold">{workout.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-white text-base font-black uppercase tracking-wider">
              Instructions
            </h3>
            <ol className="space-y-2.5 text-gray-400 text-sm font-medium leading-relaxed list-none">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-2 text-left">
                  <span className="text-gray-500 font-bold shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={handleTogglePlan}
              className={`font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 ${
                isInPlan ? 'bg-neutral-800 text-gray-300 hover:bg-neutral-700' : 'bg-[#a3e635] hover:bg-[#b5f34c] text-black'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg>
              {isInPlan ? "Remove from plan" : "Add to today's plan"}
            </button>
            <button 
              onClick={handleToggleSave}
              className={`font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 border ${
                isSaved ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-[#12131a] hover:bg-neutral-800 text-white border-neutral-800'
              }`}
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              {isSaved ? "Saved" : "Save for later"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}