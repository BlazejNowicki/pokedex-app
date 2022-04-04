import http from "./http-common";

export const getPokemonById = (id: number) => {
    return http.get(`pokemon/${id}`);
}

export const getPokemonInRange = (limit: number, offset: number) => {
    return http.get(`pokemon?limit=${limit}&offset=${offset}`);
}

export const getPokemonTypes = () => {
    return http.get('type');
}

export const getPokemonByType = (type: string) => {
    return http.get(`type/${type}`);
}

export const getAllPokemon = () => {
    return http.get(`pokemon?limit=-1`);
}
