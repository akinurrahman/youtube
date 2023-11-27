import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = `AIzaSyBq4KaPAVnuz9TityDTLEs_3CwewQUQSEk`;

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

