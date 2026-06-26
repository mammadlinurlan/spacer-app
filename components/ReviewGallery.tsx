"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { WhatsAppIcon } from "./icons";

const PHOTOS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/before-afters/${i + 1}.jpg`,
}));

export default function ReviewGallery() {
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged: (s) => setCurrent(s.track.details.rel),
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
  });

  const dotCount = instanceRef.current
    ? instanceRef.current.track.details.maxIdx + 1
    : PHOTOS.length;

  return (
    <section className="py-16 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-zinc-900 uppercase tracking-wide">
            Əvvəl / Sonra
          </h2>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {PHOTOS.map(({ id, src }) => (
            <div
              key={id}
              className="keen-slider__slide relative rounded-2xl overflow-hidden border border-zinc-200/80 shadow-md h-115 md:h-130"
            >
              <Image
                src={src}
                alt={`Əvvəl / Sonra ${id}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover pointer-events-none select-none"
                draggable={false}
                priority={id === 1}
              />

              <div className="absolute top-3 right-3">
                <span className="font-body text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  #{id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              aria-label={`Slayd ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${i === current
                ? "w-5 h-1.5 bg-brand-red"
                : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
            />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-6 bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-heading font-bold text-zinc-900 text-sm uppercase tracking-wide">
              Dəyişimə hazırsan? Sifariş et
            </p>
            <p className="font-body text-zinc-500 text-xs mt-0.5">
              WhatsApp ilə sifariş, quraşdırma peşəkar şəkildə edilir.
            </p>
          </div>
          <a
            href="https://wa.me/994515411147?text=Salam!%20Sayt%C4%B1n%C4%B1zdak%C4%B1%20spacer%20montaj%C4%B1n%C4%B1%20m%C9%99nim%20ma%C5%9F%C4%B1n%C4%B1m%20%C3%BC%C3%A7%C3%BCn%20sifari%C5%9F%20etm%C9%99k%20ist%C9%99yir%C9%99m."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-xs px-6 py-3 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-[0_4px_16px_rgba(209,31,38,0.25)]"
          >
            <WhatsAppIcon size={14} />
            Sifariş Et
          </a>
        </div>

      </div>
    </section>
  );
}
