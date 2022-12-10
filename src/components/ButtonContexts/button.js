import  { ThemeContext } from '../../contexts/theme-context'
import styled from 'styled-components'
import React, { useContext } from 'react'

const Button = (props) => {
    const { theme } = useContext(ThemeContext)

    console.log('button theme', theme)

    return(
        <Btn  {...props} />
    )
}

const Btn = styled.button`
   background: none;
   border: none;
`

export { Button }