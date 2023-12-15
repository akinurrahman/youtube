import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = `AIzaSyDlTrmu7b3wiFRKykr7pNe1xsyqOX5wnpg`;

const useFetch = (url, params, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

        setData(responseData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Something went wrong!");
        console.error(err);
      }
    };

    fetchData();
  }, [...dependencies, url]);

  return { data, loading, error };
};

export default useFetch;
