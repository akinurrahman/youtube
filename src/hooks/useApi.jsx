import axios from "axios";
import {  useState } from "react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = `AIzaSyDF8Wnqv0vuQH7CSB2G3Dl9KIxMJj3cxvU`;

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, params) => {
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
      setError(err);
      console.error(err);
    }
  };

  return { data, loading, error, fetchData };
};

export default useApi;