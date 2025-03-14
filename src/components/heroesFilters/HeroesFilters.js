import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

// Импортируем fetchFilters
import { fetchFilters } from "../../actions/index";
import { activeFilterChanged } from "./heroesFilterSlice";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загфруженных данных: ВЫПОЛНЕНО
// Фильтры должны отображать только нужных героев при выборе: ВЫПОЛНЕНО
// Активный фильтр имеет класс active: ВЫПОЛНЕНО

const HeroesFilters = () => {
    const { filters, filtersLoadingStatus, activeFilter } = useSelector(
        (state) => state.filters
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    // Запрос на сервер для получения фильтров и последовательной смены состояния
    // Используем Thunk action
    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }

        // Данные в json-файле расширяем классами и текстом
        return arr.map(({ name, className, label }) => {
            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames("btn", className, {
                active: name === activeFilter,
            });

            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}
                >
                    {label}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
