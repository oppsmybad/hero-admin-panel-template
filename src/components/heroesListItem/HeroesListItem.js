import React from "react";
import { useDispatch } from "react-redux";
import { heroDeleted } from "../../actions";
import { useHttp } from "../../hooks/http.hook";

const HeroesListItem = ({ id, name, description, element }) => {
    let elementClassName;

    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleDelete = () => {
        // Удаляем героя из состояния
        dispatch(heroDeleted(id));

        // Удаляем героя с сервера
        request(`http://localhost:3001/heroes/${id}, "DELETE"`).then(() =>
            console
                .log("Герой успешно удален")
                .catch((error) =>
                    console.error("Ошибка при удалении героя:", error)
                )
        );
    };

    switch (element) {
        case "fire":
            elementClassName = "bg-danger bg-gradient";
            break;
        case "water":
            elementClassName = "bg-primary bg-gradient";
            break;
        case "wind":
            elementClassName = "bg-success bg-gradient";
            break;
        case "earth":
            elementClassName = "bg-secondary bg-gradient";
            break;
        default:
            elementClassName = "bg-warning bg-gradient";
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ objectFit: "cover" }}
            />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button
                    type="button"
                    className="btn-close btn-close"
                    onClick={handleDelete}
                    aria-label="Close"
                ></button>
            </span>
        </li>
    );
};

export default HeroesListItem;
