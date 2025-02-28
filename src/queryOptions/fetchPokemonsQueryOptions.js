import { queryOptions } from '@tanstack/react-query'
import { fetchPokemon } from '../apis/pokemons'

export function fetchPokemonsQueryOptions() {
    return queryOptions({
        queryKey: ['pokemons'],
        queryFn: fetchPokemon,
        staleTime: 1000 * 60 * 5, // Cache trong 5 phút
    })
}