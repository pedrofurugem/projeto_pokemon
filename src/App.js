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
  }

  li {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }
`

export default App;
