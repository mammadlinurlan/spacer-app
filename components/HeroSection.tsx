"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "video.js/dist/video-js.css";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    let disposed = false;

    const initPlayer = async () => {
      if (!videoRef.current) return;

      const { default: videojs } = await import("video.js");

      if (disposed || !videoRef.current) return;

      // Pick portrait video on narrow screens, landscape on wider
      const isMobile = window.innerWidth < 768;
      const src = isMobile ? "/mobile-hero.mp4" : "/hero.mp4";
      videoRef.current.src = src;

      const player = videojs(videoRef.current, {
        autoplay: "muted",
        loop: true,
        controls: false,
        muted: true,
        preload: "auto",
        fill: true,
        responsive: false,
        fluid: false,
        playsinline: true,
        sources: [{ src, type: "video/mp4" }],
      });

      playerRef.current = player;

      player.ready(() => {
        if (!disposed) {
          player.play()?.catch(() => {
            /* autoplay blocked — silently ignore */
          });
        }
      });
    };

    initPlayer();

    return () => {
      disposed = true;
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const scrollToProducts = () => {
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* ── Video Background ── */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div data-vjs-player className="w-full h-full">
          <video
            ref={videoRef}
            className="video-js vjs-bg-player w-full h-full"
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
          />
        </div>
      </div>

      {/* ── Overlays: heavy dark vignette + radial center clear ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">

        {/* Eyebrow badge */}


        {/* Main heading — metallic silver gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading font-extrabold tracking-tighter leading-none text-5xl md:text-8xl xl:text-9xl"
        >
          <span
            className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(26,117,188,0.3)]"
          >
            SPACER
          </span>
          <span
            className="block bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent"
          >
            AZERBAIJAN
          </span>
        </motion.h1>

        {/* Subtitle — readable zinc-300 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 font-body font-medium text-zinc-300 text-lg md:text-xl tracking-wide max-w-md"
        >
          Orijinal Sertifikatlı Spacer və Coilover Satışı
        </motion.p>

        {/* CTA — bold red with pulse ring */}
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 relative"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToProducts}
            className="relative bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-xs md:text-sm px-8 py-3 rounded-lg uppercase tracking-[0.15em] transition-colors duration-200 btn-neon-red"
          >
            AVTOMOBİLİNƏ UYĞUN SEÇİM ET
          </motion.button>
        </motion.div>

        {/* Trust badges */}

      </div>

      {/* ── Scroll Indicator ── */}

    </section>
  );
}
