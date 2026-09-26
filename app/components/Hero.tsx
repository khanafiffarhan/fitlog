import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0e0f14] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[590px] max-w-[1120px] flex-col overflow-hidden rounded-2xl border border-[#30323c] bg-[#191b23] md:flex-row">
        {/* Left: Hero content */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">
          <span className="mb-6 text-sm font-medium uppercase tracking-wide text-[#b5ff27]">
            Workout Library
          </span>

          <h1 className="max-w-[550px] text-4xl font-semibold uppercase leading-[1.18] tracking-[0.025em] text-[#f4f5f9] sm:text-5xl lg:text-[52px]">
            Train with intent.
            <span className="block">Log every set.</span>
          </h1>

          <p className="mt-5 max-w-[440px] text-base leading-6 text-[#c0c4d0] sm:text-[17px]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          <div className="mt-5">
            <Link
              href="#library"
              className="inline-flex min-h-[42px] items-center justify-center rounded-2xl border border-[#d2ff64] bg-[#b5f52b] px-4 py-2.5 text-sm font-medium text-[#10120b] transition-colors hover:bg-[#c6ff50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5ff27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191b23]"
            >
              Browse Workouts
            </Link>
          </div>
        </div>

        {/* Right: Hero image */}
        <div className="relative flex min-h-[340px] flex-1 items-center justify-center px-4 pb-8 md:min-h-0 md:px-6 md:py-8">
          <div className="relative h-[360px] w-full max-w-[440px] sm:h-[430px] md:h-[480px]">
            <Image
              src="/workout-hero.png"
              alt="Anatomical figure training on a gym machine"
              fill
              priority
              sizes="(max-width: 767px) 90vw, 45vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}