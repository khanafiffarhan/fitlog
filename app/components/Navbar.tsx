"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, saved } = useWorkout();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkouts = pathname === "/" || pathname.startsWith("/exercise");
  const isPlan = pathname === "/my-plan";

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 h-[68px] border-b border-[#25262b] bg-[#0d0e12]">
      <div className="m-auto flex h-full items-center px-5">
        {/* Logo */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mr-auto flex items-center justify-center rounded-lg p-2 text-[#e4e4e7] hover:bg-[#15171b] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          {/* <Dumbbell size={21} strokeWidth={2.5} className="text-[#c8ff24]" /> */}
          <div className="relative ">
            <Image
              src="/logo.png"
              alt="Anatomical figure training on a gym machine"
              width={30}
              height={30}
              priority
             
              // className="object-contain"
            />
          </div>
          <span className="text-[18px] font-bold tracking-tight text-[#e9e9eb]">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto mr-auto hidden h-full items-center gap-1 md:flex">
          <Link
            href="/"
            className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
              isWorkouts
                ? "bg-[#181b20] text-[#c2f800]"
                : "text-[#e4e4e7] hover:bg-[#15171b]"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
              isPlan
                ? "bg-[#181b20] text-[#c2f800]"
                : "text-[#e4e4e7] hover:bg-[#15171b]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Desktop Counters */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-[12px] font-semibold text-[#e5e5e7]"
          >
            <span>Plan</span>
            <span className="flex h-[23px] min-w-[27px] items-center justify-center rounded-full bg-[#c8ff24] px-2 text-[12px] font-bold text-[#10110e]">
              {todayPlan.length}
            </span>
          </Link>

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

        {/* Mobile Hamburger Button */}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#25262b] bg-[#0d0e12] md:hidden">
          <div className="flex flex-col px-5 py-4 space-y-1">
            {/* Links */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-[14px] font-semibold transition ${
                isWorkouts
                  ? "bg-[#181b20] text-[#c2f800]"
                  : "text-[#e4e4e7] hover:bg-[#15171b]"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`rounded-xl px-4 py-3 text-[14px] font-semibold transition ${
                isPlan
                  ? "bg-[#181b20] text-[#c2f800]"
                  : "text-[#e4e4e7] hover:bg-[#15171b]"
              }`}
            >
              My Plan
            </Link>

            {/* Mobile Counters */}
            <div className="mt-4 flex items-center gap-6 border-t border-[#25262b] pt-4">
              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#e5e5e7]"
              >
                <span>Plan</span>
                <span className="flex h-[23px] min-w-[27px] items-center justify-center rounded-full bg-[#ccff00] px-2 text-[12px] font-bold text-[#10110e]">
                  {todayPlan.length}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={closeMenu}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#e5e5e7]"
              >
                <span>Saved</span>
                <span className="flex h-[23px] min-w-[27px] items-center justify-center rounded-full border border-[#d9d9dd] px-2 text-[12px] font-medium text-[#f0f0f2]">
                  {saved.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
