"use client";

import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingAndServices: React.FC = () => {
  const router = useRouter();
  const [imageError, setImageError] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowButton(scrollPosition + windowHeight >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check in case we're already near the bottom
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = useCallback(() => router.push("/contact"), [router]);

  const handleImageError = useCallback(() => setImageError(true), []);

  return (
    <section id="home" className="relative h-screen max-h-[400px] sm:max-h-[500px] md:max-h-[650px] overflow-hidden mt-24">
      <div className="absolute inset-0">
        {!imageError ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="/img3.jpg"
              alt="GrowMate Background"
              fill
              sizes="100vw"
              quality={100}
              priority
              className="object-cover"
              onError={handleImageError}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-blue-500 to-purple-600" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight">
            <motion.span
              className="text-blue-500 drop-shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Grow
            </motion.span>
            <motion.span
              className="text-yellow-400 drop-shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Mate
            </motion.span>
          </h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 font-light italic tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Experience innovation like never before
          </motion.p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
            <AnimatePresence>
              {["Secure", "Smooth", "Fast"].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm"
                >
                  <span className="text-white font-semibold text-sm sm:text-base md:text-lg">{feature}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition duration-300 text-base sm:text-lg relative overflow-hidden"
            onClick={handleGetStarted}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition duration-300 text-base sm:text-lg relative overflow-hidden"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="relative z-10">Back to Top</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(LandingAndServices);
