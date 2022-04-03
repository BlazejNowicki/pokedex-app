import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resourceLimits } from "worker_threads";
import { getPokemonById, getPokemonInRange } from "../api/requests";
import { mapApiModel, PokemonApiModel, PokemonModel } from "../types/pokemonTypes";
import { RootState } from "./store";

export enum RequestStatus {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected'
}

export interface PokemonState {
    status: RequestStatus,
    activeID: number | null,
    pokemonList: PokemonModel[],
}

const initialState: PokemonState = {
    status: RequestStatus.pending,
    activeID: null,
    pokemonList: [],
}

export const loadListAsync = createAsyncThunk(
    'pokemon/loadList',
    async (args: { limit: number, offset: number }) => {
        const promises = [] 
        for(let i=1; i<=args.limit; i++){
            promises.push(getPokemonById(i + args.offset));
        }

        const response = await Promise.all(promises);
        return response.map(item => mapApiModel(item.data as PokemonApiModel))
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setActiveId: (state, action: PayloadAction<number>) => {
            state.activeID = action.payload;
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
export const selectPokemonById = (id: number) => (state: RootState) => state.pokemon.pokemonList.filter(item => item.id == id)[0];
export const selectRequestStatus = (state: RootState) => state.pokemon.status;
export const selectActiveId = (state: RootState) => state.pokemon.activeID;

export default pokemonSlice.reducer;
