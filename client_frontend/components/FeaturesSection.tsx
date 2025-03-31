"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, Share2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: <Calendar className="w-8 h-8 text-indigo-600" />,
    title: "Flexible Views",
    description: "Switch between Day, Week, and Month views seamlessly.",
  },
  {
    icon: <Users className="w-8 h-8 text-indigo-600" />,
    title: "Event Management",
    description: "Drag, drop, and edit events with intuitive sidebar controls.",
  },
  {
    icon: <Clock className="w-8 h-8 text-indigo-600" />,
    title: "Instant Updates",
    description: "Live event modifications reflected instantly across devices.",
  },
  {
    icon: <Share2 className="w-8 h-8 text-indigo-600" />,
    title: "Team Collaboration",
    description:
      "Seamlessly share and coordinate schedules with your entire team.",
  },
];

const FeaturesSection = () => {
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Everything you need to manage your schedule effectively
          </p>
        </div>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          ref={servicesRef}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white text-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4 bg-indigo-100 w-12 h-12 rounded-full items-center mx-auto">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {service.title}
              </h3>
              <p className="text-center text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
