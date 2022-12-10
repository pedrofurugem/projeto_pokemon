import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'
import styled from 'styled-components'
import Pokemon_title from '../../images/pokemon_title.png'
import pokeball from '../../images/pokeball.png'
import pokeballIcon from '../../images/pokeball-icon.png'
import pokeballgif from '../../images/pokeball.gif'


import { getPokemonsList, getPokemon } from '../../services/apis'

const PokemonList = () => {
    const {theme} = useContext(ThemeContext)
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
    },  [load])

    function hundleMorePokemons(){
        setLoad(pokemonLoads + load)
    }

    return (
        <section style={{backgroundColor: theme.background }}>
            <Header>
               <PokemonTitle src={Pokemon_title} alt="pokebola-logo"/>
               <PokeballTitle src={pokeball} alt="pokeball" />
            </Header>
            <Section> 
            {
                pokedex.map((pokemon, index) => {
                    return (
                        <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                            <PokemonCard>  
                                <Img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemoncards" />
                                <Name><PokeballIcon src={pokeballIcon} alt="pokeballicon"/> {pokemon.name}</Name>
                            </PokemonCard>
                        </Link>
                    )
                })
            }
            </Section>

            <Footer>
                <ButtonShowMore onClick={hundleMorePokemons}>
                <Pokeball src={pokeballgif} alt="pokebol" />
                    <ShowMore>Show More</ShowMore>
                </ButtonShowMore>
            </Footer>
        </section>
    )
}

const Header = styled.header`
   display: flex;
   justify-content: center;
   align-items: center;
`
const PokeballTitle = styled.img`
    width: 150px;
    height: 150px;
    margin-top: 45px;
`

const PokemonTitle = styled.img`
   width: 550px;
   margin: 25px 0px;
`

const Section = styled.section`
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   width: 85vw;
   margin: auto;
`

const Img = styled.img`
   width: 250px;
   padding: 5px;
   border: 5px solid #FFCC03;
   border-radius: 50%;
   background-color: #FFF;
`

const PokemonCard = styled.div`
   display: flex;
   height: 350px;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   border: 1px solid ;
   border-radius: 25px;
   padding: 10px;
   margin: 10px;
   background-color: #3C59A5;
`
//#3C59A5
//#E0FFFF
const PokeballIcon = styled.img`
  width: 45px;
  background: none;
`

const Name = styled.p`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 25px;
   font-family: 'Pokemon';
   color: #FFCC03;
   letter-spacing: 3px;
   background: none;
`
const Footer = styled.footer`
   display: flex;
   justify-content: center;
`

const Pokeball = styled.img`
   width: 150px;
`

const ButtonShowMore = styled.button`
   border: none;
   background: none;
   cursor: pointer;
`

const ShowMore = styled.p`
    font-family: 'Pokemon';
    color: #FFCC03;
    font-size: 25px;

`

export { PokemonList }