import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IActor,
  IFilmById,
  IFilters,
  IResponseFromFilmsApi,
} from "../../interfaces";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  keepUnusedDataFor: 100000,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getFilms: builder.query<IResponseFromFilmsApi, IFilters>({
      query: (filters) => ({
        url: `movie?limit=16&selectFields=id&selectFields=name&selectFields=year&selectFields=votes&selectFields=poster&selectFields=rating&notNullFields=name&votes.kp=3000-6666666`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
        params: {
          ...filters,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (Number(otherArgs.arg.page) > 1) {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs.push(...newItems.docs);
        } else {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs = newItems.docs;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPopularFilms: builder.query<IResponseFromFilmsApi, null>({
      query: () => ({
        url: `movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=poster&lists=top10-hd`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
    }),
    getFilmById: builder.query<IFilmById, string>({
      query: (id) => ({
        url: `movie/${id}`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
    }),
    getFilmsBySearch: builder.query<IResponseFromFilmsApi, [string, string]>({
      query: (data) => ({
        url: `movie/search?page=${data[1]}&limit=10&query=${data[0]}`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (Number(otherArgs.arg[1]) > 1) {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs.push(...newItems.docs);
        } else {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs = newItems.docs;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFilmsByLinkClick: builder.query<
      IResponseFromFilmsApi,
      [string, string, string]
    >({
      query: (data) => ({
        url: `movie?page=${data[2]}&limit=10&selectFields=id&selectFields=name&selectFields=year&selectFields=votes&selectFields=poster&selectFields=rating&notNullFields=name&votes.kp=3000-6666666&${data[0]}=${data[1]}`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (Number(otherArgs.arg[2]) > 1) {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs.push(...newItems.docs);
        } else {
          currentCache.limit = newItems.limit;
          currentCache.page = newItems.page;
          currentCache.pages = newItems.pages;
          currentCache.total = newItems.total;
          currentCache.docs = newItems.docs;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getActor: builder.query<IActor, string>({
      query: (id) => ({
        url: `https://api.kinopoisk.dev/v1.4/person/${id}`,
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetPopularFilmsQuery,
  useGetFilmByIdQuery,
  useGetFilmsBySearchQuery,
  useGetFilmsByLinkClickQuery,
  useGetActorQuery,
} = filmsApi;
