import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonDetails from './PokemonDetails/PokeDetails';
import SearchPokemon from './Search/search'
import Heading from './Heading/Heading'
import PokemonList from './Lists/List'

function App() {

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={
              <div className='main-container'>  
                <div className='heading-container'>
                  <Heading/>
                </div>
                <div className='searchShow-container'>  
                  <SearchPokemon/>
                </div>
                <PokemonList/>
              </div>
            } />
            <Route path="/details/:name" element={
              <PokemonDetails/>
            } />
        </Routes>
    </Router>
    </>
  )
}

export default App
