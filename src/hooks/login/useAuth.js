"use client";

import { useState } from "react";
import { loginAdmin } from "@/services/auth.service";
import { setToken } from "@/utils/cookies";
import { setStorage } from "@/utils/storage";

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginAdmin({
        email,
        password,
      });

      console.log("LOGIN RESPONSE =>", response);

      const token = response?.data?.access_token;
      const user = response?.data?.user;

      if (token) {
        setToken(token);
      }

      if (user) {
        setStorage("adminUser", user);

        console.log(
          "USER SAVED =>",
          localStorage.getItem("adminUser")
        );
      }

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.log("LOGIN ERROR =>", error);

      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Login Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}