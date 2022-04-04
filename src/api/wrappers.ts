import { getAllPokemon, getPokemonByType, getPokemonInRange, getPokemonTypes } from "./requests";

const getIdFromUrl = (url: string): number => {
    const ans = url.split('/').slice(-2)[0] || "1";
    return parseInt(ans);
}

export const getIndexes = async (size: number) => {
    const result = (await getPokemonInRange(size, 0)).data as { results: { url: string }[] };
    return result.results.map(item => getIdFromUrl(item.url));
}

export const getIndexesByType = async (type: string, size: number) => {
    const result = (await getPokemonByType(type)).data as { pokemon: { pokemon: { url: string } }[] };
    return result.pokemon.map(item => getIdFromUrl(item.pokemon.url)).slice(0, size - 1);
}

export const getIndexesByName = async (name: string, size: number) => {
    const result = (await getAllPokemon()).data as { results: { name: string, url: string }[] };
    return result.results.filter(item => item.name.includes(name)).map(item => getIdFromUrl(item.url)).slice(0, size - 1);
}

export const getTypes = async () => {
    const result = (await getPokemonTypes()).data as { results: { name: string }[] };
    return result.results.map(item => item.name);
}