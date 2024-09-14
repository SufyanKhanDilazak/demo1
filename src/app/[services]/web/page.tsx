"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Code, ShoppingCart, FileText, Zap, Monitor, Palette, Globe, Sparkles, Layers, Cloud, Lock, Users } from 'lucide-react';

const CustomWebsiteDevelopment = () => {
  const [activeTab, setActiveTab] = useState('services');

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  const services = [
    { 
      title: 'Responsive Design', 
      content: 'Create websites that adapt seamlessly to all devices, ensuring an optimal user experience.',
      icon: <Monitor className="w-8 h-8 text-blue-400" />,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    { 
      title: 'E-commerce Solutions', 
      content: 'Build robust online stores with secure payment gateways and user-friendly interfaces.',
      icon: <ShoppingCart className="w-8 h-8 text-green-400" />,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
    },
    { 
      title: 'CMS Integration', 
      content: 'Implement intuitive content management systems for easy website updates.',
      icon: <FileText className="w-8 h-8 text-yellow-400" />,
      color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    },
    { 
      title: 'Performance Optimization', 
      content: 'Ensure lightning-fast loading times and smooth user experiences.',
      icon: <Zap className="w-8 h-8 text-red-400" />,
      color: 'bg-gradient-to-br from-red-400 to-red-600',
    },
    {
      title: 'UI/UX Design',
      content: 'Create stunning, user-centric designs with intuitive navigation.',
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    },
    {
      title: 'SEO Optimization',
      content: 'Boost your online visibility with advanced SEO techniques.',
      icon: <Globe className="w-8 h-8 text-indigo-400" />,
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    },
    {
      title: 'Cloud Hosting',
      content: 'Reliable and scalable hosting solutions for your website.',
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      color: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    },
    {
      title: 'Security',
      content: 'Implement robust security measures to protect your website and data.',
      icon: <Lock className="w-8 h-8 text-rose-400" />,
      color: 'bg-gradient-to-br from-rose-400 to-rose-600',
    },
  ];

  const features = [
    { name: 'Custom Design', icon: <Palette />, description: 'Unique designs tailored to your brand' },
    { name: 'Responsive', icon: <Monitor />, description: 'Optimized for all devices' },
    { name: 'SEO-friendly', icon: <Globe />, description: 'Boost your search engine rankings' },
    { name: 'Fast Loading', icon: <Zap />, description: 'Optimized for speed and performance' },
    { name: 'Secure', icon: <Lock />, description: 'Built with security best practices' },
    { name: 'Scalable', icon: <Layers />, description: 'Grows with your business needs' },
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
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} dot={{ fill: '#8884d8', r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Custom Website Development
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Elevate your online presence with our cutting-edge web solutions
          </p>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="flex flex-wrap justify-center bg-gray-800 bg-opacity-50 rounded-xl mb-8 p-2">
            <TabsTrigger value="services" className="px-4 py-2 text-lg">Our Services</TabsTrigger>
            <TabsTrigger value="process" className="px-4 py-2 text-lg">Our Process</TabsTrigger>
            <TabsTrigger value="portfolio" className="px-4 py-2 text-lg">Portfolio</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                >
                  <Card className={`${service.color} hover:shadow-lg transition-all duration-300 border-none`}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl font-semibold text-white">
                        {service.icon}
                        <span className="ml-3">{service.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-100">{service.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="process">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Our Development Process</h3>
                  <ol className="list-decimal list-inside space-y-4 text-gray-200">
                    <li>Initial Consultation and Requirements Gathering</li>
                    <li>Design Mockups and Wireframing</li>
                    <li>Development and Coding</li>
                    <li>Testing and Quality Assurance</li>
                    <li>Deployment and Launch</li>
                    <li>Ongoing Support and Maintenance</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none">
                  <CardHeader>
                    <CardTitle className="text-purple-400">Project Showcase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-200">Check out some of our recent projects:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      <li>E-commerce Platform for Fashion Retailer</li>
                      <li>Corporate Website for Financial Services</li>
                      <li>Portfolio Site for Creative Agency</li>
                      <li>Blog and Content Management System</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-4 text-blue-300">{feature.name}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">Performance Overview</h2>
          {renderChart()}
        </div>
      </div>
    </div>
  );
}

export default CustomWebsiteDevelopment;