import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Dumbbell size={28} strokeWidth={2.5} className="text-[#c8ff24]" />
        <span className="text-2xl font-bold tracking-tight text-white">
          FITLOG
        </span>
      </div>

      {/* Big 404 */}
      <h1 className="text-8xl sm:text-9xl font-black text-[#c8ff24] tracking-tighter">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
        Page not found
      </h2>
      <p className="mt-3 text-gray-400 max-w-md">
        Looks like this lift doesn’t exist in the library.  
        Let’s get you back to training.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-[#c8ff24] text-black font-semibold hover:bg-[#b8ef14] transition"
        >
          Back to Workouts
        </Link>
        <Link
          href="/my-plan"
          className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition"
        >
          My Plan
        </Link>
      </div>
    </div>
  );
}