"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Tab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating" ;

export default function MyPlanPage() {
  const {
    todayPlan,
    saved,
    removeFromTodayPlan,
    markAsDone,
    removeFromSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const list = activeTab === "today" ? todayPlan : saved;

  const sortedList = [...list].sort((a, b) => {
    switch (sortBy) {
      case "duration":
        return a.duration - b.duration;
      case "calories":
        return b.caloriesBurned - a.caloriesBurned;
      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });

  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((sum, e) => sum + e.duration, 0);
  const totalCalories = todayPlan.reduce((sum, e) => sum + e.caloriesBurned, 0);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold tracking-tight">MY PLAN</h1>
        <p className="mt-2 text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Stats cards */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl p-5 text-center border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Exercises</p>
            <p className="text-3xl font-bold text-lime-400">{totalExercises}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-5 text-center border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Minutes</p>
            <p className="text-3xl font-bold">{totalMinutes}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-5 text-center border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Calories</p>
            <p className="text-3xl font-bold">{totalCalories}</p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "today"
                  ? "bg-lime-400 text-black"
                  : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
              }`}
            >
              Today’s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "saved"
                  ? "bg-lime-400 text-black"
                  : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222]"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-lime-400"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Exercise list */}
        <div className="mt-6 space-y-4">
          {sortedList.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <h2>Nothing here Yet</h2>
              {activeTab === "today"
                ? "Browse the library and add a lift to get today moving"
                : "Browse the library and add a lift to get today moving"}
                 <div className="mt-5">
            <Link
              href="/"
              className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-[#d2ff64] bg-[#b5f52b] px-4 py-2.5 text-sm font-medium text-[#10120b] transition-colors hover:bg-[#c6ff50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5ff27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191b23]"
            >
              Go to workouts
            </Link>
          </div>
            </div>
          ) : (
            sortedList.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-white/5 hover:border-white/10 transition"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{exercise.name}</h3>
                  <p className="text-sm text-gray-400">{exercise.equipment}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exercise.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.709-.55 1.123C9.276 4.784 8.5 6.5 8.5 8.5c0 1.5.5 2.8 1.3 3.8.4.5.9.9 1.5 1.2.6.3 1.3.5 2 .5s1.4-.2 2-.5c.6-.3 1.1-.7 1.5-1.2.8-1 1.3-2.3 1.3-3.8 0-2-.776-3.716-1.573-4.929a5.52 5.52 0 00-.55-1.123 3.3 3.3 0 00-.822-.88 1 1 0 00-1.45.385z" clipRule="evenodd" />
                      </svg>
                      {exercise.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {exercise.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/exercise/${exercise.id}`}
                    className="px-4 py-2 text-sm rounded-full border border-white/20 hover:bg-white/5 transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "today" ? (
                    <button
                      onClick={() => markAsDone(exercise.id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-lime-400 text-black font-medium hover:bg-lime-300 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mark as Done
                    </button>
                  ) : null}

                  <button
                    onClick={() =>
                      activeTab === "today"
                        ? removeFromTodayPlan(exercise.id)
                        : removeFromSaved(exercise.id)
                    }
                    className="p-2 text-gray-400 hover:text-red-400 transition"
                    title="Remove"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}