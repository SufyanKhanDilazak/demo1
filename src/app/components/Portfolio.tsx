'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";

interface SkillIcon {
  id: number;
  name: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  skills: SkillIcon[];
}

const PortfolioSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: "Website Development",
      description: "Built responsive websites using Next.js, Node.js, PostgreSQL, and AWS",
      image: "/website.jpg",
      skills: [
        { id: 1, name: "ECommerce", icon: "/website.jpg" },
        { id: 2, name: "Restaurant", icon: "/rest.jpg" },
        { id: 3, name: "Business", icon: "/busi.jpg" },
        { id: 4, name: "Custom", icon: "/hand.jpg" },
      ],
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Designed user-friendly mobile app interfaces using Figma",
      image: "/apps.jpg",
      skills: [
        { id: 5, name: "Betting Apps", icon: "/yk.jpg" },
        { id: 6, name: "Services App", icon: "/ios.jpg" },
        { id: 7, name: "Financial App", icon: "/ios1.jpg" },
        { id: 8, name: "Custom App", icon: "/wb.jpg" },
      ],
    },
    {
      id: 3,
      title: "3D Product Videos",
      description: "Created stunning 3D product videos for advertisements",
      image: "/animation.jpg",
      skills: [
        { id: 9, name: "Modeling", icon: "/ani1.jpg" },
        { id: 10, name: "Texturing", icon: "/ani2.jpg" },
        { id: 11, name: "Animation", icon: "/ani3.jpg" },
        { id: 12, name: "Rendering", icon: "/ani4.jpg" },
      ],
    },
    {
      id: 4,
      title: "Social Media Marketing",
      description: "Developed effective social media marketing strategies",
      image: "/sm.jpg",
      skills: [
        { id: 13, name: "Facebook", icon: "/facebook.jpg" },
        { id: 14, name: "Instagram", icon: "/insta.jpg" },
        { id: 15, name: "TikTok", icon: "/tiktok.jpg" },
        { id: 16, name: "Youtube", icon: "/youtube.jpg" },
      ],
    },
  ], []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }), []);

  const titleVariants = useMemo(() => ({
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }), []);

  const memoizedProjects = useMemo(() =>
    projects.map((project) => (
      <motion.div
        key={project.id}
        variants={cardVariants}
        className="backdrop-blur-md bg-gradient-to-b from-transparent via-[#301934] to-transparent rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
      >
        <div className="relative w-full pt-[60%] sm:pt-[75%] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>
        <div className="p-3 sm:p-6">
          <h2 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-white">{project.title}</h2>
          <p className="text-xs sm:text-base text-gray-200 mb-2 sm:mb-4">{project.description}</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {project.skills.map((skill) => (
              <motion.div
                key={skill.id}
                className="flex items-center backdrop-blur-sm bg-white/20 rounded-full p-1 sm:p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 mr-1 sm:mr-2 rounded-full overflow-hidden bg-white/30 flex items-center justify-center">
                  <Image
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    width={32}
                    height={32}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )), [cardVariants, projects]);

  return (
    <section id="portfolio" className="py-6 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-6 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Our Portfolio
          </h1>
          <h3 className='text-white font-semibold text-sm mt-5'>What We Make</h3>
        </motion.div>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {memoizedProjects}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
