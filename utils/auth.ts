"use server";

import axios from "axios";
const BACKEND_URL = process.env.BACKEND_URL;

export const loginApi = async (data: any) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Login failed. Please try again."
    );
  }
};

export const registerApi = async (data: any) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Registration failed. Please try again."
    );
  }
};
