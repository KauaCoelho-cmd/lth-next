"use client";
import React from "react";
import { motion } from "framer-motion";

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  avatar: string;
};

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {testimonials.map(({ text, name, role, avatar }, i) => (
              <div
                key={i}
                className="group relative w-[280px] rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                {/* Glow sutil no hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 30px rgba(124,58,237,0.08)" }} />

                {/* Aspas decorativas */}
                <span className="mb-3 block font-serif text-3xl leading-none text-violet-500/30">"</span>

                <p className="text-sm leading-relaxed text-zinc-300">{text}</p>

                <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <img
                    src={avatar}
                    alt={name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-violet-500/20"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">{name}</p>
                    <p className="text-[11px] text-zinc-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
