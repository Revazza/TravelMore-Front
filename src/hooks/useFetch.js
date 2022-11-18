import { useEffect, useState } from "react";
import { getCookie } from "../helperFunctions/HelperFunctions";
function useFetch(url) {
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = getCookie("token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("My Error");
        }

        const responseData = await response.json();
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { error, isLoading, data };
}

export default useFetch;
