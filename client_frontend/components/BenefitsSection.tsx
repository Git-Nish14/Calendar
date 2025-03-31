"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Boost productivity by 30%",
  "Reduce meeting conflicts",
  "Seamless integration with popular tools",
  "Works across all devices",
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-full lg:max-w-lg">
              <img
                src="/landing.png"
                alt="Calendar dashboard preview"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              Why Choose Our Calendar?
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-indigo-600 mt-0.5" />
                  <p className="text-lg text-gray-700">{benefit}</p>
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
