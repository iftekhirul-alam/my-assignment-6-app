import React from 'react';
import Image from 'next/image';
import { IWorkout } from '@/components/types';

interface WorkoutDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

const fetchSingleWorkout = async (id: string): Promise<IWorkout | null> => {
  try {
    const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error(`API response failure state code tracking target: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Endpoint data hydration failure link issue:", error);
    return null;
  }
};

const WorkoutDetails = async ({ params }: WorkoutDetailsProps) => {
  const { slug } = await params;
  const workout = await fetchSingleWorkout(slug);

  if (!workout) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Workout routine dataset record not found on live database registers.</p>
      </div>
    );
  }

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
              <span 
                key={idx} 
                className="bg-[#a3e635] text-black text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full"
              >
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
                <span className="font-bold">{workout.rating}</span>
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
            <button className="bg-[#a3e635] hover:bg-[#b5f34c] text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg>
              Add to today's plan
            </button>
            <button className="bg-[#12131a] hover:bg-neutral-800 text-white border border-neutral-800 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center gap-2">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              Save for later
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;