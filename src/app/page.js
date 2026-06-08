"use client";

import { useState } from "react";
import useAuth from "@/hooks/login/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email || !password) {
      setMessage(
        "Please enter email and password"
      );
      setMessageType("error");
      return;
    }

    const response = await login(
      email,
      password
    );

    if (response.success) {
      setMessage("Login Successful");
      setMessageType("success");

      setTimeout(() => {
        window.location.href =
          "/dashboard";
      }, 100);
    } else {
      setMessage(
        response.message ||
          "Invalid email or password"
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4ff] px-4">
      <div className="w-full max-w-md bg-slate-100 rounded-3xl shadow-xl p-8">
        <div className="text-center mb-1">
          <div className="w-15 h-15 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center">
            <span className="text-5xl">☤</span>
          </div>

          <h1 className="text-3xl font-bold text-[#1e3a8a] mt-4">
            Surgical World
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Login
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-3"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-2 px-4 py-2 border border-blue-100 rounded-xl outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-2 px-4 py-2 border border-blue-100 rounded-xl outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-blue-600"
            >
              Forgot?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {message && (
            <div
              className={`text-center text-sm font-medium ${
                messageType === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}