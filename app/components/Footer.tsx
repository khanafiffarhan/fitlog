// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" >
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

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center sm:text-right">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}