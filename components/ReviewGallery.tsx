"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./icons";

const PHOTOS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/before-afters/${i + 1}.jpg`,
}));

export default function ReviewGallery() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / PHOTOS.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.max(0, Math.min(idx, PHOTOS.length - 1)));
  }, []);

  const scrollToIdx = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / PHOTOS.length;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
    setActiveIdx(idx);
  };

  const scrollBy = (dir: "left" | "right") => {
    const next = dir === "left" ? Math.max(0, activeIdx - 1) : Math.min(PHOTOS.length - 1, activeIdx + 1);
    scrollToIdx(next);
  };

  return (
    <section className="py-24 overflow-hidden bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-5xl text-zinc-900"
          >
            Əvvəl / Sonra
          </motion.h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy("left")}
              aria-label="Əvvəlki"
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:border-brand-red hover:text-brand-red text-zinc-500 flex items-center justify-center transition-all duration-200 shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              aria-label="Növbəti"
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:border-brand-red hover:text-brand-red text-zinc-500 flex items-center justify-center transition-all duration-200 shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Snap carousel */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        <div className="shrink-0 w-[12.5vw] md:hidden" />

        {PHOTOS.map(({ id, src }) => (
          <div
            key={id}
            className="snap-center shrink-0 mr-4"
            style={{ width: "75vw", maxWidth: "320px", aspectRatio: "9 / 16" }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
              <Image
                src={src}
                alt={`Əvvəl / Sonra ${id}`}
                fill
                sizes="320px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="font-heading font-bold text-[10px] uppercase tracking-wider bg-white/90 text-zinc-800 px-2.5 py-1 rounded-full border border-zinc-200">
                  Əvvəl / Sonra
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="font-body text-[10px] font-semibold text-white bg-brand-red px-2 py-0.5 rounded-full">
                  #{id}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="shrink-0 w-[12.5vw] md:hidden" />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {PHOTOS.map(({ id }, idx) => (
          <button
            key={id}
            onClick={() => scrollToIdx(idx)}
            className={`transition-all duration-300 rounded-full ${idx === activeIdx ? "w-5 h-1.5 bg-brand-red" : "w-1.5 h-1.5 bg-zinc-300"
              }`}
            aria-label={`Şəkil ${id}`}
          />
        ))}
      </div>

      {/* CTA strip */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="font-heading font-bold text-zinc-900 text-base">
              Eyni duruşu mənim maşınım üçün sifariş et
            </p>
            <p className="font-body text-zinc-500 text-sm mt-0.5">
              WhatsApp ilə sifariş edin, quraşdırma tam peşəkar şəkildə edilir.
            </p>
          </div>
          <a
            href="https://wa.me/994515411147?text=Salam!%20Sayt%C4%B1n%C4%B1zdak%C4%B1%20spacer%20montaj%C4%B1n%C4%B1%20m%C9%99nim%20ma%C5%9F%C4%B1n%C4%B1m%20%C3%BC%C3%A7%C3%BCn%20sifari%C5%9F%20etm%C9%99k%20ist%C9%99yir%C9%99m."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm px-6 py-3 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-[0_4px_20px_rgba(209,31,38,0.3)]"
          >
            <WhatsAppIcon size={16} />
            Eyni Duruşu Sifariş Et
          </a>
        </motion.div>
      </div>
    </section>
  );
}
