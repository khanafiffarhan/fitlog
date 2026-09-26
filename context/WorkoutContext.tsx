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
  setTodayPlan((prev) => {
    // Already exists
    if (prev.some((e) => e.id === exercise.id)) {
      toast.info("This exercise is already in today’s plan", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return prev;
    }

    // Cap of 5
    if (prev.length >= 5) {
      toast.warning("Cap of five lifts for today. Finish them, then load more.", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      return prev;
    }

    // Successfully added
    toast.success(`${exercise.name} added to today’s plan!`, {
      position: "top-right",
      autoClose: 2500,
      theme: "dark",
    });

    return [...prev, exercise];
  });
};

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((e) => e.id !== id));
  };

  const markAsDone = (id: number) => {
    // For now just remove it (you can later move to a "completed" list)
    removeFromTodayPlan(id);
  };

  const addToSaved = (exercise: Exercise) => {
    setSaved((prev) => {
      if (prev.some((e) => e.id === exercise.id)) return prev;
      return [...prev, exercise];
    });
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((e) => e.id !== id));
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