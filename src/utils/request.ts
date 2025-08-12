/**
 * author：钟郑威
 * introduction： axios封装
 */

import axios from "axios";

export const service = axios.create({
  baseURL: "",
  timeout: 5000,
});

//请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = "input you icode";
  return config;
});

//响应拦截器
service.interceptors.response.use((response) => {
  const { success, data, message } = response.data;
  if (success) {
    return data;
  } else {
    return new Promise.reject(new Error(message));
  }
});
