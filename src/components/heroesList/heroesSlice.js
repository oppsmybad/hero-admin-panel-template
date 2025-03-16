// import {
//     createSlice,
//     createAsyncThunk,
//     createEntityAdapter,
//     createSelector,
// } from "@reduxjs/toolkit";
// import { useHttp } from "../../hooks/http.hook";

// const heroesAdapter = createEntityAdapter();

// const initialState = heroesAdapter.getInitialState({
//     heroesLoadingStatus: "idle",
// });

// export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", () => {
//     const { request } = useHttp();
//     return request("http://localhost:3001/heroes");
// });

// const heroesSlice = createSlice({
//     name: "heroes", // Префикс для экшенов ("heroes/heroesFetching")
//     initialState,
//     reducers: {
//         heroCreated: (state, action) => {
//             heroesAdapter.addOne(state, action.payload);
//         },
//         heroDeleted: (state, action) => {
//             heroesAdapter.removeOne(state, action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             //fetchHeroes
//             .addCase(fetchHeroes.pending, (state) => {
//                 state.heroesLoadingStatus = "loading";
//             })
//             .addCase(fetchHeroes.fulfilled, (state, action) => {
//                 state.heroesLoadingStatus = "idle";
//                 heroesAdapter.setAll(state, action.payload);
//             })
//             .addCase(fetchHeroes.rejected, (state) => {
//                 state.heroesLoadingStatus = "error";
//             });
//     },
// });

// const { actions, reducer } = heroesSlice;

// // Экспортируем reducer
// export default reducer;

// const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

// export const filteredHeroesSelector = createSelector(
//     (state) => state.filters.activeFilter,
//     selectAll,
//     (filter, heroes) => {
//         if (filter === "all") {
//             return heroes;
//         } else {
//             return heroes.filter((item) => item.element === filter);
//         }
//     }
// );

// // Экспортируем наши actions для глобального использованяи
// export const {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     heroCreated,
//     heroDeleted,
// } = actions;
