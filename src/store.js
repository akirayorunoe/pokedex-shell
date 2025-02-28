import {create} from 'zustand'

export const usePokeStore = create((set)=>({
    pokemons: [],
    setPokemons: (data)=>set({pokemons:data})
}))