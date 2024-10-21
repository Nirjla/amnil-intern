import axios, { AxiosError, AxiosResponse } from "axios";
import { getLocalStorage } from "../helpers/helpers";
const axiosInstance = axios.create({
      baseURL: 'http://localhost:5001/api',
      timeout: 10000,
      headers: {
            'Content-Type': 'application/json'
      }
})
//Request interceptor
axiosInstance.interceptors.request.use((config) => {
      console.log("config", config)
      const token = getLocalStorage('user')?.token;
      console.log("token", token)
      if (token) {
            config.headers.Authorization = `Bearer ${token}`
      }
      return config
}, (error: AxiosError) => {
      return Promise.reject(error)
})

//response interceptor
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response;
}, (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
            console.error("Unauthorized");
            window.location.href = '/login';
      }
      return Promise.reject(error);

});

export default axiosInstance