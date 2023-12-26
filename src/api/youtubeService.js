import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = "AIzaSyDF8Wnqv0vuQH7CSB2G3Dl9KIxMJj3cxvU";

export const youtubeService = createApi({
  reducerPath: "youtubeService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    homeVideos: builder.query({
      query: ({ part, chart, maxResults, regionCode }) => ({
        url: "/videos",
        params: { part, chart, maxResults, regionCode, key: API_KEY },
      }),
    }),
  }),
});

export const { useHomeVideosQuery } = youtubeService;
