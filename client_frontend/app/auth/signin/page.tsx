"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNIN } from "@/graphql/mutations";
import Cookies from "js-cookie";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  EyeIcon,
  EyeOffIcon,
  CalendarIcon,
  ArrowRightIcon,
  LockIcon,
  MailIcon,
  AlertCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [showPassword, setShowPassword] = useState(false);
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      const response = await signin({
        variables: { email: formData.email, password: formData.password },
      });

      if (response.data) {
        Cookies.set("token", response.data.signin.token, {
          secure: true,
          sameSite: "strict",
        });
        // Show success toast
        toast.success("Successfully signed in! Redirecting...", {
          duration: 3000,
          position: "top-center",
          icon: "🎉",
        });

        // Short delay before redirecting to give toast time to be seen
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Show error toast with specific message if available
      const errorMessage = err.message || "Failed to sign in. Please try again.";
      toast.error(errorMessage, {
        duration: 4000,
        position: "top-center",
        icon: "❌",
      });
    }
  };

  // Show toast for GraphQL errors returned from the mutation
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message || "An error occurred during sign in", {
  //       duration: 4000,
  //       position: "top-center",
  //       icon: "❌",
  //     });
  //   }
  // }, [error]);

  const handleFocus = (field: string) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  // Create a unique pattern for the background
  const [pattern, setPattern] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    const newPattern = [];
    for (let i = 0; i < 30; i++) {
      newPattern.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 8,
      });
    }
    setPattern(newPattern);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
      {/* Toast container */}
      <Toaster />

      {/* Unique background pattern */}
      {pattern.map((dot, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-indigo-500 opacity-10"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, dot.size, dot.size * 0.8, dot.size * 1.2, dot.size],
            opacity: [0, 0.12, 0.08, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Glass layer */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>

      <motion.div
        className="w-full max-w-md mx-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top accent bar */}
        <motion.div
          className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-md"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-b-2xl p-8 relative">
          {/* Decorative shapes */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-600/10 rounded-full blur-xl"></div>

          <div className="relative">
            {/* Logo and header */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CalendarIcon className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  className="absolute -right-3 -bottom-3 w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center shadow-md"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                >
                  <ArrowRightIcon className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              className="text-slate-800 dark:text-white text-2xl font-bold text-center mb-1"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Welcome to Calendo
            </motion.h1>

            <motion.p
              className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm"
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Access your personal calendar and events
            </motion.p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                className="space-y-1.5"
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  Email
                </label>
                <div
                  className={`relative transition-all duration-300 ${formFocus === "email"
                    ? "ring-2 ring-indigo-400 dark:ring-indigo-600 shadow-sm"
                    : ""
                    }`}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ opacity: formFocus === "email" ? 1 : 0.5 }}
                      className="text-indigo-600 dark:text-indigo-400"
                    >
                      <MailIcon className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircleIcon className="w-3 h-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="space-y-1.5"
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <LockIcon className="w-4 h-4" />
                  Password
                </label>
                <div
                  className={`relative transition-all duration-300 ${formFocus === "password"
                    ? "ring-2 ring-indigo-400 dark:ring-indigo-600 shadow-sm"
                    : ""
                    }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    onFocus={() => handleFocus("password")}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircleIcon className="w-3 h-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link
                  href="/forgetpassword"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  className="w-full py-3 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl shadow-indigo-500/20 hover:shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={loading || isSubmitting}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                >
                  {loading || isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            <motion.p
              className="text-slate-600 dark:text-slate-400 text-center text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                Create account
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;