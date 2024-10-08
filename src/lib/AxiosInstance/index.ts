import axios from "axios";

import { envConfig } from "@/src/config/envConfig";

const axiosInstance = axios.create({
  baseURL: `${envConfig.baseApi}`,
  // timeout: 1000,
  // headers: {}
});

export default axiosInstance;
