import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkout } from '../types';

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link href={`/workout/${workout.id}`} className="w-full">
      <div className="w-full bg-[#12131a] rounded-2xl overflow-hidden shadow-2xl border border-neutral-900 group cursor-pointer transition-transform duration-200 hover:-translate-y-1">
        
        <div className="relative w-full aspect-[4/3] bg-neutral-800">
          <Image 
            src={workout.image} 
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-103 transition-transform duration-300"
            sizes="(max-w-768px) 100vw, 380px"
            priority
          />
        </div>

        <div className="p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group, index) => (
              <span
                key={index}
                className="bg-[#a3e635] text-black text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="space-y-1.5">
            <h3 className="text-white text-xl font-black uppercase tracking-wide leading-tight line-clamp-1">
              {workout.name}
            </h3>
            <p className="text-gray-500 text-xs font-semibold tracking-normal line-clamp-1">
              {workout.equipment}
            </p>
          </div>

          <hr className="border-neutral-800/60" />

          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold tracking-wide pt-0.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-60 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org">
                <path d="M12 2c0 0-5 3.5-5 7.5s3 6.5 5 8.5c2-2 5-4.5 5-8.5S12 2 12 2z" />
              </svg>
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 24 24" xmlns="http://www.w3.org">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-gray-300 font-bold">{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;