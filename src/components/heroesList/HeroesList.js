import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "@reduxjs/toolkit";

import { heroDeleted, fetchHeroes } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния: ВЫПОЛНЕНО
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE: ВЫПОЛНЕНО

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === "all") {
                console.log("render");
                return heroes;
            } else {
                return heroes.filter((item) => item.element === filter);
            }
        }
    );

    // const filteredHeroes = useSelector((state) => {
    //     if (state.filters.activeFilter === "all") {
    //         console.log("render");
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(
    //             (item) => item.element === state.activeFilter
    //         );
    //     }
    // });

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(
        (state) => state.heroes.heroesLoadingStatus
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    // Используем наш action
    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    // Функция берет id и по нему удаляет ненужного персонажа из store
    const onDelete = useCallback(
        (id) => {
            // Удаление персонажа по его id
            request(`http://localhost:3001/heroes/${id}`, "DELETE")
                .then((data) => console.log(data, "Deleted"))
                .then(dispatch(heroDeleted(id)))
                .catch((err) => console.log(err));
        },
        [request]
    );

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition timeout={0} classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            );
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="hero">
                    <HeroesListItem {...props} onDelete={() => onDelete(id)} />
                </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
