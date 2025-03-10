// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать: ВЫПОЛНЕНО
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid: ВЫПОЛНЕНО
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST: ВЫПОЛНЕНО
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { heroCreated } from "../../actions/index";

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [element, setElement] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element,
        };
        // Добавление героя в Redux
        dispatch(heroCreated(newHero));

        axios
            .post("http://localhost:3001/heroes", newHero)
            .then((response) => {
                console.log("Герой успешно создан:", response.data);
            })
            .catch((error) => {
                console.error("Ошибка при создании героя:", error);
            });

        // Очистка формы
        setName("");
        setDescription("");
        setElement("");
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                >
                    <option>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
