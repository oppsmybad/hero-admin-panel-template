import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../reducers/filters";

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

// const enhancer =
//     (createStore) =>
//     (...args) => {
//         const store = createStore(...args);

//         const oldDispatch = store.dispatch;
//         store.dispatch = (action) => {
//             if (typeof action === "string") {
//                 return oldDispatch({
//                     type: action,
//                 });
//             }
//             return oldDispatch(action);
//         };
//         return store;
//     };

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(
//         applyMiddleware(thunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//     // compose(
//     //     enhancer,
//     //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     //         window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )
// );

// Создаем Redux-хранилище с помощью Redux Toolkit
const store = configureStore({
    // Объединяем редюсеры
    reducer: {
        heroes, // Редюсер для работы с героями
        filters, // Редюсер для работы с фильтрами
    },
    // Настраиваем middleware:
    // - Берем дефолтные middleware из Redux Toolkit
    // - Добавляем нашу кастомную stringMiddleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware),
    // Включаем Redux DevTools только в режиме разработки
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
