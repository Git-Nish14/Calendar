"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [sunPosition, setSunPosition] = useState(0);
  const [currentDate] = useState(new Date());

  // Days to display in the calendar
  const daysInMonth = Array.from({ length: 35 }, (_, i) => {
    const day = new Date();
    day.setDate(currentDate.getDate() - 17 + i);
    return {
      date: day.getDate(),
      current:
        day.getMonth() === currentDate.getMonth() &&
        day.getDate() === currentDate.getDate(),
      month: day.getMonth() === currentDate.getMonth(),
    };
  });

  useEffect(() => {
    // Start sun animation
    const sunInterval = setInterval(() => {
      setSunPosition((prev) => {
        if (prev >= 100) {
          clearInterval(sunInterval);
          setAnimationComplete(true); // Trigger animation complete state
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(sunInterval);
  }, []);

  useEffect(() => {
    if (animationComplete) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Trigger navigation *outside* the rendering phase
            setTimeout(() => router.push("/"), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [animationComplete, router]);

  // Generate sky color based on sun position
  const getSkyColor = () => {
    if (sunPosition < 25) {
      return "from-indigo-900 via-purple-800 to-pink-700"; // Dawn
    } else if (sunPosition < 50) {
      return "from-blue-500 via-blue-400 to-blue-300"; // Morning
    } else if (sunPosition < 75) {
      return "from-blue-400 via-blue-300 to-yellow-200"; // Day
    } else {
      return "from-orange-500 via-red-600 to-purple-800"; // Sunset
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sky background with sun animation */}
      <div
        className={`w-full h-60 bg-gradient-to-b ${getSkyColor()} relative overflow-hidden rounded-b-3xl`}
      >
        {/* Sun */}
        <div
          className="absolute w-16 h-16 rounded-full bg-yellow-300 shadow-lg shadow-yellow-200"
          style={{
            left: `${sunPosition}%`,
            bottom: `${
              sunPosition < 50 ? sunPosition * 1.5 : (100 - sunPosition) * 1.5
            }%`,
            transform: "translateX(-50%)",
            boxShadow: "0 0 30px 5px rgba(255, 235, 59, 0.7)",
          }}
        />

        {/* Clouds */}
        <div className="absolute top-10 left-1/4 w-24 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 left-1/3 w-32 h-10 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-5 right-1/4 w-20 h-6 bg-white rounded-full opacity-70"></div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Calendar-style 404 display */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Calendar header */}
            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
              <div className="font-bold text-lg">Error 404</div>
              <div className="text-sm opacity-80">Page Not Found</div>
            </div>

            {/* Calendar days header */}
            <div className="grid grid-cols-7 bg-indigo-50 text-indigo-800">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="py-2 text-center text-xs font-semibold">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-px bg-gray-100">
              {daysInMonth.map((day, i) => (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-sm
                    ${!day.month ? "text-gray-400 bg-gray-50" : "bg-white"}
                    ${day.current ? "bg-red-100 text-red-700 font-bold" : ""}
                    ${i === 17 ? "relative bg-indigo-100" : ""}
                  `}
                >
                  {day.date}
                  {i === 17 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-indigo-100 text-2xl font-bold text-indigo-700">
                      404
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="text-center mt-8 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              We couldn't find this page in your schedule
            </h1>
            <p className="text-gray-600">
              The page you're looking for doesn't exist or has been moved to a
              different date.
            </p>

            {animationComplete && (
              <div className="mt-8 space-y-6">
                <div className="text-indigo-700 font-medium">
                  You'll be redirected to the home page in{" "}
                  <span className="font-bold">{countdown}</span> seconds
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors text-center"
                  >
                    Go to Home
                  </Link>
                  <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
