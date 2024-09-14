'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Wrench, Lock, Lightbulb, Award, Users, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CountUp = ({ end, duration = 2.5, suffix = '' }:any) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{end === 2017 ? count : count.toLocaleString()}{suffix}</span>;
};

const AboutSection = () => {
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const mainCards = [
    { icon: Shield, title: 'Trust', description: 'Building lasting relationships.', color: 'from-blue-400 to-blue-600' },
    { icon: Wrench, title: 'Warranty', description: 'Guaranteed quality service.', color: 'from-green-400 to-green-600' },
    { icon: Lock, title: 'Security', description: 'Protecting your digital assets.', color: 'from-red-400 to-red-600' },
    { icon: Lightbulb, title: 'Innovative', description: 'Cutting-edge solutions.', color: 'from-yellow-400 to-yellow-600' },
  ];

  const miniCards = [
    { icon: Award, title: 'Countries', value: 166, suffix: '+', color: 'from-indigo-400 to-indigo-600' },
    { icon: Users, title: 'Clients', value: 528, suffix: '+', color: 'from-pink-400 to-pink-600' },
    { icon: Target, title: 'Projects', value: 653, suffix: '+', color: 'from-purple-400 to-purple-600' },
    { icon: Calendar, title: 'Since', value: 2017, color: 'from-teal-400 to-teal-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#301934] to-transparent">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-center mb-16 max-w-3xl mx-auto animate-fade-in text-gray-100 dark:text-gray-300"
        >
          Delivering exceptional digital experiences with passion and expertise.
        </motion.p>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {miniCards.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className={`bg-gradient-to-br ${card.color} transition-all duration-300 hover:scale-105 hover:shadow-md`}>
                <CardContent className="flex items-center p-4">
                  <card.icon className="mr-4 text-white" size={24} />
                  <div>
                    <p className="text-sm font-medium text-white">{card.title}</p>
                    <p className="text-2xl font-bold text-white">
                      <CountUp end={card.value} suffix={card.suffix} />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {mainCards.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${card.color}`}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <card.icon className="mb-4 text-white transition-transform duration-300 hover:scale-110" size={48} />
                  <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-white">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;