"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();

  const { todayPlan, saved } = useWorkout();

  const isWorkouts = pathname === "/workouts";
  const isPlan = pathname === "/plan";

  return (
    <header className="h-[68px] border-b border-[#25262b] bg-[#0d0e12]">
      <div className="mx-auto flex h-full max-w-[1120px] items-center px-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Dumbbell
            size={21}
            strokeWidth={2.5}
            className="text-[#c8ff24]"
          />

          <span className="text-[18px] font-bold tracking-tight text-[#e9e9eb]">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="ml-auto mr-auto flex h-full items-center gap-1">
          <Link
            href="/"
            className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
              isWorkouts
                ? "bg-[#181b20] text-[#c8ff24]"
                : "text-[#e4e4e7] hover:bg-[#15171b]"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
              isPlan
                ? "bg-[#181b20] text-[#c8ff24]"
                : "text-[#e4e4e7] hover:bg-[#15171b]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-7">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[12px] font-semibold text-[#e5e5e7]"
          >
            <span>Plan</span>

            <span className="flex h-[23px] min-w-[27px] items-center justify-center rounded-full bg-[#c8ff24] px-2 text-[12px] font-bold text-[#10110e]">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[12px] font-semibold text-[#e5e5e7]"
          >
            <span>Saved</span>

            <span className="flex h-[23px] min-w-[27px] items-center justify-center rounded-full border border-[#d9d9dd] px-2 text-[12px] font-medium text-[#f0f0f2]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}