import queryString from 'query-string';

export const fetchPokemon = async (params) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?${queryString.stringify(params)}`)
    return res.json()
}