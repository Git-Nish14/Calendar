"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Users,
  Clock,
  Share2,
  Star,
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const CalendarLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Calendar className="w-12 h-12 text-indigo-600" />,
      title: "Flexible Views",
      description: "Switch between Day, Week, and Month views seamlessly.",
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: "Event Management",
      description:
        "Drag, drop, and edit events with intuitive sidebar controls.",
    },
    {
      icon: <Clock className="w-12 h-12 text-indigo-600" />,
      title: "Instant Updates",
      description:
        "Live event modifications reflected instantly across devices.",
    },
    {
      icon: <Share2 className="w-12 h-12 text-indigo-600" />,
      title: "Team Collaboration",
      description:
        "Seamlessly share and coordinate schedules with your entire team.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      content:
        "This calendar revolutionized how our team coordinates meetings. The intuitive interface makes scheduling a breeze.",
      rating: 5,
      image: "/testimonial-1.jpg",
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content:
        "The best scheduling tool I've ever used. Simple yet powerful. I can manage multiple clients effortlessly.",
      rating: 4,
      image: "/testimonial-2.jpg",
    },
    {
      name: "Lisa Thompson",
      role: "Event Coordinator",
      content:
        "Planning events has never been easier. A must-have tool for anyone in the events industry!",
      rating: 5,
      image: "/testimonial-3.jpg",
    },
    {
      name: "David Lee",
      role: "Startup Founder",
      content:
        "Incredible UI and seamless sync between devices. This tool has saved our team countless hours of back-and-forth.",
      rating: 4,
      image: "/testimonial-4.jpg",
    },
  ];

  const benefits = [
    "Boost productivity by 30%",
    "Reduce meeting conflicts",
    "Seamless integration with popular tools",
    "Works across all devices",
  ];
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center py-24 md:py-32 bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto text-center px-6 md:px-12 lg:px-20 max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
            Revolutionize Your <span className="text-indigo-200">Schedule</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 md:mb-12 max-w-3xl mx-auto">
            A smart calendar platform designed for modern teams and
            professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signin"
                className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg font-medium hover:bg-gray-50 transition-all"
              >
                Get Started <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/aboutus"
                className="flex items-center justify-center gap-2 bg-indigo-800/40 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-indigo-800/50 transition-all"
              >
                About
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-20 left-0 right-0 h-20 bg-white rounded-t-[50px]"></div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto">
                <Image
                  src="/landing.png"
                  alt="Calendar dashboard preview"
                  width={640}
                  height={480}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Calendar?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              ></motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Scroll Animation */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your schedule effectively
            </p>
          </div>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            ref={servicesRef}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-5 bg-indigo-50 w-16 h-16 rounded-lg items-center mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Scroll Animation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied professionals who have transformed their
            scheduling experience
          </p>
          <div
            className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
            ref={testimonialsRef}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100"
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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Scheduling Experience?
          </h2>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already optimized their
            time management.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/signin"
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg font-medium hover:bg-gray-50 transition-all"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <p>
                    © {new Date().getFullYear()} Calendar App. All rights
                    reserved by Nish Patel.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CalendarLandingPage;
