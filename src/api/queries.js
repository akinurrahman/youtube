import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getYouTubeData = async ({ endpoint, queryParams }) => {
  const res = await axios.get(`${BASE_URL}${endpoint}`, {
    params: {
      key: API_KEY,
      ...queryParams,
    },
  });
  return res.data;
};
