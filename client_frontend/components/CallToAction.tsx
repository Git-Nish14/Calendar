"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 lg:px-8 text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-3xl mx-auto">
          Ready to Transform Your Scheduling Experience?
        </h2>
        <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have already optimized their time
          management.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Link
            href="/auth/signup"
            className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-full shadow-lg font-medium hover:bg-gray-100 transition-all"
          >
            Get Started <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
