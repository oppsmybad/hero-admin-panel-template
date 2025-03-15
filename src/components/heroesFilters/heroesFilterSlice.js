import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
};

export const fetchFilters = createAsyncThunk(
    "heroes/fetchFilters",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters");
    }
);

const heroesFiltersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // Передаем наш активный action
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchFilters
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadingStatus = "loading";
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = "error";
            });
    },
});

const { actions, reducer } = heroesFiltersSlice;

// Автоматически генерируемые экшены
export const { activeFilterChanged } = actions;

// Редьюсер для хранилища
export default reducer;
