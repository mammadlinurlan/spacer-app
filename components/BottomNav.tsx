"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Car, Layers, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./icons";

const TABS = [
  {
    id: "products",
    icon: Car,
    label: "Seçim Et",
    href: "#products",
    activeColor: "#1B75BC",
  },
  {
    id: "reviews",
    icon: Layers,
    label: "Əvvəl/Sonra",
    href: "#reviews",
    activeColor: "#D11F26",
  },
  {
    id: "contact",
    icon: MapPin,
    label: "Ünvan",
    href: "#contact",
    activeColor: "#D11F26",
  },
] as const;

const WA_URL =
  "https://wa.me/994515411147?text=Salam%20Spacer%20Azerbaijan!%20Sifari%C5%9F%20etm%C9%99k%20ist%C9%99yir%C9%99m.";

export default function BottomNav() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = ["products", "reviews", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleTap = useCallback((id: string, href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  }, []);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-zinc-200/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-16">
        {/* Regular section tabs */}
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeId === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleTap(tab.id, tab.href)}
              className="flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors duration-200"
              style={{ color: isActive ? tab.activeColor : "#71717a" }}
            >
              {/* Active top indicator bar */}
              {isActive && (
                <motion.span
                  layoutId="active-bar"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-full"
                  style={{ backgroundColor: tab.activeColor }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.7} />
              <span className="font-body text-[10px] leading-none tracking-wide font-medium">
                {tab.label}
              </span>
            </motion.button>
          );
        })}

        {/* Hero WhatsApp button — Racing Red */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() =>
            window.open(WA_URL, "_blank", "noopener,noreferrer")
          }
          className="flex-1 flex flex-col items-center justify-center gap-1"
        >
          <span className="text-whatsapp flex items-center justify-center">
            <WhatsAppIcon size={28} />
          </span>
        </motion.button>
      </div>
    </nav>
  );
}
