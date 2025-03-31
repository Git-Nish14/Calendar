"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex items-center justify-center py-20 md:py-28 bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden"
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Revolutionize Your <span className="text-indigo-200">Schedule</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 md:mb-12 max-w-4xl mx-auto">
          A smart calendar platform designed for modern teams and professionals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/signin"
              className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-5 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition-all"
            >
              Get Started <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/aboutus"
              className="flex items-center justify-center gap-2 bg-indigo-800/40 backdrop-blur-sm text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 rounded-lg font-medium hover:bg-indigo-800/50 transition-all"
            >
              About
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute -bottom-16 left-0 right-0 h-20 bg-white rounded-t-[50px]"></div>
    </motion.section>
  );
};

export default HeroSection;
