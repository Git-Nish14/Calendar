"use client";
import React from "react";
import Link from "next/link";
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot Password
        </h1>
        <div className="text-center mb-6">
          <p className="text-gray-600">Feature is not available yet.</p>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
