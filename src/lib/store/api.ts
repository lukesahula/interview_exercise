import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

interface Article {
  title: string;
  content: string;
}

interface ArticlesResponse {
  items: Article[];
  pagination: { offset: number; limit: number; total: number };
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `${session.accessToken}`);
        headers.set("X-API-KEY", `${process.env.NEXT_PUBLIC_API_KEY}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchArticles: builder.query<ArticlesResponse, void>({
      query: () => "/articles",
    }),
  }),
});

export const { useFetchArticlesQuery } = api;
