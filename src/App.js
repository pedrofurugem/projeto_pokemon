//import PokemonList from './components/Home/index'
import './App.css';
import AppRoutes from './routes/routes'
import { createGlobalStyle  } from 'styled-components'

function App() {
  return (
    <div>
      <GlobalStyle />
      <AppRoutes />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    font-family: 'Nerko One', sans-serif;
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
    color: #000000;
  }
`

export default App;
