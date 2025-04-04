"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactContent } from "@/lib/content/contact";

const Contact: React.FC = () => {
  const [result, setResult] = useState("");
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const response = await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (resData.success) {
      setResult("✅ Message sent successfully!");
      form.reset();
    } else {
      console.error("Error:", resData);
      setResult("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-6 pb-0 text-white">
        <Navbar />
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-gray-900">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-indigo-600 mb-2">
              {contactContent.section.subtitle}
            </h4>
            <h2 className="text-4xl font-bold text-indigo-700 mb-4">
              {contactContent.section.title}
            </h2>
            <p className="text-gray-700 mb-8">
              {contactContent.section.description}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="p-4 border border-gray-300 rounded-lg focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="p-4 border border-gray-300 rounded-lg focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-md hover:bg-indigo-800 transition"
            >
              {contactContent.form.button.text}{" "}
              <ArrowRight className="inline ml-2" size={18} />
            </motion.button>
          </form>

          {result && (
            <div className="text-center mt-6 space-y-4">
              <p className="text-sm text-indigo-700 font-medium">{result}</p>
              {result.includes("✅") && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/")} // Redirects to home page
                  className="w-full md:w-auto px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full shadow-md hover:bg-indigo-800 transition"
                >
                  {contactContent.redirect.success.text}
                </motion.button>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
