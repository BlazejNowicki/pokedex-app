import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllPokemon, getPokemonById, getPokemonByType, getPokemonInRange } from "../api/requests";
import { displayConfig, DisplayMode, RequestStatus } from "../types/displayTypes";
import { mapApiModel, PokemonApiModel, PokemonModel } from "../types/pokemonTypes";
import { AppThunk, RootState } from "./store";

export interface PokemonState {
    status: RequestStatus,
    pokemonList: PokemonModel[],
    listSize: number,
    displayConfig: displayConfig,
}

const initialState: PokemonState = {
    status: RequestStatus.pending,
    pokemonList: [],
    listSize: 10,
    displayConfig: { mode: DisplayMode.Normal }
}

const getIdFromUrl = (url: string): number => {
    const ans = url.split('/').slice(-2)[0] || "1";
    return parseInt(ans);
}

export const getIndexes = async (size: number) => {
    const result = (await getPokemonInRange(size, 0)).data as { results: { url: string }[] };
    console.log(result);
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


export const loadListAsync = createAsyncThunk(
    'pokemon/loadList',
    async (config: displayConfig, { getState }) => {
        const state = (getState() as RootState).pokemon;
        let indexes: number[];
        switch (config.mode) {
            case DisplayMode.Normal:
                indexes = await getIndexes(state.listSize);
                break;
            case DisplayMode.Type:
                indexes = await getIndexesByType(config.typeName, state.listSize);
                break;
            case DisplayMode.Name:
                indexes = await getIndexesByName(config.query, state.listSize);
                break;
        }
        const response = await Promise.all(indexes.map(index => getPokemonById(index)));
        return response.map(item => mapApiModel(item.data as PokemonApiModel))
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        sizeAction: (state, action: PayloadAction<number>) => {
            state.listSize = action.payload;
        },
        configAction: (state, action: PayloadAction<displayConfig>) => {
            state.displayConfig = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadListAsync.pending, (state) => {
            state.status = RequestStatus.pending;
        }).addCase(loadListAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.fulfilled;
            state.pokemonList = action.payload
        }).addCase(loadListAsync.rejected, (state) => {
            state.status = RequestStatus.rejected;
        });
    }
})

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectPokemonById = (id: number) => (state: RootState) => state.pokemon.pokemonList.filter(item => item.id === id)[0];
export const selectRequestStatus = (state: RootState) => state.pokemon.status;

export const { sizeAction, configAction } = pokemonSlice.actions;

export const setSize = (size: number): AppThunk => (
    dispatch,
    getState
) => {
    const state = (getState() as RootState).pokemon;
    dispatch(sizeAction(size));
    dispatch(loadListAsync(state.displayConfig));
};

export const setConfig = (config: displayConfig): AppThunk => (
    dispatch,
    getState
) => {
    const state = (getState() as RootState).pokemon;
    dispatch(configAction(config));
    dispatch(loadListAsync(state.displayConfig));
};

export default pokemonSlice.reducer;
