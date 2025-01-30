"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNIN } from "../../graphql/mutations";
import Cookies from "js-cookie";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/protected/home");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      console.log("Login Data:", formData);
      const response = await signin({
        variables: { email: formData.email, password: formData.password },
      });

      if (response.data) {
        console.log("Login Response:", response.data.signin.token);
        Cookies.set("token", response.data.signin.token, {
          secure: true,
          sameSite: "strict",
        });
        setSuccessMessage("You are successfully logged in!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/protected/home");
      }, 0);
    }
  }, [successMessage, router]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center bg-[#2D4D59]">
        <img
          src="/image_signup.jpg"
          alt="Login Calendar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#2D4D59] mb-6">
            Welcome Back! Log in to Your Account
          </h2>

          {loading && <p className="text-blue-500 text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error.message}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-400 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-[#2D4D59] mt-4">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-900 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
