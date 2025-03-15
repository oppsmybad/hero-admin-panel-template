import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} from "../actions/index";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

const heroes = createReducer(initialState, (builder) => {
    builder
        // Добавляем случаи через команду из createReducer
        .addCase(heroesFetching, (state) => {
            state.heroesLoadingStatus = "loading";
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = "error";
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(
                (item) => item.id !== action.payload
            );
        })
        .addDefaultCase(() => {}); // Возвращаем дефолтное значение
});

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case "HEROES_FETCHING":
//             return {
//                 ...state,
//                 heroesLoadingStatus: "loading",
//             };
//         case "HEROES_FETCHED":
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: "idle",
//             };
//         case "HEROES_FETCHING_ERROR":
//             return {
//                 ...state,
//                 heroesLoadingStatus: "error",
//             };
//         case "HERO_CREATED":
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             };
//         case "HERO_DELETED":
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(
//                     (item) => item.id !== action.payload
//                 ),
//             };
//         default:
//             return state;
//     }
// };

export default heroes;
