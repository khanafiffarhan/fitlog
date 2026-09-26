"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import { Link } from "lucide-react";
import Link from "next/link";

interface Exercise {
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

export default function ExerciseLibrary() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch exercises");
        const data = await res.json();
        setExercises(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchExercises();
  }, []);

if (loading) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-5">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-[#c8ff24]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c8ff24] animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-[#e4e4e7] text-lg font-medium tracking-wide animate-pulse">
        Loading library...
      </p>
    </div>
  );
}

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div id="library" className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">THE LIBRARY</h1>
        <p className="mt-2 text-gray-400 text-lg">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* 3 rows × 4 columns grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exercises.map((exercise) => (

            <Link href={`/exercise/${exercise.id}`} key={exercise.id}>
              <article
                
                
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group"
              >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={exercise.image}
                alt={exercise.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Subtle gradient overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Muscle group tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {exercise.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-lime-400/15 text-lime-400 border border-lime-400/20"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold tracking-tight mb-1 group-hover:text-lime-300 transition-colors">
                {exercise.name}
              </h2>

              {/* Equipment */}
              <p className="text-sm text-gray-400 mb-4">{exercise.equipment}</p>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{exercise.duration} min</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.709-.55 1.123C9.276 4.784 8.5 6.5 8.5 8.5c0 1.5.5 2.8 1.3 3.8.4.5.9.9 1.5 1.2.6.3 1.3.5 2 .5s1.4-.2 2-.5c.6-.3 1.1-.7 1.5-1.2.8-1 1.3-2.3 1.3-3.8 0-2-.776-3.716-1.573-4.929a5.52 5.52 0 00-.55-1.123 3.3 3.3 0 00-.822-.88 1 1 0 00-1.45.385z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{exercise.caloriesBurned} kcal</span>
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{exercise.rating}</span>
                </div>
              </div>
            </div>
          </article>
          </Link >
        ))}
      </div>
    </div>
  );
}