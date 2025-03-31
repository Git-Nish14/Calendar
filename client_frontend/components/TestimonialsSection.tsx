"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    content:
      "This calendar revolutionized how our team coordinates meetings. The intuitive interface makes scheduling a breeze.",
    rating: 5,
    image: "/testimonial-1.jpg",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    content:
      "The best scheduling tool I've ever used. Simple yet powerful. I can manage multiple clients effortlessly.",
    rating: 4,
    image: "/testimonial-2.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Event Coordinator",
    content:
      "Planning events has never been easier. A must-have tool for anyone in the events industry!",
    rating: 5,
    image: "/testimonial-3.jpg",
  },
  {
    name: "David Lee",
    role: "Startup Founder",
    content:
      "Incredible UI and seamless sync between devices. This tool has saved our team countless hours of back-and-forth.",
    rating: 4,
    image: "/testimonial-4.jpg",
  },
];

const TestimonialsSection = () => {
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied professionals who have transformed their
          scheduling experience
        </p>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8"
          ref={testimonialsRef}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="flex items-center mb-4 gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-600">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-xl">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
