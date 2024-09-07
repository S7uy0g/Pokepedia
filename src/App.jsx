import './App.css'
import SearchPokemon from './Search/search'
import Heading from './Heading/Heading'
import PokemonList from './Lists/List'

function App() {

  return (
    <>
    <div className='main-container'>  
      <div className='heading-container'>
        <Heading/>
      </div>
      <div className='searchShow-container'>  
        <SearchPokemon/>
      </div>
      <PokemonList/>
    </div>
    </>
  )
}

export default App
