import  { ThemeContext } from '../../contexts/theme-context'
import React, { useContext } from 'react'

const Button = (props) => {
    const { theme } = useContext(ThemeContext)

    console.log('button theme', theme)

    return(
        <button {...props} />
    )
}

export { Button }