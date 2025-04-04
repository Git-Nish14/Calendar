"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { featureContent } from "@/lib/content/feature";
import {
  Calendar,
  Users,
  Zap,
  Lock,
  Repeat,
  Clock,
  ArrowRight,
  Layout,
  ChevronRight,
  MousePointer,
  Move,
  Calendar as CalendarIcon,
  Shield,
  Smartphone,
  Sidebar,
  Search,
  User,
  Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg inline-block mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Feature Section Component with Image
const FeatureSection = ({
  title,
  description,
  image,
  features,
  isReversed,
  delay,
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay * 0.2 }}
      className="grid md:grid-cols-2 gap-8 items-center py-12"
    >
      <div className={`${isReversed ? "md:order-2" : ""}`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <ChevronRight className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${isReversed ? "md:order-1" : ""}`}>
        <div className="bg-indigo-50 rounded-xl p-4 shadow-lg">
          <img
            src={image}
            alt={title}
            className="rounded-lg w-full shadow-md"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Highlight Card Component
const HighlightCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-600">
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main Features Page Component
const FeaturesPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative bg-gradient-to-br from-indigo-600 to-purple-700 py-20 px-4 overflow-hidden"
      >
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-indigo-300/10 rounded-full blur-xl"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Features That{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
                Transform Scheduling
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Explore how Calendo's intuitive design and powerful functionality
              makes calendar management effortless and efficient.
            </p>
          </motion.div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-white rounded-t-[50px]"></div>
      </div>

      {/* Highlight Features */}
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <HighlightCard
            icon={<Zap className="w-8 h-8" />}
            title="Boost productivity by 30%"
            description="Our intelligent algorithms optimize your schedule for deep work and minimize interruptions"
          />
          <HighlightCard
            icon={<Smartphone className="w-8 h-8" />}
            title="Works across all devices"
            description="Seamless experience on desktop, tablet, and mobile with real-time synchronization"
          />
          <HighlightCard
            icon={<Shield className="w-8 h-8" />}
            title="Data Secure with Us"
            description="Enterprise-grade encryption and compliance with global data protection standards"
          />
        </div>
      </div>

      {/* Core Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Core Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the powerful capabilities that make Calendo the ultimate
            scheduling solution for professionals and teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<User className="w-6 h-6" />}
            title="User Authentication"
            description="Secure account creation, login, and session-based authentication with protected routes for your calendar data."
            delay={0}
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="Flexible Calendar Views"
            description="Switch between day, week, and month views with a 'Today' button for easy navigation to the current date."
            delay={1}
          />
          <FeatureCard
            icon={<MousePointer className="w-6 h-6" />}
            title="Intuitive Event Creation"
            description="Create events by simply dragging over a date range, with instant visual feedback on the calendar."
            delay={2}
          />
          <FeatureCard
            icon={<Move className="w-6 h-6" />}
            title="Drag & Drop Events"
            description="Easily reschedule by dragging events to new dates with real-time updates in the sidebar."
            delay={3}
          />
          <FeatureCard
            icon={<Sidebar className="w-6 h-6" />}
            title="Detailed Sidebar"
            description="Manage event details with an intuitive sidebar showing title, date range, and additional information."
            delay={4}
          />
          <FeatureCard
            icon={<CalendarIcon className="w-6 h-6" />}
            title="Date Management"
            description="Convenient popup calendars for selecting start and end dates when creating or editing events."
            delay={5}
          />
        </div>
      </div>

      {/* Detailed Feature Sections */}
      <div className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Feature Deep Dive
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a closer look at how Calendo's features work together to
              create a seamless scheduling experience.
            </p>
          </div>

          <div className="space-y-16">
            <FeatureSection
              title="Secure User Authentication"
              description="Keep your calendar data safe with our robust authentication system."
              image="/api/placeholder/600/400"
              features={[
                "Create a new account with secure password hashing",
                "Session-based authentication with secure cookies",
                "Protected routes accessible only to authenticated users",
                "Automatic session management for seamless user experience",
              ]}
              isReversed={false}
              delay={0}
            />

            <FeatureSection
              title="Flexible Calendar Interface"
              description="Navigate and visualize your schedule exactly how you want it."
              image="/api/placeholder/600/400"
              features={[
                "Toggle between Day, Week, and Month views with a single click",
                "Today button for instant navigation to current date",
                "Visual highlighting of today's date for easy reference",
                "Clean, intuitive interface that prioritizes your events",
              ]}
              isReversed={true}
              delay={1}
            />

            <FeatureSection
              title="Intuitive Event Management"
              description="Create and manage events with natural, drag-based interactions."
              image="/api/placeholder/600/400"
              features={[
                "Create events by dragging across date ranges on the calendar",
                "See instant visual feedback as you select dates",
                "Event titles update in real-time on the calendar",
                "Events visually span their full date range for clear visualization",
              ]}
              isReversed={false}
              delay={2}
            />

            <FeatureSection
              title="Drag & Drop Rescheduling"
              description="Effortlessly adjust your schedule with intuitive drag and drop."
              image="/api/placeholder/600/400"
              features={[
                "Drag events to new date ranges to reschedule",
                "Update event details with simple interactions",
                "See date changes reflected instantly in the sidebar",
                "Natural, friction-free rescheduling experience",
              ]}
              isReversed={true}
              delay={3}
            />

            <FeatureSection
              title="Detailed Event Sidebar"
              description="Manage all your event details in one convenient place."
              image="/api/placeholder/600/400"
              features={[
                "Edit event titles with real-time calendar updates",
                "Manage start and end dates with popup calendars",
                "Add additional event information and details",
                "Quick access to all event properties in one sidebar",
              ]}
              isReversed={false}
              delay={4}
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How Calendo Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience an intuitive workflow designed around how you actually
            plan your schedule.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>

            {/* Steps */}
            <div className="space-y-12">
              {[
                {
                  icon: <User className="w-6 h-6" />,
                  title: "Sign In Securely",
                  description:
                    "Access your personal calendar with secure authentication that protects your schedule and information.",
                },
                {
                  icon: <Calendar className="w-6 h-6" />,
                  title: "Choose Your View",
                  description:
                    "Select between Day, Week, or Month views to focus on exactly what you need to see.",
                },
                {
                  icon: <MousePointer className="w-6 h-6" />,
                  title: "Create Events Effortlessly",
                  description:
                    "Simply drag across dates to create new events, with instant visual feedback on your calendar.",
                },
                {
                  icon: <Sidebar className="w-6 h-6" />,
                  title: "Edit Details in the Sidebar",
                  description:
                    "Add titles, adjust dates with popup calendars, and manage all event details in one place.",
                },
                {
                  icon: <Move className="w-6 h-6" />,
                  title: "Easily Reschedule",
                  description:
                    "Drag and drop events to new dates when your plans change, with real-time updates.",
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full p-2 relative z-10">
                    {step.icon}
                  </div>
                  <div className="ml-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Scheduling?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of professionals who have switched to Calendo for a
            more intuitive, flexible calendar experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signin"
                className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition-all w-full"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
