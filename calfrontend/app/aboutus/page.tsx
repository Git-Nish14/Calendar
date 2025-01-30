"use client";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Welcome to <span className="text-[#00b5b8] font-semibold">Calendo</span>, where organization meets innovation. 
          We are a passionate team dedicated to transforming the way individuals and businesses 
          manage their schedules, tasks, and goals. Our mission is to provide a seamless, 
          intuitive, and powerful calendar solution that enhances productivity and collaboration.
        </p>
        <h3 className="text-xl font-semibold text-gray-700 mt-6">Our Mission</h3>
        <p className="text-gray-600 mt-2">
          At Calendo, our mission is simple: to empower people and teams with a calendar solution 
          that helps them make the most of their time. We believe that effective time management 
          is the cornerstone of success.
        </p>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">Our Values</h3>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
          <li><span className="font-semibold text-[#00b5b8]">Innovation:</span> We constantly strive to improve and bring cutting-edge solutions.</li>
          <li><span className="font-semibold text-[#00b5b8]">Simplicity:</span> Our focus is on creating an intuitive and easy-to-use platform.</li>
          <li><span className="font-semibold text-[#00b5b8]">Customer-Centricity:</span> Your feedback shapes our development.</li>
          <li><span className="font-semibold text-[#00b5b8]">Collaboration:</span> We believe teamwork is key to success.</li>
          <li><span className="font-semibold text-[#00b5b8]">Trust:</span> Security, reliability, and transparency are at the core of our operations.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-700 mt-6">Contact Us</h3>
        <p className="text-gray-600 mt-2">
          Have questions? Reach out to us at{" "}
          <a href="mailto:support@calendo.com" className="text-[#00b5b8] font-medium underline">
            support@calendo.com
          </a>
          .
        </p>

        <div className="text-center mt-6">
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-[#00b5b8] rounded-lg hover:bg-[#369A9A] transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;