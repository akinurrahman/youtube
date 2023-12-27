import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const youtubeService = createApi({
  reducerPath: "youtubeService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    videos: builder.query({
      query: ({ part, chart, maxResults, regionCode, id }) => ({
        url: "/videos",
        params: { part, id, chart, maxResults, regionCode, key: API_KEY },
      }),
    }),
    channels: builder.query({
      query: ({ part, id }) => ({
        url: "/channels",
        params: { part, id, key: API_KEY },
      }),
    }),

    search: builder.query({
      query: ({
        part,
        maxResults,
        q,
        type,
        eventType,
        videoDuration,
        channelId,
      }) => ({
        url: "/search",
        params: {
          part,
          maxResults,
          q,
          type,
          eventType,
          videoDuration,
          channelId,
          key: API_KEY,
        },
      }),
    }),
    commentThreads: builder.query({
      query: ({ part, videoId, maxResults }) => ({
        url: "/commentThreads",
        params: { part, videoId, maxResults, key: API_KEY },
      }),
    }),
    playlists: builder.query({
      query: ({ part, id, maxResults, channelId }) => ({
        url: "/playlists",
        params: { part, id, maxResults, channelId, key: API_KEY },
      }),
    }),

    playlistItems: builder.query({
      query: ({ part, playlistId, maxResults }) => ({
        url: "/playlistItems",
        params: { part, playlistId, maxResults, key: API_KEY },
      }),
    }),
  }),
});

export const {
  useVideosQuery,
  useChannelsQuery,
  useSearchQuery,
  useCommentThreadsQuery,
  usePlaylistsQuery,
  usePlaylistItemsQuery,
} = youtubeService;
