"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#products", label: "Məhsullar" },
  { href: "#reviews", label: "Rəylər" },
  { href: "#contact", label: "Əlaqə" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`hidden md:block fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — directly on dark/light background, no circle */}
          <button onClick={() => scrollTo("#")} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Spacer Azerbaijan"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 object-contain"
              priority
            />
          </button>

          {/* Desktop nav — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`font-body font-medium text-sm tracking-widest uppercase transition-colors duration-200 hover:text-brand-red ${
                  scrolled ? "text-zinc-700" : "text-zinc-200"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#products")}
              className="bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-xs px-6 py-2.5 rounded-lg uppercase tracking-widest transition-all duration-200 shadow-[0_4px_16px_rgba(209,31,38,0.3)]"
            >
              Sifariş Et
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
