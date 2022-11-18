import { useCallback, useState } from "react";
import { getCookie } from "../helperFunctions/HelperFunctions";
function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = useCallback(async (url, configure) => {
    try {
      setIsLoading(true);
      const requestBody = {
        method: configure?.method ?? "GET",
        headers: configure?.headers ?? {
          "Content-Type": "application/json",
        },
        body: configure?.body ?? undefined,
      };
      const token = getCookie("token");
      if (token) {
        requestBody.headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(url, requestBody);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData);
      }

      setIsLoading(false);
      return { data: responseData };
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      return { errorMsg: error.message };
    }
  }, []);

  return {
    sendRequest,
    isLoading,
    error,
  };
}

export default useHttp;
