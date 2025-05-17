import { create } from 'zustand'

export const usePokeStore = create((set) => ({
    pokemons: [],
    setPokemons: (data) => set({ pokemons: data })
}))

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});