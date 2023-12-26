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
    channelInfo: builder.query({
      query: ({ part, id }) => ({
        url: "/channels",
        params: { part, id, key: API_KEY },
      }),
    }),

    search: builder.query({
      query: ({ part, maxResults, q, type, videoDuration }) => ({
        url: "/search",
        params: { part, maxResults, q, type, videoDuration, key: API_KEY },
      }),
    }),
  }),
});

export const { useHomeVideosQuery, useChannelInfoQuery, useSearchQuery } =
  youtubeService;
