import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
interface UseApiResponse<T> {
      data: T | null;
      error: AxiosError | null;
      loading: boolean
      refetch: () => Promise<void>
}
export default function useApi<T>(endpoint: string, method: HTTPMethod = "GET", body?: any, dependencies: any[] = []): UseApiResponse<T> {
      const [data, setData] = useState<T | null>(null);
      const [error, setError] = useState<AxiosError | null>(null)
      const [loading, setLoading] = useState(true)

      const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                  const config: AxiosRequestConfig = {
                        url: endpoint,
                        method: method,
                        data: body
                  }
                  const response: AxiosResponse<T> = await axiosInstance(config)
                  setData(response.data)
            } catch (err) {
                  if (err instanceof AxiosError) {
                        setError(err);
                  } else {
                        console.error('Unknown error:', err);
                        setError(new AxiosError('Unknown error occurred'));
                  }
            }
            finally {
                  setLoading(false)
            }
      }
      useEffect(() => {
            fetchData()
      }, [endpoint, method, JSON.stringify(body), ...dependencies])

      return { data, error, loading, refetch: fetchData }

}