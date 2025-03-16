import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/heroesFilterSlice";
import { apiSlice } from "../api/apiSlice";

// Кастомная middleware для обработки строковых экшенов
const stringMiddleware = () => (next) => (action) => {
    // Если экшен - строка, преобразуем в объект {type: строка}
    if (typeof action === "string") {
        return next({
            type: action,
        });
    }
    return next(action);
};

// Создаем Redux-хранилище с помощью Redux Toolkit
const store = configureStore({
    // Объединяем редюсеры
    reducer: {
        filters, // Редюсер для работы с фильтрами
        [apiSlice.reducerPath]: apiSlice.reducer, // Редюсер для работы с api
    },
    // Настраиваем middleware:
    // - Берем дефолтные middleware из Redux Toolkit
    // - Добавляем нашу кастомную stringMiddleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    // Включаем Redux DevTools только в режиме разработки
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
