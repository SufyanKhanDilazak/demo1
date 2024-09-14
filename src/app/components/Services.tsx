"use client";

import React, { useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Galaxy = lazy(() => import("./Neb"));

interface Service {
  title: string;
  slug: string;
}

const services: Service[] = [
  { title: "Website Development", slug: "web" },
  { title: "Mobile Apps", slug: "mobileapps" },
  { title: "Social Media Marketing", slug: "socialmedia" },
  { title: "3D Product Videos", slug: "3d" },
  { title: "UI/UX Design", slug: "uiuxdesign" },
  { title: "Grow Your Business", slug: "growyourbusiness" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ServiceCard: React.FC<{ service: Service; index: number }> = React.memo(({ service, index }) => (
  <Link href={`/services/${service.slug}`} passHref prefetch={false}>
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{
        scale: 1.1,
        rotateX: -10,
        rotateY: 10,
        boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
        transition: { type: "spring", stiffness: 200, damping: 15 },
      }}
      whileTap={{
        scale: 0.95,
        rotateX: -5,
        rotateY: 5,
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.15)",
      }}
      className="cursor-pointer h-full flex justify-center items-center"
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-yellow-700 via-black to-[#310047] text-white p-4 sm:p-6 rounded-full shadow-lg flex items-center justify-center transform perspective-1000">
        <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold text-center">
          {service.title}
        </h3>
      </div>
    </motion.div>
  </Link>
));

ServiceCard.displayName = "ServiceCard";

const ServicesSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const memoizedServices = useMemo(
    () => services.map((service, index) => <ServiceCard key={service.slug} service={service} index={index} />),
    []
  );

  return (
    <section className="relative z-10 sm:mt-15 md:mt-24 py-1 sm:py-16 md:py-20">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black " />}>
          <Galaxy />
        </Suspense>
      </div>

      <motion.div
        id="services"
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-12 mt-20 sm:mt-1">Services</h1>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-2 gap-8 md:gap-10 lg:gap-10 justify-items-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="hidden"
          >
            {memoizedServices}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default React.memo(ServicesSection);