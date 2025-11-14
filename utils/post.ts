"use server";

import axios from "axios";
const BACKEND_URL = process.env.BACKEND_URL;

export const createPost = async (data: any) => {
  console.log("Creating post with data:", data);
  try {
    const response = await axios.post(`${BACKEND_URL}/posts`, data, {
      headers: { "Content-Type": "application/json",Authorization: `Bearer ${data.token}` },
    });
    console.log("Post creation response:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
      " Post creation failed. Please try again."
    );
  }
};

export const getPostByquery = async (token:any) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/posts`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }
};
export const getPostDetailsById = async (token:any,postId:string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/posts/${postId}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
      "something went wrong. Please try again."
    );
  }
};