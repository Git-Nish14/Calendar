"use client";
import React from "react";
import Link from "next/link";
import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { footerContent } from "@/lib/content/footer";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-6 bg-white text-gray-700 border-t border-purple-500 relative">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright Text */}
        <div className="w-full md:w-auto text-center md:text-left">
          <p className="text-lg">
            {footerContent.copyright.text1} {new Date().getFullYear()}{" "}
            {footerContent.copyright.text2}{" "}
            <Link
              target="_blank"
              href={footerContent.copyright.ownerLink}
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition-colors font-bold"
            >
              {footerContent.copyright.ownerName}
            </Link>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6">
          <Link
            href={footerContent.socialLinks[0].href}
            target="_blank"
            aria-label="GitHub"
            className="text-gray-700 hover:text-black transition-colors"
          >
            <Github size={24} />
          </Link>
          <Link
            href={footerContent.socialLinks[1].href}
            target="_blank"
            aria-label="LinkedIn"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            <Linkedin size={24} />
          </Link>
          <Link
            href={footerContent.socialLinks[2].href}
            target="_blank"
            aria-label="Instagram"
            className="text-pink-500 hover:text-pink-700 transition-colors"
          >
            <Instagram size={24} />
          </Link>
          <Link
            href={footerContent.socialLinks[3].href}
            aria-label="Contact"
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <Mail size={24} />
          </Link>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className="flex items-center justify-center bg-indigo-600 text-white w-10 h-10 rounded-full hover:bg-indigo-700 transition-colors fixed bottom-4 right-4 md:static"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
