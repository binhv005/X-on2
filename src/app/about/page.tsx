import React from "react";
import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About – X-ON",
  description: "X-ON is where modern nail artistry meets effortless beauty. Press On. Slay On. Repeat.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-neutral-800 mb-2">
            Welcome to X-ON
          </h3>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.55rem] font-bold text-neutral-900 font-serif leading-tight sm:leading-snug mb-6">
            Where Modern Nail Artistry Meets Effortless Beauty.
          </h2>

          <div className="text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4 font-normal text-left sm:text-center">
            <p>
              Created for nail lovers and professionals alike, <strong>X-ON</strong> offers handmade press-on nails and carefully selected nail essentials designed with quality, style, and performance in mind.
            </p>
            <p>
              From statement-making nail sets to everyday professional supplies, every X-ON product is chosen to make beautiful nails easier, faster, and more accessible—without compromising on a polished, luxury finish.
            </p>
            <p className="text-base sm:text-lg font-bold text-neutral-900 tracking-wide font-serif pt-2">
              X-ON — Press On. Slay On. Repeat.
            </p>
          </div>

          {/* Contact Details */}
          <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>3168 Bill Beck Blvd, Kissimmee Fl 34744</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-900 shrink-0" />
              <a href="tel:+16892128888" className="hover:text-black font-semibold">
                689-212-8888
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
