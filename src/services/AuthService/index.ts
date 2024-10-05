"use server"

import axiosInstance from "@/src/lib/AxiosInstance"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/auth/register", userData)
    const data = res.data;

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreashToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error)
  }
}

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/auth/login", userData)
    const data = res.data;

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreashToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error)
  }
}

export const logOutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreashToken");
}

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken)
    // console.log(decodedToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
    }
  };

  return decodedToken;
}