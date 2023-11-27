import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = `AIzaSyCVke47M1LNOqWrM4TPgV_zMs8dSP0tHjs`;

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params: {
        key: API_KEY,
        ...params,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

