import { envConfig } from "@/src/config/envConfig";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${envConfig.baseApi}`,
  // timeout: 1000,
  // headers: {}
})

export default axiosInstance;