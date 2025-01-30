"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { SIGNUP } from "@/app/graphql/mutations";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = async (formData: SignupFormInputs) => {
    try {
      const response = await signup({
        variables: formData,
      });

      if (response.data) {
        Cookies.set("token", response.data.signup.token, {
          secure: true,
          sameSite: "strict",
        });
        setSuccessMessage("Account created successfully");
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/home");
      }, 0);
    }
  }, [successMessage, router]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center bg-[#2D4D59]">
        <img
          src="/image_signup.jpg"
          alt="Signup Calendar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center p-10 shadow-lg">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome to Calendo! Create Account
          </h2>

          {loading && <p className="text-blue-500 text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error.message}</p>}
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
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
                className="absolute right-3 top-2.5 text-gray-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
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
              {loading ? "Signing Up..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-800 mt-4">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-900 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
