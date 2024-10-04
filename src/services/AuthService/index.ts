"use server"

import axiosInstance from "@/src/lib/AxiosInstance"
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

  } catch (error: any) {
    throw new Error(error)
  }
}