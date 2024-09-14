"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type ServiceCategory = 'marketing' | 'development' | 'design' | 'analytics';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
}

interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
}

// Data
const services: Service[] = [
  { id: 1, title: "Social Media Marketing", description: "Boost your online presence with strategic campaigns.", icon: "📱", category: "marketing" },
  { id: 2, title: "Content Marketing", description: "Engage your audience with valuable, relevant content.", icon: "✍️", category: "marketing" },
  { id: 3, title: "Web Development", description: "Create stunning, responsive websites.", icon: "💻", category: "development" },
  { id: 4, title: "App Development", description: "Bring your ideas to life with custom applications.", icon: "📲", category: "development" },
  { id: 5, title: "3D Animation", description: "Elevate your brand with eye-catching animations.", icon: "🎬", category: "design" },
  { id: 6, title: "UI/UX Design", description: "Craft intuitive and beautiful user experiences.", icon: "🎨", category: "design" },
  { id: 7, title: "Data Analytics", description: "Make data-driven decisions to fuel growth.", icon: "📊", category: "analytics" },
  { id: 8, title: "SEO Optimization", description: "Improve your search rankings and visibility.", icon: "🔍", category: "marketing" },
];

const testimonials: Testimonial[] = [
  { id: 1, name: "John Doe", company: "Tech Innovators", text: "Working with this team has transformed our online presence. Highly recommended!" },
  { id: 2, name: "Jane Smith", company: "Creative Solutions", text: "The app they developed for us has streamlined our operations and delighted our customers." },
  { id: 3, name: "Alex Johnson", company: "Global Reach Inc.", text: "Their marketing strategies have significantly increased our ROI. A game-changer for our business." },
];

// Components
const ServiceCard: React.FC<Service> = ({ title, description, icon }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="text-4xl mb-4"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 360 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold mb-2 text-purple-700">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TestimonialCard: React.FC<Testimonial> = ({ name, company, text }) => (
  <motion.div
    className="bg-purple-100 rounded-lg p-6 shadow-md"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-gray-700 italic mb-4">"{text}"</p>
    <p className="font-bold text-purple-700">{name}</p>
    <p className="text-purple-500">{company}</p>
  </motion.div>
);

const GrowthStrategy: React.FC = () => (
  <div className="bg-purple-700 text-white p-8 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">How We Grow Your Business</h2>
    <ul className="list-disc list-inside">
      <li>Analyze your current market position and identify growth opportunities</li>
      <li>Develop tailored strategies to reach your target audience effectively</li>
      <li>Implement cutting-edge technologies to streamline your operations</li>
      <li>Provide ongoing support and optimization to ensure sustainable growth</li>
    </ul>
  </div>
);

// Main Component
const GrowYourBusinessPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Grow Your Business With Us
        </motion.h1>

        <GrowthStrategy />

        <div className="my-12">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Our Services</h2>
          <div className="flex justify-center space-x-4 mb-8">
            {['all', 'marketing', 'development', 'design', 'analytics'].map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-white text-purple-700' : 'bg-purple-700 text-white'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category as ServiceCategory | 'all')}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <AnimatePresence>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="my-12">
          <h2 className="text-3xl font-bold text-white text-center mb-6">What Our Clients Say</h2>
          <AnimatePresence mode="wait">
            <TestimonialCard key={currentTestimonial} {...testimonials[currentTestimonial]} />
          </AnimatePresence>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="#contact"
            className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full hover:bg-purple-100 transition duration-300"
          >
            Start Growing Today
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default GrowYourBusinessPage;