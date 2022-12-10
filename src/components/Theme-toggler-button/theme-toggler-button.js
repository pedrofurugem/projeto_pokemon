import { ThemeContext, themes } from '../../contexts/theme-context'
import React, { useContext } from 'react'
import styled from 'styled-components'
import Pokeball from '../../images/pokeball_theme.gif'
import { Button } from '../ButtonContexts/button'

const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    
    console.log('ThemeTogglerButton: ', theme)

    return(
        <div style={{ backgroundColor: theme.background }}>
            <Button  onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}><PokeballContext src={Pokeball} alt="pokeballContext" /></Button>
        </div>
    )
}

const PokeballContext = styled.img`
  width: 70px;
`


export { ThemeTogglerButton }