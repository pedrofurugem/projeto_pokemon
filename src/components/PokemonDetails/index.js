import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { useParams } from 'react-router-dom'
import { getPokemon, getAbilities } from '../../services/apis'
import Title from '../../images/pokemon_title.png'
import Pokeball from '../../images/pokeball.png'
import setaVoltar from '../../images/seta-voltar.png'

async function pikachu(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')
    const json = await response.json()
    console.log(json)
}
pikachu()


//https://pokeapi.co/api/v2/move/13/ - moves
//https://pokeapi.co/api/v2/ability/51/ -abilities
//https://pokeapi.co/api/v2/type/1/  -types

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
            const pokeDetails = await getPokemon(name)
                setDetails({
                    pokeId: pokeDetails.id,
                    pokeName: pokeDetails.name,
                    pokeImg: pokeDetails.sprites.other['official-artwork'].front_default,

                    Back_default: pokeDetails.sprites.back_default,
                    Back_female: pokeDetails.sprites.back_female,
                    Back_shiny: pokeDetails.sprites.back_shiny,
                    Back_shiny_female: pokeDetails.sprites.back_shiny_female,
                    Front_default: pokeDetails.sprites.front_default,
                    Front_female: pokeDetails.sprites.front_female,
                    Front_shiny: pokeDetails.sprites.front_shiny,
                    Front_shiny_female: pokeDetails.sprites.front_shiny_female,
                }) 
                //moves
                const pokeMoves = await pokeDetails.moves
                setMoves(pokeMoves.slice(0, 10))

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
        <Link to='/'>
            <SetaVoltar src={setaVoltar} alt="seta-voltar"/>
        </Link>  

        <HeaderLogo>
            <TitleLogo src={Title} alt="pokeball" />
            <PokeballLogo src={Pokeball} alt="title"/>
        </HeaderLogo>
        
        <PokeName>
         <Name>{details.pokeName}</Name>
        </PokeName>
        <PokemonDetails>
            <PokemonCardHeader>
                <PokePerfil src={details.pokeImg} alt="pokemon" />
            </PokemonCardHeader>

                <Details>
                 <ul>
                    <FeatureName>Moves</FeatureName>
                    {
                        moves.map((pokemove, index) => {
                            return(
                                <ListMoves key={index}>{pokemove.move.name}</ListMoves>
                            )
                        })
                    }
                 </ul>
                </Details>

                <Details>
                 <ul>
                    <FeatureName>Abilities</FeatureName>
                        {
                            ability.map((pokeAbility, index) => {
                                return (
                                    <li key={index}>
                                        <h3>{pokeAbility.name}:</h3>
                                        <p>decription: {pokeAbility.effect_entries[1].effect}</p>
                                    </li>
                                )
                            })
                        }
                 </ul>
                </Details>

                <Details>
                 <ul>
                    <FeatureName>Types</FeatureName>
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
                </Details>
            </PokemonDetails>

            <section>
                <img src={details.Back_default} alt="pictures"/>
                <img src={details.Back_female} alt="pictures"/>
                <img src={details.Back_shiny} alt="pictures"/>
                <img src={details.Back_shiny_female} alt="pictures"/>
                <img src={details.Front_default} alt="pictures"/>
                <img src={details.Front_female} alt="pictures"/>
                <img src={details.Front_shiny} alt="pictures"/>
                <img src={details.Front_shiny_female} alt="pictures"/>
            </section>

        </>
    )
}

const HeaderLogo = styled.header`
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 15px 0px;
`

const TitleLogo = styled.img`
   width: 300px;
`

const PokeballLogo = styled.img`
   width: 80px;
   margin-top: 35px;
   background-color: white;
`

const PokeName = styled.div`
   margin: auto;
   text-align: center;
   width: 190px;
`
const Name = styled.h1`
    font-size: 2.5em;
    font-weight: bold;
    font-family: 'Pokemon';
    letter-spacing: 5px;
`

const PokemonCardHeader = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`

const PokePerfil = styled.img`
    border: 6px solid red;
    width: 250px;
    border-radius: 50%;
    background-color: white;
`

const PokemonDetails = styled.section`
    display: flex;
    background-color: lightblue;
    justify-content: center;
    width: 55vw;
    border: 1px solid black;
    border-radius: 25px;
    margin: auto;
`
const ListMoves = styled.li`
    width: 110px;
`

const Details = styled.div`
   padding: 10px;
   border-left: 1px solid black;
`

const FeatureName = styled.h1`
   border-bottom: 1px solid black;
`

const SetaVoltar = styled.img`
   width: 50px;
   margin: auto
`



export { Pokemon }