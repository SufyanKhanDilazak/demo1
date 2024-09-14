"use client"

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { useEffect } from 'react';

// Define your animated variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" }
  })
};

const services = [
  {
    title: 'User Research',
    description: 'Conduct thorough user research to understand your audience and their needs, ensuring a design that resonates with your users.',
    icon: '👥',
    details: [
      { name: 'Interviews', value: '20+' },
      { name: 'Surveys', value: '50+' }
    ]
  },
  {
    title: 'UI Design',
    description: 'Create visually appealing and user-friendly interfaces with a focus on usability and aesthetics.',
    icon: '🎨',
    details: [
      { name: 'Wireframes', value: '30+' },
      { name: 'Mockups', value: '50+' }
    ]
  },
  {
    title: 'UX Strategy',
    description: 'Develop a comprehensive UX strategy that aligns with your business goals and user needs, optimizing the user journey.',
    icon: '📈',
    details: [
      { name: 'User Flows', value: '15+' },
      { name: 'Prototypes', value: '20+' }
    ]
  },
  {
    title: 'Prototyping',
    description: 'Build interactive prototypes to test and validate design concepts before development, saving time and resources.',
    icon: '⚙️',
    details: [
      { name: 'Interactive Prototypes', value: '10+' },
      { name: 'Usability Testing', value: '5+' }
    ]
  }
];

const UiuxDesignPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" }
    }));
  }, [controls]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 md:p-12 mt-20">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          UI/UX Design Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Elevate your digital experience with our comprehensive UI/UX design solutions.
        </p>
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Our Services
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={cardVariants}
                custom={index}
                className="w-full sm:w-80 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Card>
                  <CardHeader className="flex items-center p-4 bg-gray-200">
                    <div className="text-4xl">{service.icon}</div>
                    <CardTitle className="ml-4 text-xl font-semibold text-gray-800">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <ul className="list-disc list-inside">
                      {service.details.map((detail, i) => (
                        <li key={i} className="text-gray-600">
                          {detail.name}: <strong>{detail.value}</strong>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full bg-teal-500 text-white hover:bg-teal-600">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Contact us today to discuss how we can help transform your digital presence.
          </p>
          <Button className="bg-teal-500 text-white hover:bg-teal-600 text-lg px-6 py-3">
            Get In Touch
          </Button>
        </section>
      </main>
    </div>
  );
};

export default UiuxDesignPage;
