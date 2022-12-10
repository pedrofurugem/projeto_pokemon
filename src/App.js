//import PokemonList from './components/Home/index'
import './App.css';
import AppRoutes from './routes/routes'
import { createGlobalStyle  } from 'styled-components'
import { ThemeProvider } from './contexts/theme-context'
import { ThemeTogglerButton } from './components/Theme-toggler-button/theme-toggler-button'

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeTogglerButton />
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider >
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    font-family: 'Nerko One', sans-serif;
  }

  

  //cores para o context
  //#E0FFFF 
  //#191970	
  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: #000000;
  }
`

export default App;
