import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseApiResponse<T> {
      data: T | null;
      error: AxiosError | null;
      loading: boolean;
      fetchData: (customBody?: any) => Promise<T | null>;
      refetch: () => Promise<T | null>;
}
//custom api call
export default function useApi<T>(
      endpoint: string,
      method: HTTPMethod = "GET",
      initialBody?: any,
      dependencies: any[] = []
): UseApiResponse<T> {
      const [data, setData] = useState<T | null>(null);
      const [error, setError] = useState<AxiosError | null>(null);
      const [loading, setLoading] = useState(false);

      const fetchData = useCallback(async (customBody?: any): Promise<T | null> => {
            setLoading(true);
            setError(null);
            try {
                  const config: AxiosRequestConfig = {
                        url: endpoint,
                        method: method,
                        //when only non-get reqs 
                        ...(method !== "GET" && (customBody || initialBody) ? {
                              data: customBody || initialBody
                        } : {})
                  };

                  const response: AxiosResponse<T> = await axiosInstance(config);
                  setData(response.data);
                  return response.data;
            } catch (err) {
                  if (err instanceof AxiosError) {
                        setError(err);
                        console.error('API Error:', {
                              status: err.response?.status,
                              message: err.message,
                              data: err.response?.data
                        });
                  } else {
                        const axiosError = new AxiosError(
                              err instanceof Error ? err.message : 'Unknown error occurred'
                        );
                        setError(axiosError);
                        console.error('Unknown error:', err);
                  }
                  return null;
            } finally {
                  setLoading(false);
            }
      }, [endpoint, method, initialBody]);

      //only fetch for GET reqs
      useEffect(() => {
            if (method === 'GET') {
                  fetchData();
            }
      }, [...dependencies, endpoint, method]);

      return {
            data,
            error,
            loading,
            fetchData,
            refetch: fetchData
      };
}