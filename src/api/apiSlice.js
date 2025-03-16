import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    // Работа с API частью
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes: ["#Heroes"],
    endpoints: (builder) => ({
        getHeroes: builder.query({
            query: () => "/heroes",
            providesTags: ["#Heroes"],
        }),
        // Работа с мутацией (изменением state) добавляем героев
        createHero: builder.mutation({
            query: (hero) => ({
                url: "/heroes",
                method: "POST",
                body: hero,
            }),
            invalidatesTags: ["#Heroes"],
        }),
        // Работа с мутацией (изменением state) удаляем героев
        deleteHero: builder.mutation({
            query: (id) => ({
                url: `/heroes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["#Heroes"],
        }),
    }),
});

export const {
    useGetHeroesQuery,
    useCreateHeroMutation,
    useDeleteHeroMutation,
} = apiSlice;
