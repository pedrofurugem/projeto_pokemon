import { createContext } from 'react'
import { useState} from 'react'
//cores para o context
  //#E0FFFF 
  //#191970
export const themes = {
    light: {
        background: '#DCDCDC', //#DCDCDC //#E0FFFF
    },
    dark: {
        background: '#696969' //#DCDCDC //#808080  //#696969
    },
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.light)

    return(
        <ThemeContext.Provider value={{theme, setTheme}} >
            {props.children}
        </ThemeContext.Provider>
    )
}