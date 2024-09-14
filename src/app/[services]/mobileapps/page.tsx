"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FaMobileAlt, FaShoppingCart, FaCog, FaBolt } from 'react-icons/fa';

const MobileAppDevelopment = () => {
  const cards = [
    { 
      title: 'Responsive Design', 
      description: 'Ensure your app looks great on all devices and screen sizes.',
      icon: <FaMobileAlt className="w-8 h-8 text-blue-500" />
    },
    { 
      title: 'E-commerce Integration', 
      description: 'Build secure and efficient online stores with payment gateway integration.',
      icon: <FaShoppingCart className="w-8 h-8 text-green-500" />
    },
    { 
      title: 'Advanced CMS', 
      description: 'Implement intuitive content management systems for easy updates.',
      icon: <FaCog className="w-8 h-8 text-yellow-500" />
    },
    { 
      title: 'Performance Optimization', 
      description: 'Optimize your app for fast loading times and smooth user experiences.',
      icon: <FaBolt className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 mt-24 text-center">Mobile App Development</h1>
        <p className="text-lg text-gray-300 text-center mb-12">
          Transform your ideas into powerful mobile applications with our expert development services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
                <CardHeader className="flex items-center space-x-4 p-6">
                  {card.icon}
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">{card.title}</CardTitle>
                    <CardDescription className="text-gray-200 mt-1">{card.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="p-4">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Learn More</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDevelopment;
