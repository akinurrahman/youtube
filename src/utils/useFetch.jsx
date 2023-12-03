import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = `AIzaSyDlTrmu7b3wiFRKykr7pNe1xsyqOX5wnpg`;

const useFetch = (url, params,  dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: responseData } = await axios.get(BASE_URL + url, {
          params: {
            key: API_KEY,
            ...params,
          },
        });

        if (isMounted) {
          setData(responseData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
          setError("Something went wrong!");
          console.error(err);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [...dependencies, url]);

  return { data, loading, error };
};

export default useFetch;
