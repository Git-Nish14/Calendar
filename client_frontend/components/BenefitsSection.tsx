"use client";
import React, { useState } from "react";
import { CheckCircle, Zap, Smartphone, Lock } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { benefitsContent } from "@/lib/content/benefit";

const benefits = [
  {
    text: benefitsContent.benefits[0].text,
    icon: Zap,
    description: benefitsContent.benefits[0].description,
  },
  {
    text: benefitsContent.benefits[1].text,
    icon: Smartphone,
    description: benefitsContent.benefits[1].description,
  },
  {
    text: benefitsContent.benefits[2].text,
    icon: Lock,
    description: benefitsContent.benefits[2].description,
  },
];

const BenefitsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section
      ref={ref}
      className="min-h-screen py-16 md:py-28 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Image Section */}
          <div
            className={`w-full lg:w-1/2 flex justify-center transition-all duration-700 ${
              inView ? "opacity-100" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-60"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-full lg:max-w-lg border border-gray-100 z-10">
                <img
                  src={benefitsContent.image.src}
                  alt={benefitsContent.image.alt}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 to-transparent"></div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                  <span className="text-sm font-semibold text-indigo-700">
                    {benefitsContent.image.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium text-sm mb-4">
              {benefitsContent.section.subtitle}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">
              {benefitsContent.section.title}
            </h2>

            <p className="text-gray-600 mb-8 text-lg">
              {benefitsContent.section.description}
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 delay-${
                    index * 200
                  } ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                      activeIndex === index ? "bg-indigo-50" : ""
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl ${
                        activeIndex === index
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-600"
                      } transition-colors`}
                    >
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-800 mb-2">
                        {benefit.text}
                      </p>

                      {/* Static description for small screens */}
                      <p className="text-gray-600 block sm:hidden">
                        {benefit.description}
                      </p>

                      {/* Interactive description for larger screens */}
                      <div className="hidden sm:block h-16 overflow-hidden">
                        <p
                          className={`text-gray-600 transition-all ${
                            activeIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
