"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp Solutions",
    content:
      "This calendar revolutionized how our team coordinates meetings. The intuitive interface makes scheduling a breeze, and the analytics dashboard provides valuable insights into our productivity patterns.",
    rating: 5,
    image: "/testimonial-1.jpg",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    company: "Independent Consultant",
    content:
      "The best scheduling tool I've ever used. Simple yet powerful. I can manage multiple clients effortlessly, and the time zone converter feature has saved me from countless scheduling mishaps with international clients.",
    rating: 4,
    image: "/testimonial-2.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Event Coordinator",
    company: "Eventful Experiences",
    content:
      "Planning events has never been easier. A must-have tool for anyone in the events industry! The ability to create multiple event templates and share availability with vendors has streamlined my entire workflow.",
    rating: 5,
    image: "/testimonial-3.jpg",
  },
  {
    name: "David Lee",
    role: "Startup Founder",
    company: "InnovateTech",
    content:
      "Incredible UI and seamless sync between devices. This tool has saved our team countless hours of back-and-forth. The integration with our existing project management tools creates a truly unified experience.",
    rating: 4,
    image: "/testimonial-4.jpg",
  },
];

const TestimonialsSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 text-gray-800"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-indigo-600 opacity-60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied professionals who have transformed their
            scheduling experience with our innovative solution
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-1">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-xl">{testimonial.name}</p>
                    <p className="text-gray-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={prevPage}
              className="p-3 rounded-full bg-white shadow-md hover:bg-indigo-50 border border-gray-200 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-700" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === idx
                      ? "bg-indigo-600 w-6"
                      : "bg-gray-300 hover:bg-indigo-300"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="p-3 rounded-full bg-white shadow-md hover:bg-indigo-50 border border-gray-200 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 text-indigo-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
