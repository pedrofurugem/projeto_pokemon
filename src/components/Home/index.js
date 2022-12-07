import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Pokemon_title from '../../images/pokemon_title.png'
import pokeball from '../../images/pokeball_open.gif'

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
        <>
        <Header>
          <PokemonTitle src={Pokemon_title} alt="pokebola-logo"/>
        </Header>
        <Section> 
            {
                pokedex.map((pokemon, index) => {
                    return (
                        <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                            <PokemonCard>  
                                <Img src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemoncards" />
                                <Name>#{pokemon.id} - {pokemon.name}</Name>
                            </PokemonCard>
                        </Link>
                    )
                })
            }
        </Section>

        <Footer>
            <ButtonShowMore onClick={hundleMorePokemons}>
            <Pokeball src={pokeball} alt="pokebol" />
                <p>Show More</p>
            </ButtonShowMore>
        </Footer>
        </>
    )
}

const Header = styled.header`
   display: flex;
   justify-content: center;
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
   border: 5px solid #FF0000;
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
`

const Name = styled.p`
   font-size: 25px;
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
`

export { PokemonList }