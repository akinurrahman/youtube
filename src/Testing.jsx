import React, { useEffect } from "react";
import useApi from "./hooks/useApi";

const Testing = () => {
  const { fetchData, data } = useApi();
  useEffect(() => {
    const url = "channels";
    const params = {
      part: "snippet,statistics",
      id: "UCA7gwgLgmCZ8DSmdf2bhb8g",
    };
    fetchData(url, params);
  }, []);
  return <div></div>;
};

export default Testing;
