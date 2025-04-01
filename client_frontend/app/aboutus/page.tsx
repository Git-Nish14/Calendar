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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6 overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#dbeafe" },
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: "#7c3aed" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1.5, direction: "top", random: true },
            links: {
              enable: true,
              distance: 150,
              color: "#7c3aed",
              opacity: 0.4,
              width: 1,
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 w-full h-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl p-10 bg-white rounded-3xl shadow-2xl backdrop-blur-lg relative z-10 text-center"
      >
        {image && (
          <motion.img
            src={image}
            alt={name}
            className="w-28 h-28 rounded-full object-cover shadow-xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        )}

        <h2 className="text-4xl font-bold text-gray-800 mt-6">{name}</h2>
        <p className="text-lg text-gray-600 mb-6">{role}</p>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">{bio}</p>

        <a
          href={`mailto:${contactEmail}`}
          className="text-blue-600 font-medium underline mb-8 block"
        >
          {contactEmail}
        </a>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-indigo-700 text-white rounded-full shadow-md hover:bg-indigo-800 transition duration-300"
        >
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

const AboutMePage: React.FC = () => {
  return (
    <AboutMe
      name="Nish Patel"
      role="Software Developer"
      bio="I am passionate about building intuitive and powerful web applications. I specialize in modern web technologies such as React, Next.js, and TypeScript. My mission is to create impactful solutions that enhance productivity and user experiences.."
      image="/profile-img.png"
      contactEmail="nishpatel.cse@gmail.com"
    />
  );
};

export default AboutMePage;
