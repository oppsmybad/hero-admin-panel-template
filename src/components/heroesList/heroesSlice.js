import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
    const { request } = useHttp();
    return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
    name: "heroes", // Префикс для экшенов ("heroes/heroesFetching")
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(
                (item) => item.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            //fetchHeroes
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = "loading";
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = "error";
            });
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
