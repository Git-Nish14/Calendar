"use client";
import React, { useEffect, useState } from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  color?: string;
  message?: string;
}

const CalendoLoader: React.FC<LoadingProps> = ({
  size = "medium",
  color = "indigo",
  message = "Loading your calendar...",
}) => {
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messages] = useState([
    "Loading your calendar...",
    "Syncing events...",
    "Preparing your schedule...",
    "Almost there...",
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Size mapping for tailwind classes
  const sizeMap = {
    small: {
      container: "w-32 h-32",
      orbs: "w-2 h-2",
      text: "text-xs",
    },
    medium: {
      container: "w-48 h-48",
      orbs: "w-3 h-3",
      text: "text-sm",
    },
    large: {
      container: "w-64 h-64",
      orbs: "w-4 h-4",
      text: "text-base",
    },
  };

  // Color mapping for tailwind classes
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
  };

  const baseColor = colorMap[color as keyof typeof colorMap] || "bg-indigo-500";
  const lightColor = baseColor.replace("500", "300");

  useEffect(() => {
    // Show message after a delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 800);

    // Rotate through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    return () => {
      clearTimeout(messageTimer);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div
        className={`relative ${sizeMap[size].container} flex items-center justify-center`}
      >
        {/* Circular progress track */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-100 opacity-25"></div>

        {/* Circular progress indicator */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
          <circle
            className={`text-${color}-500 transition-all duration-300 ease-in-out`}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
            strokeDasharray="289.027"
            strokeDashoffset={289.027 - (progress / 100) * 289.027}
          />
        </svg>

        {/* Orbiting elements */}
        <div className="absolute w-full h-full animate-spin-slow">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${sizeMap[size].orbs} rounded-full ${
                i % 2 === 0 ? baseColor : lightColor
              }`}
              style={{
                top: `${50 - 35 * Math.sin(i * Math.PI * 0.4)}%`,
                left: `${50 + 35 * Math.cos(i * Math.PI * 0.4)}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ animationDuration: `${1 + i * 0.3}s` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Calendar icon in the center */}
        <div className={`relative ${baseColor} rounded-lg p-2 shadow-lg`}>
          <div className="w-6 h-6 flex flex-col">
            <div className="h-1 w-full bg-white rounded mb-1"></div>
            <div className="flex-1 grid grid-cols-3 gap-px">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white bg-opacity-30 rounded-sm"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-6 text-center">
        <div
          className={`${
            sizeMap[size].text
          } font-medium text-gray-700 transition-opacity duration-300 ${
            showMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[currentMessage]}
        </div>
        <div className="mt-2 flex justify-center gap-1.5">
          <div
            className={`h-1.5 w-6 rounded-full ${
              progress >= 25 ? baseColor : "bg-gray-200"
            } transition-colors duration-300`}
          ></div>
          <div
            className={`h-1.5 w-6 rounded-full ${
              progress >= 50 ? baseColor : "bg-gray-200"
            } transition-colors duration-300`}
          ></div>
          <div
            className={`h-1.5 w-6 rounded-full ${
              progress >= 75 ? baseColor : "bg-gray-200"
            } transition-colors duration-300`}
          ></div>
          <div
            className={`h-1.5 w-6 rounded-full ${
              progress >= 98 ? baseColor : "bg-gray-200"
            } transition-colors duration-300`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CalendoLoader;
