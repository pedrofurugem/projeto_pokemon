import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getPokemonsList, getPokemon } from '../../services/apis'

const PokemonList = () => {

    const [pokedex, setPokedex] = useState([])
    const [load, setLoad] = useState(0)
    let pokemonLoads = 10

    useEffect(() => {
        async function fetchData(){
            const PokemonsName = await getPokemonsList(pokemonLoads, load) 
            const PokemonsData = PokemonsName.map(async name => { return await getPokemon(name)}) 
            
            const PokemonsPromises = await Promise.all(PokemonsData)
            
            setPokedex([...pokedex, ...PokemonsPromises])
        }
        fetchData()
    }, [load])

    function hundleMorePokemons(){
        setLoad(pokemonLoads + load)
    }

    return (
        <section>
            <h2>PokemonList</h2>
            {
                pokedex.map((pokemon, index) => {
                    return (
                        <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                            <div>
                                <p>#{pokemon.id}</p>
                                <img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemoncards" />
                                <p>{pokemon.name}</p>
                            </div>
                        </Link>
                    )
                })
            }
            <button onClick={hundleMorePokemons}>
                <span>Load More</span>
            </button>
        </section>
    )
}

export { PokemonList }