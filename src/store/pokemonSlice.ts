import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPokemonById } from "../api/requests";
import { getIndexes, getIndexesByName, getIndexesByType, getTypes } from "../api/wrappers";
import { displayConfig, DisplayMode, RequestStatus } from "../types/displayTypes";
import { mapApiModel, PokemonApiModel, PokemonModel } from "../types/pokemonTypes";
import { RootState } from "./store";

export interface PokemonState {
    status: RequestStatus,
    pokemonList: PokemonModel[],
    config: displayConfig,
    pokemonTypes: string[],
}

const initialState: PokemonState = {
    status: RequestStatus.pending,
    pokemonList: [],
    config: { mode: DisplayMode.Normal, size: 10 },
    pokemonTypes: []
}


export const loadListAsync = createAsyncThunk(
    'pokemon/loadList',
    async (config: displayConfig | null, { getState }) => {
        const state = (getState() as RootState).pokemon;
        let indexes: number[];
        config = config || state.config;
        switch (config.mode) {
            case DisplayMode.Normal:
                indexes = await getIndexes(config.size);
                break;
            case DisplayMode.Type:
                indexes = await getIndexesByType(config.typeName, config.size);
                break;
            case DisplayMode.Name:
                indexes = await getIndexesByName(config.query, config.size);
                break;
        }
        const response = await Promise.all(indexes.map(index => getPokemonById(index)));
        return {config, list: response.map(item => mapApiModel(item.data as PokemonApiModel))}
    }
)

export const loadTypesAsync = createAsyncThunk(
    'pokemon/loadTypes', 
    getTypes
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadListAsync.pending, (state) => {
            state.status = RequestStatus.pending;
        }).addCase(loadListAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.fulfilled;
            state.pokemonList = action.payload.list;
            state.config = action.payload.config;
        }).addCase(loadListAsync.rejected, (state) => {
            state.status = RequestStatus.rejected;
        }).addCase(loadTypesAsync.fulfilled, (state, action) => {
            state.pokemonTypes = action.payload;
        });
    }
})

export const selectPokemonList = (state: RootState) => state.pokemon.pokemonList;
export const selectPokemonById = (id: number) => (state: RootState) => state.pokemon.pokemonList.filter(item => item.id === id)[0];
export const selectRequestStatus = (state: RootState) => state.pokemon.status;
export const selectConfig = (state: RootState) => state.pokemon.config;

export default pokemonSlice.reducer;
