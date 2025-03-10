export const heroesFetching = () => {
    return {
        type: "HEROES_FETCHING",
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: "HEROES_FETCHED",
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return {
        type: "HEROES_FETCHING_ERROR",
    };
};

export const heroCreated = (hero) => ({
    type: "HERO_CREATED",
    payload: hero,
});

export const heroDeleted = (id) => ({
    type: "HERO_DELETED",
    payload: id,
});
