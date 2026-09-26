import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Image
                src="/logo-text.png"
                alt="Dev Stack Logo"
                width={36}
                height={36}
                className="rounded-lg"
                priority
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Dev Stack
              </span>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              Curated tools, technologies, and resources for developers building
              modern software.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-5 text-sm text-gray-500">
              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-gray-900 transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-gray-900 transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-gray-900 transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-5">
              PRODUCT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Technologies
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-5">
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide mb-5">
              LEGAL
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-400">
            © 2026 Dev Stack. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-gray-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}