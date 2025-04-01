"use client";
import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-6 bg-white text-gray-700 border-t border-gray-200 relative">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between relative gap-4">
        {/* Copyright Text - Centered */}
        <div className="w-full md:w-auto text-center md:text-left">
          <p className="text-lg">
            © {new Date().getFullYear()} Calendar App. All rights reserved by{" "}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/nishpatel14"
              className="text-purple-600 hover:text-purple-800 transition-colors font-bold"
            >
              Nish Patel
            </Link>
            .
          </p>
        </div>

        {/* Contact Link */}
        <div className="w-full md:w-auto text-center md:text-right">
          <Link
            href="/contact"
            className="text-indigo-600 hover:text-indigo-800 transition-colors font-bold"
          >
            Contact Us
          </Link>
        </div>

        {/* Scroll to Top Button - Bottom Positioned for Mobile */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="flex items-center justify-center bg-indigo-600 text-white w-10 h-10 rounded-full hover:bg-indigo-700 transition-colors fixed bottom-4 right-4 md:static md:mr-0"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
