"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
      >
        Build lamps <br className="hidden sm:block" /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full pb-[20vh] sm:pb-0 flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-40 sm:h-48 md:h-56 overflow-visible w-[15rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-20 sm:h-28 md:h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-20 sm:w-28 md:w-32 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-40 sm:h-48 md:h-56 w-[15rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-20 sm:w-28 md:w-32 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-20 sm:h-28 md:h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background effects */}
        <div className="absolute top-1/2 h-32 sm:h-40 md:h-48 w-full translate-y-8 sm:translate-y-10 md:translate-y-12 scale-x-125 sm:scale-x-150 bg-slate-950 blur-xl sm:blur-2xl" />
        <div className="absolute top-1/2 z-50 h-32 sm:h-40 md:h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        
        {/* Central glow */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-24 sm:h-28 md:h-32 w-32 sm:w-40 md:w-48 -translate-y-[4rem] sm:-translate-y-[5rem] md:-translate-y-[6rem] rounded-full bg-cyan-400 blur-xl sm:blur-2xl"
        />
        
        {/* Main central glow */}
        <div className="absolute top-1/2 z-50 h-24 sm:h-32 md:h-36 w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-30 sm:opacity-50 blur-xl sm:blur-2xl md:blur-3xl" />
        
        {/* Center line */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "15rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[15rem] sm:w-[20rem] md:w-[25rem] lg:w-[30rem] -translate-y-[5rem] sm:-translate-y-[6rem] md:-translate-y-[7rem] bg-cyan-400"
        />

        {/* Bottom cover */}
        <div className="absolute inset-auto z-40 h-32 sm:h-36 md:h-44 w-full -translate-y-[8rem] sm:-translate-y-[10rem] md:-translate-y-[12.5rem] bg-slate-950" />
      </div>

      {/* Content container */}
      <div className="relative z-50 flex -translate-y-110  md:-translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};