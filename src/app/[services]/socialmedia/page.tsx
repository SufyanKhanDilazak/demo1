"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Code, ShoppingCart, FileText, Zap, Monitor, Palette, Globe, Sparkles, Layers, Cloud, Lock, Users } from 'lucide-react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

const SocialMediaMarketing = () => {
  const [activeTab, setActiveTab] = useState('strategy');
  const isMobile = useMediaQuery("(max-width: 768px)");

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  const strategies = [
    { 
      title: 'Content Creation', 
      content: 'Develop engaging and relevant content tailored to your audience.',
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      color: 'bg-blue-500',
    },
    { 
      title: 'Social Media Management', 
      content: 'Manage and optimize your social media presence across various platforms.',
      icon: <Users className="w-8 h-8 text-green-400" />,
      color: 'bg-green-500',
    },
    { 
      title: 'Analytics and Reporting', 
      content: 'Track and analyze your social media performance to make data-driven decisions.',
      icon: <LineChart className="w-8 h-8 text-yellow-400" />,
      color: 'bg-yellow-500',
    },
    { 
      title: 'Paid Advertising', 
      content: 'Create and manage targeted ad campaigns to reach your ideal audience.',
      icon: <Zap className="w-8 h-8 text-red-400" />,
      color: 'bg-red-500',
    },
  ];

  const renderChart = () => {
    const data = [
      { name: 'Jan', value: 400 },
      { name: 'Feb', value: 300 },
      { name: 'Mar', value: 600 },
      { name: 'Apr', value: 800 },
      { name: 'May', value: 500 },
      { name: 'Jun', value: 900 },
    ];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Social Media Marketing
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Amplify your brand&apos;s voice and reach with our expert social media strategies
          </p>
        </motion.div>
        
        <Tabs defaultValue="strategy" className="mb-16">
          <TabsList className="flex flex-wrap justify-center bg-gray-90 rounded-xl mb-8 p-2 ">
            <TabsTrigger value="strategy" className="px-4 py-2 text-lg">Marketing Strategies</TabsTrigger>
            <TabsTrigger value="performance" className="px-4 py-2 text-lg">Performance Metrics</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="strategy" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
              {strategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                >
                  <Card className={`${strategy.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl font-semibold">
                        {strategy.icon}
                        <span className="ml-3">{strategy.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{strategy.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="performance">
              <Card className="bg-gray-800 bg-opacity-50">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Marketing Performance</h3>
                  <p className="mb-4">Analyze and optimize your social media performance with detailed reports.</p>
                  {renderChart()}
                </CardContent>
              </Card>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}

export default SocialMediaMarketing;
