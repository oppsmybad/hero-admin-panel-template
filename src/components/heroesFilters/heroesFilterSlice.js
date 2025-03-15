import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
};

const heroesFiltersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // Передаем наши actions с определенными действиями
        filtersFetching: (state) => {
            state.filtersLoadingStatus = "loading";
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = "idle";
            state.filters = action.payload;
        },
        filtersFetchingError: (state) => {
            state.filtersLoadingStatus = "error";
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = heroesFiltersSlice;

// Автоматически генерируемые экшены
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} = actions;

// Редьюсер для хранилища
export default reducer;
