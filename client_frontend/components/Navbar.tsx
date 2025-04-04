"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { navbarContent } from "@/lib/content/navbar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Track scroll position for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close navbar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest("#navbar-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    {
      name: navbarContent.navLinks[0].name,
      href: navbarContent.navLinks[0].href,
    },
    {
      name: navbarContent.navLinks[1].name,
      href: navbarContent.navLinks[1].href,
    },
    {
      name: navbarContent.navLinks[2].name,
      href: navbarContent.navLinks[2].href,
    },
    {
      name: navbarContent.navLinks[3].name,
      href: navbarContent.navLinks[3].href,
    },
  ];

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      id="navbar-container"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 ${
        scrolled
          ? "bg-white text-gray-800 shadow-lg py-2"
          : "bg-transparent text-white py-4"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={navbarContent.logo.href} className="flex items-center">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="text-indigo-600 mr-2"
          >
            <Calendar
              className={`w-6 h-6 ${
                scrolled ? "text-indigo-600" : "text-white"
              }`}
            />
          </motion.div>
          <motion.span
            className={`text-xl font-bold ${
              scrolled ? "text-indigo-600" : "text-white"
            }`}
            whileHover={{ letterSpacing: "0.05em" }}
            transition={{ duration: 0.2 }}
          >
            {navbarContent.logo.name}
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              <motion.div
                onHoverStart={() => setHoveredLink(link.name)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`text-md font-medium relative ${
                    scrolled
                      ? "text-gray-700 hover:text-indigo-600"
                      : "text-white hover:text-indigo-200"
                  } transition-colors`}
                >
                  {link.name}
                </Link>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredLink === link.name ? "100%" : 0,
                  }}
                  className={`absolute bottom-0 left-0 h-0.5 ${
                    scrolled ? "bg-indigo-600" : "bg-white"
                  }`}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>
          ))}
          <Link href="/auth/signin" className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                scrolled
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              } px-4 py-2 rounded-lg font-medium`}
            >
              {navbarContent.buttons.signIn.text}
            </motion.button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg ${
              scrolled ? "text-indigo-600" : "text-white"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeNavbar}
                    className="block py-3 text-gray-800 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="border-b border-gray-100" />
                  )}
                </motion.div>
              ))}
              <Link href="/auth/signin">
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-medium"
                >
                  {navbarContent.buttons.signIn.text}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
