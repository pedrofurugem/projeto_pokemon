import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getPokemon, getAbilities } from '../../services/apis'

//https://pokeapi.co/api/v2/move/13/ - moves
//https://pokeapi.co/api/v2/ability/51/ -abilities
//https://pokeapi.co/api/v2/type/1/  -types

/*
Lista de movimentos do pokemon (moves)
Lista de habilidades do pokemon (abilities)
a lista de habilidades deve apresentar o nome e o texto
descritivo da habilidade
Tipo do pokemon (type)

*/

const Pokemon = () => {

    const [details, setDetails] = useState({
        pokeId: 0,
        pokeName: '',
        pokeImg: '',
    })
    const [moves, setMoves] = useState([])
    const [ability, setAbility] = useState([])
    const [type, setType] = useState([])

    const { name } = useParams()

    useEffect(() => {
        async function fetchData(){
            //nome e imagem
            const pokeDetails = await getPokemon(name)
            setDetails({
                pokeId: pokeDetails.id,
                pokeName: pokeDetails.name,
                pokeImg: pokeDetails.sprites.other['official-artwork'].front_default
            }) 
            //moves
            const pokeMoves = await pokeDetails.moves
            setMoves(pokeMoves)

            //abilities
            const pokeAbilities = pokeDetails.abilities
            const abilities = pokeAbilities.map(pokemonData => {
                let abilityName = pokemonData.ability.name
                return getAbilities(abilityName)
            })

            const abilityPromise = await Promise.all(abilities)
            setAbility(abilityPromise)

            //types
            const pokeTypes = await pokeDetails.types
            setType(pokeTypes )
        }
    fetchData()
    }, [name])

    return(
        <>
            <section>
                <p>#{details.pokeId}-{details.pokeName}</p>
                <img src={details.pokeImg} alt="pokemon" />
            </section>

            <h1>Moves</h1>
            <ul>
            {
                moves.map((pokemove, index) => {
                    return(
                        <li key={index}>{pokemove.move.name}</li>
                    )
                })
            }
            </ul>

            <h1>Abilities</h1>

            <ul>
                {
                    ability.map((pokeAbility, index) => {
                        return (
                            <li key={index}>
                                <h3>{pokeAbility.name}</h3>
                                <p>decription: {pokeAbility.effect_entries[1].effect}</p>
                            </li>
                        )
                    })
                }
            </ul>

            <h1>Types</h1>
            <ul>
                {
                    type.map((pokeType, index)=> {
                        return(
                            <li key={index}>
                                {pokeType.type.name}
                            </li>
                        )
                    })
                }
            </ul>

            <Link to='/'>Voltar</Link>
        </>
    )
}

export { Pokemon }