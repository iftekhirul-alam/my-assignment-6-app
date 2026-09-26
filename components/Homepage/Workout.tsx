import React from 'react';
import WorkoutCard from './WorkoutCard';
import { IWorkout } from '../types';

const getData =async() =>{
    const response = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await response.json();
    return data;
}

const Workout = async () => {
    const workoutData = await getData();
    return (
        <div className='container mx-auto m-2'>
          <div className='p-6'>
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none">
          THE LIBRARY
        </h1>
        
        <p className="text-gray-400 text-sm sm:text-base font-normal leading-relaxed max-w-md">
          Tweive lifts covering every major muscle group.
        </p>
        </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {workoutData.map((workout: IWorkout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
        </div>
    );
};

export default Workout;