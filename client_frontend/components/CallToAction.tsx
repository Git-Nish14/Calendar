"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { homeContent } from "@/lib/content/home";

const CallToAction = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-flow opacity-30"></div>
      <div className="absolute top-10 left-1/4 w-24 h-24 rounded-full bg-pink-500 opacity-50 blur-2xl animate-float"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full bg-indigo-500 opacity-40 blur-2xl animate-float"></div>

      <div className="container mx-auto px-4 lg:px-8 text-center flex flex-col items-center justify-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-3xl mx-auto"
        >
          <span className="block text-pink-200">
            {homeContent.ctaHeading1}
          </span>
          <span className="block text-white">
            {homeContent.ctaHeading2}
          </span>
          <span className="block text-indigo-200">
            {homeContent.ctaHeading3}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
        >
          {homeContent.ctaDescription}
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="w-full sm:w-auto"
        >
          <Link
            href={homeContent.ctaActionHref}
            className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-full shadow-lg font-medium hover:bg-gray-100 transition-all hover:shadow-2xl"
          >
            {homeContent.ctaActionLabel}{" "}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
