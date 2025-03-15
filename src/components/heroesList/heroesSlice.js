import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

const heroesSlice = createSlice({
    name: "heroes", // Префикс для экшенов ("heroes/heroesFetching")
    initialState,
    reducers: {
        // Передаем наши actions с определенными действиями
        heroesFetching: (state) => {
            state.heroesLoadingStatus = "loading";
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes = action.payload;
        },
        heroesFetchingError: (state) => {
            state.heroesLoadingStatus = "error";
        },
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

const { actions, reducer } = heroesSlice;

// Экспортируем reducer
export default reducer;
// Экспортируем наши actions для глобального использованяи
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} = actions;
