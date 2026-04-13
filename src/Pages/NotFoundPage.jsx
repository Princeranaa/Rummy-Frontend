import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GamePlay from "../assets/Loading/Game-Play.png";

// Assume these imports remain the same
import Club_A from "../../src/assets/Cards/Club/A.png";
import Diamond_A from "../../src/assets/Cards/Diamond/A.png";
import Heart_A from "../../src/assets/Cards/Heart/A.png";
import Spade_A from "../../src/assets/Cards/Spades/Q.png";
import Club_K from "../../src/assets/Cards/Club/K.png";
import Diamond_K from "../../src/assets/Cards/Diamond/K.png";
import Heart_K from "../../src/assets/Cards/Heart/K.png";
import Spade_K from "../../src/assets/Cards/Spades/K.png";

const cardImages = [
  Club_A,
  Diamond_A,
  Heart_A,
  Spade_A,
  Club_K,
  Diamond_K,
  Heart_K,
  Spade_K,
];

const FallingCard = ({ delay = 0, duration = 8, size = 60 }) => {
  const config = useMemo(() => {
    const startX = Math.random() * window.innerWidth; // use px instead of %

    return {
      image: cardImages[Math.floor(Math.random() * cardImages.length)],
      startX,
      drift: Math.random() * 100 - 50, // px drift
      rotation: Math.random() * 360,
      endRotation: Math.random() * 720 + 360,
    };
  }, []);

  return (
    <motion.img
      src={config.image}
      alt="falling card"
      className="absolute pointer-events-none select-none opacity-40 md:opacity-70"
      style={{
        width: size,
        willChange: "transform", // 🔥 performance boost
        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.5))",
      }}
      initial={{
        x: config.startX,
        y: -150,
        rotate: config.rotation,
      }}
      animate={{
        x: config.startX + config.drift,
        y: window.innerHeight + 150,
        rotate: config.endRotation,
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
};

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden flex items-center justify-center relative font-sans">
      {/* 🌌 Dynamic Ambient Glow Layer */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-500px  h-500px bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/3 w-300 h-300 bg-purple-600/10 rounded-full blur-[100px]" />
      </div> */}

      {/* ================= BACKGROUND IMAGE ================= */}
      {/* 👉 REPLACE this URL with your own image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 🎴 Card Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background Layer */}
        {Array.from({ length: 8 }).map((_, i) => (
          <FallingCard
            key={`bg-${i}`}
            duration={15}
            size={35}
            delay={i * 1.2}
          />
        ))}
        {/* Mid Layer */}
        {Array.from({ length: 6 }).map((_, i) => (
          <FallingCard
            key={`mid-${i}`}
            duration={10}
            size={50}
            delay={i * 1.5}
          />
        ))}
        {/* Foreground Layer */}
        {Array.from({ length: 4 }).map((_, i) => (
          <FallingCard key={`fg-${i}`} duration={7} size={75} delay={i * 2} />
        ))}
      </div>

      {/* ✨ Glassmorphic UI Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-4  p-8 md:p-12 rounded-[2.5rem]  max-w-lg w-full text-center"
      >
        <div className="relative inline-block">
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter bg-linear-to-br from-white via-gray-300 to-gray-600 text-transparent bg-clip-text">
            404
          </h1>
          {/* Subtle glow behind text */}
          <div className="absolute -inset-2 bg-white/10 blur-2xl -z-10 rounded-full" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white uppercase tracking-widest">
          Fold Your Hand 🚫
        </h2>

        <p className="text-gray-400 mt-4 leading-relaxed">
          The page you're looking for was never dealt.{" "}
          <br className="hidden md:block" />
          Better luck in the next round.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          {/* 🃏 Primary Action (Card + Button) */}
          <div
            className="
            flex items-center gap-4 
            px-2 py-2 
            rounded-2xl 
            bg-white/5 
            backdrop-blur-xl 
            border border-white/10
          "
          >
            <img
              src={Diamond_A}
              alt="card"
              className="w-12 h-12 object-contain drop-shadow-md"
            />

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/")}
              className="
                px-2 py-2 
                text-white font-semibold 
                "
            >
              BACK TO TABLE
            </motion.button>
          </div>

          {/* ⚠️ Secondary Action */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-6 py-5 
              rounded-xl 
              text-white font-semibold
              bg-white/5 
              backdrop-blur-md 
              border border-white/20 
              shadow-md shadow-black/20
              hover:bg-white/10 
              hover:border-white/40
              transition-all duration-300
            "
          >
            REPORT BUG
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
