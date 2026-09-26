"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

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

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToTodayPlan, addToSaved, isInTodayPlan, isInSaved } = useWorkout();


  useEffect(() => {
    async function fetchExercise() {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );
        if (!res.ok) throw new Error("Exercise not found");
        const data = await res.json();
        setExercise(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-white text-xl">Loading exercise...</div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center gap-4">
        <div className="text-red-400 text-xl">
          {error || "Exercise not found"}
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-lime-400 text-black font-medium hover:bg-lime-300 transition"
        >
          Back to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Library
        </button>

        {/* Main content - two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Image */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[620px] rounded-2xl overflow-hidden bg-[#1a1a1a]">
            <Image
              src={exercise.image}
              alt={exercise.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">
              {exercise.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-gray-400 leading-relaxed">
              {exercise.description}
            </p>

            {/* Muscle tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {exercise.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-lime-400 text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Specs table */}
            <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
              {[
                { label: "EQUIPMENT", value: exercise.equipment },
                { label: "DIFFICULTY", value: exercise.difficulty },
                { label: "SETS", value: exercise.sets },
                { label: "REPS", value: exercise.reps },
                { label: "DURATION", value: `${exercise.duration} min` },
                { label: "CALORIES", value: `${exercise.caloriesBurned} kcal` },
                { label: "RATING", value: exercise.rating },
              ].map((row, idx) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center px-5 py-3.5 ${
                    idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"
                  }`}
                >
                  <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    {row.label}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-lg font-bold tracking-wide uppercase mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {exercise.instructions.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-gray-300 leading-relaxed"
                  >
                    <span className="text-lime-400 font-medium shrink-0">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  addToTodayPlan(exercise);
                  
                }}
                disabled={isInTodayPlan(exercise.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                  isInTodayPlan(exercise.id)
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-lime-400 text-black hover:bg-lime-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add to today’s plan
              </button>

              <button 
              onClick={() => {
                  addToSaved(exercise);
                  
                }}
                disabled={isInSaved(exercise.id)}
              
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
