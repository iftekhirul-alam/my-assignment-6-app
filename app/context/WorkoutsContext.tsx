"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IWorkout } from '@/components/types';

interface WorkoutContextType {
  addToPlan: IWorkout[];
  setAddToPlan: React.Dispatch<React.SetStateAction<IWorkout[]>>;
  saveLater: IWorkout[];
  setSaveLater: React.Dispatch<React.SetStateAction<IWorkout[]>>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutsProvider = ({ children }: { children: ReactNode }) => {
  const [addToPlan, setAddToPlan] = useState<IWorkout[]>([]);
  const [saveLater, setSaveLater] = useState<IWorkout[]>([]);

  return (
    <WorkoutContext.Provider value={{ addToPlan, setAddToPlan, saveLater, setSaveLater }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutsProvider');
  }
  return context;
};

export default WorkoutsProvider;