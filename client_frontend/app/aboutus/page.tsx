"use client";

import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface AboutMeProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  contactEmail: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  name,
  role,
  bio,
  image,
  contactEmail,
}) => {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-6 overflow-hidden">
      {/* Live Animated Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#f3f4f6" },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#00b5b8" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.5, direction: "top", random: true },
            links: {
              enable: true,
              distance: 150,
              color: "#00b5b8",
              opacity: 0.4,
              width: 1,
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full"
      />

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl backdrop-blur-lg relative z-10"
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          {image && (
            <motion.img
              src={image}
              alt={name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          )}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 mt-4"
          >
            {name}
          </motion.h2>
          <p className="text-lg text-gray-600">{role}</p>
        </div>

        {/* Bio Section */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-600 text-center mt-6"
        >
          {bio}
        </motion.p>

        {/* Contact Section */}
        <h3 className="text-2xl font-semibold text-gray-700 text-center mt-6">
          Contact Me
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600 text-center mt-2"
        >
          Feel free to reach out at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-[#00b5b8] font-medium underline"
          >
            {contactEmail}
          </a>
          .
        </motion.p>

        {/* Back to Home Button */}
        <div className="text-center mt-6">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 text-white bg-[#00b5b8] rounded-lg hover:bg-[#369A9A] transition duration-300 shadow-md"
          >
            Back to Home
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

// Example usage
const AboutMePage: React.FC = () => {
  return (
    <AboutMe
      name="Nish Patel"
      role="Software Developer & Tech Enthusiast"
      bio="I am passionate about building intuitive and powerful web applications. I specialize in modern web technologies such as React, Next.js, and TypeScript. My mission is to create impactful solutions that enhance productivity and user experiences."
      image="/Nish.jpg"
      contactEmail="nishpatel.cse@gmail.com"
    />
  );
};

export default AboutMePage;
