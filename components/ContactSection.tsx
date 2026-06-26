"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Clock } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "./icons";

const ContactMap = dynamic(() => import("./ContactMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-100 bg-zinc-100 flex items-center justify-center rounded-2xl">
      <div className="text-center text-zinc-400 font-body text-sm">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-brand-blue rounded-full animate-spin mx-auto mb-3" />
        Xəritə yüklənir…
      </div>
    </div>
  ),
});

const HOURS = [
  { day: "Bazar ertəsi – Şənbə", time: "09:00 – 19:00" },
  { day: "Bazar", time: "10:00 – 17:00" },
];

const ICON_CELL = "w-10 h-10 rounded-xl bg-color-brand  flex items-center justify-center shrink-0";

export default function ContactSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-5xl text-zinc-900 mt-4"
          >
            Bizimlə Əlaqə
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-zinc-200 min-h-100 shadow-sm"
          >
            <ContactMap />
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white border border-zinc-200 shadow-sm rounded-2xl p-7 flex flex-col gap-6"
          >
            {/* Address */}
            <div className="flex gap-4">
              <div className={ICON_CELL}>
                <Image src="/waze-icon.svg" alt="Waze" width={40} height={40} />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-zinc-500 mb-0.5">
                  Ünvan
                </p>
                <p className="font-body font-medium text-zinc-900 text-sm leading-relaxed">
                  Əliyar Əliyev 25
                  <br />
                  Bakı, Azərbaycan
                </p>
                <a
                  href="https://ul.waze.com/ul?place=ChIJO59VawB9MEARuJ5Ic2RI864&ll=40.40494280%2C49.87657520&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-md text-brand-blue hover:underline mt-1"
                >
                  Waze ilə Aç
                </a>
              </div>
            </div>

            <div className="border-t border-zinc-100" />

            {/* Phone */}
            <div className="flex gap-4">
              <div className={ICON_CELL}>
                <Phone size={18} className="text-brand-red" />
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-zinc-500 mb-0.5">
                  Telefon
                </p>
                <a
                  href="tel:+994515411147"
                  className="font-heading font-bold text-zinc-900 hover:text-brand-red transition-colors text-sm"
                >
                  +994 51 541 11 47
                </a>
              </div>
            </div>

            <div className="border-t border-zinc-100" />

            {/* Hours */}
            <div className="flex gap-4">
              <div className={ICON_CELL}>
                <Clock size={18} className="text-brand-red" />
              </div>
              <div className="w-full">
                <p className="font-body text-xs uppercase tracking-widest text-zinc-500 mb-2">
                  İş Saatları
                </p>
                <ul className="space-y-1.5">
                  {HOURS.map(({ day, time }) => (
                    <li key={day} className="flex justify-between font-body text-xs">
                      <span className="text-zinc-500">{day}</span>
                      <span className="text-zinc-900 font-medium">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-zinc-100" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 mt-auto">
              <a
                href="https://wa.me/994515411147?text=Salam%20Spacer%20Azerbaijan!%20M%C9%99hsullar%20haqq%C4%B1nda%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-[#1ebe5d] text-white font-heading font-semibold text-sm py-2.5 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-sm"
              >
                <WhatsAppIcon size={15} />
                WhatsApp'da Yaz
              </a>
              <a
                href="https://www.instagram.com/spacer.azerbaijan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white font-heading font-semibold text-sm py-2.5 rounded-xl uppercase tracking-widest transition-all duration-200 shadow-sm"
                style={{ background: "linear-gradient(to right, #f58529, #dd2a7b)" }}
              >
                <InstagramIcon size={15} />
                Instagram'da İzlə
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
