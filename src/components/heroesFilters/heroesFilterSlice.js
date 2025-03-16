import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesFiltersAdapter = createEntityAdapter();

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: "idle",
//     activeFilter: "all",
// };

const initialState = heroesFiltersAdapter.getInitialState({
    filtersLoadingStatus: "idle",
    activeFilter: "all",
});

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
        filtersChanged: (state, action) => {
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
                heroesFiltersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadingStatus = "error";
            });
    },
});

const { actions, reducer } = heroesFiltersSlice;

export const { selectAll } = heroesFiltersAdapter.getSelectors(
    (state) => state.filters
);

// Автоматически генерируемые экшены
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged,
} = actions;

// Редьюсер для хранилища
export default reducer;
