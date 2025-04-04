"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Calendar, Clock, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { aboutContent, timeline, founders } from "@/lib/content/about";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  year,
  title,
  description,
  icon,
  position,
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={itemRef}
      className={`flex w-full mb-16 ${position === "right" ? "justify-start" : "justify-end"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, x: position === "left" ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full md:w-5/12 ${position === "right" ? "md:ml-10" : "md:mr-10"
          }`}
      >
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mr-4">
              {icon}
            </div>
            <div>
              <span className="block text-sm font-semibold text-indigo-600">
                {year}
              </span>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const AboutUs: React.FC = () => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true });
  const missionInView = useInView(missionRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 pt-20 pb-10 overflow-hidden">
        <Navbar />
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            particles: {
              number: { value: 40, density: { enable: true, area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.3, random: true },
              size: { value: 3, random: true },
              move: { enable: true, speed: 1, direction: "top", random: true },
              links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1,
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 w-full h-full"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div ref={headerRef} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-full mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {aboutContent.headerTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                {aboutContent.headerSubtitle}
              </p>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <div className="relative max-w-6xl mx-auto mb-24">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/30"></div>

            {/* Timeline Items */}
            <TimelineItem
              year={timeline[0].year}
              title={timeline[0].title}
              description={timeline[0].description}
              icon={<Clock className="w-5 h-5" />}
              position="left"
            />

            <TimelineItem
              year={timeline[1].year}
              title={timeline[1].title}
              description={timeline[1].description}
              icon={<Users className="w-5 h-5" />}
              position="right"
            />

            <TimelineItem
              year={timeline[2].year}
              title={timeline[2].title}
              description={timeline[2].description}
              icon={<Zap className="w-5 h-5" />}
              position="left"
            />

            <TimelineItem
              year={timeline[3].year}
              title={timeline[3].title}
              description={timeline[3].description}
              icon={<Calendar className="w-5 h-5" />}
              position="right"
            />
          </div>

          {/* Mission Section */}
          <div ref={missionRef} className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {aboutContent.missionTitle}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {aboutContent.missionDescription1}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {aboutContent.missionDescription2}
              </p>
            </motion.div>
          </div>

          {/* Team Section */}
          <div ref={teamRef} className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  {aboutContent.teamTitle}
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* First Founder */}
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden shadow-lg">
                      <img
                        src={founders[0].image}
                        alt="Nish Patel"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            founders[0].fallbackImage;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {founders[0].name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {founders[0].role}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {founders[0].description}
                    </p>
                    <a
                      href="mailto:nishpatel.cse@gmail.com"
                      className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
                    >
                      {founders[0].email}
                    </a>
                  </div>

                  {/* Second Founder */}
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden shadow-lg">
                      <img
                        src={founders[1].image}
                        alt="Om Patel"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            founders[1].fallbackImage;
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {founders[1].name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {founders[1].role}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {founders[1].description}
                    </p>
                    <a
                      href="mailto:alex.rivera@calendo.com"
                      className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
                    >
                      {founders[1].email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center"
          >
            <Link
              href={aboutContent.ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 rounded-full shadow-lg font-medium hover:bg-gray-100 transition-all"
            >
              {aboutContent.ctaButtonText}{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
