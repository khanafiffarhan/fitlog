"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

export interface Exercise {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface WorkoutContextType {
  todayPlan: Exercise[];
  saved: Exercise[];
  addToTodayPlan: (exercise: Exercise) => void;
  removeFromTodayPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  addToSaved: (exercise: Exercise) => void;
  removeFromSaved: (id: number) => void;
  isInTodayPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Exercise[]>([]);
  const [saved, setSaved] = useState<Exercise[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("todayPlan");
    const storedSaved = localStorage.getItem("savedExercises");
    if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("todayPlan", JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem("savedExercises", JSON.stringify(saved));
  }, [saved]);

const addToTodayPlan = (exercise: Exercise) => {
  // Check conditions first (outside of setState)
  const alreadyExists = todayPlan.some((e) => e.id === exercise.id);

  if (alreadyExists) {
    toast.info("This exercise is already in today’s plan", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return; // stop here
  }

  if (todayPlan.length >= 5) {
    toast.warning("Cap of five lifts for today. Finish them, then load more.", {
      position: "top-right",
      autoClose: 4000,
      theme: "dark",
    });
    return;
  }

  // Only update state if everything is fine
  setTodayPlan((prev) => [...prev, exercise]);

  // Success toast (only fires once)
  toast.success(`${exercise.name} added to today’s plan!`, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};

const removeFromTodayPlan = (id: number) => {
  const exercise = todayPlan.find((e) => e.id === id);
  
  setTodayPlan((prev) => prev.filter((e) => e.id !== id));

  toast.success(
    exercise ? `${exercise.name} removed from today’s plan` : "Exercise removed",
    {
      position: "top-right",
      autoClose: 2500,
      theme: "dark",
    }
  );
};

  const markAsDone = (id: number) => {
    // For now just remove it (you can later move to a "completed" list)
    removeFromTodayPlan(id);
  };

const addToSaved = (exercise: Exercise) => {
  // Check first (outside of setState)
  const alreadyExists = saved.some((e) => e.id === exercise.id);

  if (alreadyExists) {
    toast.info("This exercise is already saved", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
    return;
  }

  // Add to saved
  setSaved((prev) => [...prev, exercise]);

  // Success toast
  toast.success(`${exercise.name} saved for later!`, {
    position: "top-right",
    autoClose: 2500,
    theme: "dark",
  });
};

const removeFromSaved = (id: number) => {
  const exercise = saved.find((e) => e.id === id);

  setSaved((prev) => prev.filter((e) => e.id !== id));

  toast.success(
    exercise ? `${exercise.name} removed from saved` : "Exercise removed",
    {
      position: "top-right",
      autoClose: 2500,
      theme: "dark",
    }
  );
};

  const isInTodayPlan = (id: number) => todayPlan.some((e) => e.id === id);
  const isInSaved = (id: number) => saved.some((e) => e.id === id);

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        saved,
        addToTodayPlan,
        removeFromTodayPlan,
        markAsDone,
        addToSaved,
        removeFromSaved,
        isInTodayPlan,
        isInSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}