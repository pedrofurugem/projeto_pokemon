import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { getPokemon, getAbilities } from '../../services/apis'
import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'
import Title from '../../images/pokemon_title.png'
import Pokeball from '../../images/pokeball.png'
import Pokeballgif from '../../images/pokeball.gif'

const Pokemon = () => {
    const {theme} = useContext(ThemeContext)
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
                setMoves(pokeMoves.slice(0, 20))

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
        <section style={{ backgroundColor: theme.background }}> 

            <HeaderLogo>
                <TitleLogo src={Title} alt="pokeball" />
                <PokeballLogo src={Pokeball} alt="title"/>
            </HeaderLogo>
        
            <PokemonDetails>
                <PokemonCardHeader>
                    <PokePerfil src={details.pokeImg} alt="pokemon" />
                    <Name>{details.pokeName}</Name>
                    <PokemonPicture>
                        <Picture src={details.Back_default } alt="pictures"/>
                        <Picture src={details.Back_shiny} alt="pictures"/>
                        <Picture src={details.Front_default} alt="pictures"/>
                        <Picture src={details.Front_shiny} alt="pictures"/>
                    </PokemonPicture>
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
                                        <AbilityName>{pokeAbility.name}:</AbilityName>
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
            
            <Footer>
                <Link to='/'>
                    <SetaVoltar src={Pokeballgif} alt="seta-voltar"/>
                </Link> 
                   <Back>Back to Home</Back>
            </Footer>
        </section>
    )
}

const HeaderLogo = styled.header`
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 30px;
`

const TitleLogo = styled.img`
   width: 300px;
`

const PokeballLogo = styled.img`
   width: 80px;
   margin-top: 35px;
   background: none;
`

const Name = styled.h1`
    font-size: 2.5em;
    font-weight: bold;
    font-family: 'Pokemon';
    color: #FFCC03;
    letter-spacing: 5px;
`

const PokemonCardHeader = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`

const PokePerfil = styled.img`
    border: 6px solid #FFCC03;
    width: 250px;
    border-radius: 50%;
    background-color: white;
`

const PokemonDetails = styled.section`
    display: flex;
    background-color: #3C59A5;
    justify-content: center;
    width: 55vw;
    border: 3px solid black;
    border-radius: 25px;
    margin: auto;
`
const ListMoves = styled.li`
    width: 150px;
`

const Details = styled.div`
   font-size: 16px;
   font-weight: bold;
   padding: 5px;
   border-left: 3px solid black;
   color: #FFFF;
`

const AbilityName = styled.h3`
   color: #FFCC03;
`

const FeatureName = styled.h1`
   text-align: center;
   padding: 5px;
   border-bottom: 3px solid black;
   color: #FFCC03;
`

const PokemonPicture = styled.section`
   display: flex;
   justify-content: center;
   border-radius: 25px;
   border: 10px solid #FFCC03;
   background-color: white;
   align-items: center;
`

const Picture = styled.img`
     width: 150px;
`
const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SetaVoltar = styled.img`
   width: 100px;
   margin: auto
`


const Back = styled.p`
    font-family: 'Pokemon';
    color: #FFCC03;
    font-size: 25px;
    letter-spacing: 2px;
`


export { Pokemon }