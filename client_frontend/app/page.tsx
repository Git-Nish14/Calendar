"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  Users,
  Clock,
  Share2,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const CalendarLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-blue-500" />,
      title: "Flexible Views",
      description: "Switch between Day, Week, and Month views seamlessly.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Event Management",
      description:
        "Drag, drop, and edit events with intuitive sidebar controls.",
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Instant Updates",
      description:
        "Live event modifications reflected instantly across devices.",
    },
    {
      icon: <Share2 className="w-12 h-12 text-blue-500" />,
      title: "About",
      description:
        "Empowering teams and individuals with real-time scheduling.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content:
        "This calendar revolutionized how our team coordinates meetings.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content: "The best scheduling tool I've ever used. Simple yet powerful.",
      rating: 4.5,
    },
    {
      name: "Lisa Thompson",
      role: "Event Coordinator",
      content: "Planning events has never been easier. A must-have tool!",
      rating: 5,
    },
    {
      name: "David Lee",
      role: "Startup Founder",
      content: "Incredible UI and seamless sync between devices. Love it!",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 transition-opacity duration-500">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center py-32 bg-gradient-to-br from-blue-200 to-blue-500 text-white"
      >
        <div className="text-center px-6 sm:px-12 lg:px-20 max-w-5xl">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8">
            Revolutionize Your <span className="text-blue-100">Schedule</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto">
            A smart calendar platform for seamless scheduling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="/auth/signin"
              className="flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="/aboutus"
              className="flex items-center justify-center gap-3 bg-blue-700/30 text-white px-8 py-4 rounded-full"
            >
              About Us
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Features Section with Scroll Animation */}
      <section className="container px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section with Scroll Animation */}
      <section className="bg-blue-50 py-24">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-gray-600">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarLandingPage;
