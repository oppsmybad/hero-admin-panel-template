// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. он должен попадать в общее состояние и отображаться в списке + фильтроваться: ВЫПОЛНЕНО
// Уникальный идентификатор персонажа можно сгенерировать через uiid: ВЫПОЛНЕНО
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST: ВЫПОЛНЕНО
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе данных из фильтров: ВЫПОЛНЕНО

import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectAll } from "../heroesFilters/heroesFilterSlice";
import store from "../../store";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
    // Состояния для контроля формы
    const [heroName, setHeroName] = useState("");
    const [heroDescr, setHeroDescr] = useState("");
    const [heroElement, setHeroElement] = useState("");

    // isloading
    const [createHero, { isLoading }] = useCreateHeroMutation();

    const { filtersLoadingStatus } = useSelector((state) => state.filters);
    const filters = selectAll(store.getState());

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Генерация id через библиотеку
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement,
        };

        // Создаем нового героя
        createHero(newHero).unwrap();

        // Очищаем форму после отправки
        setHeroName("");
        setHeroDescr("");
        setHeroElement("");
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>;
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>;
        }

        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                if (name === "all") return;

                return (
                    <option key={name} value={name}>
                        {label}
                    </option>
                );
            });
        }
    };

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={onSubmitHandler}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
