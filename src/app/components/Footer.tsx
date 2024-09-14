"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {Star } from 'lucide-react';

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const starVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-transparent via-black to-[#301934] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
        
          
         
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2024 Galaxy Explorer. All rights reserved.</p>
          <p className="mt-2">Designed with passion for astronomical exploration</p>
        </div>
      </div>
      {[...Array(10)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={starVariants}
          initial="initial"
          animate="animate"
        >
          <Star size={16} className="text-white opacity-50" />
        </motion.div>
      ))}
    </footer>
  );
};

export default Footer;