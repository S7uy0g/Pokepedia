import './App.css'
import SearchPokemon from './Search/search'
import Heading from './Heading/Heading'

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
    </div>
    </>
  )
}

export default App
