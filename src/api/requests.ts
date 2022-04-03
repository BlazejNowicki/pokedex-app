import http from "./http-common";

export const getPokemonById = (id: number) => {
    return http.get(`pokemon/${id}`);
}

export const getPokemonInRange = (limit: number, offset: number) => {
    return http.get(`pokemon?limit=${limit}&offset=${offset}`);
}
