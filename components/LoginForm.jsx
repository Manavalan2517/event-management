"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append domain to the email
    let completeEmail;

    if (email && email.includes("admin")) {
      completeEmail = "admin";
    } else if (email) {
      completeEmail = `${email}@srmist.edu.in`;
    } else {
      // Handle the case when the email is not provided
      completeEmail = null; // Or handle the error accordingly
    }

    try {
      const res = await signIn("credentials", {
        email: completeEmail,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      // Redirect to the appropriate dashboard based on user type
      if (completeEmail === "admin") {
        router.replace("/adminDashboard");
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Login error: ", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="m-5 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-blue-800 text-3xl font-bold text-center mb-2">
          Login Here
        </h2>
        <p className="text-gray-600 text-center mb-6">Enter your details</p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                @srmist.edu.in
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link href="/register" className="text-blue-500 font-semibold pl-1">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
