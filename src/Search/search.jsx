import './style.css'; 

function findPokemon(){
    var pokeName=document.getElementById("searchBox").value.toLowerCase();
    findInAPI(pokeName);
}

async function findInAPI(pokeName) {
    try {
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        if(!response.ok){
            throw new Error("Could not find data");
        }
        const values=await response.json();
        const image=document.getElementById("pokemonImage");
        image.src=values.sprites.front_default;
        image.classList.add("display");
        const name=document.getElementById("name");
        name.innerHTML=values.name.toUpperCase();
        console.log(values.name);

    } catch (error) {
        document.getElementById("error").innerHTML=error;
    }
}

function SearchPokemon(){
    return (
        <>
            <div className='search'>
                <input type="text" id="searchBox" className="searchBox" placeholder="Input Pokemon Name"/>
                <button id="searchButton" className="searchButton" onClick={findPokemon}>&#128269;</button>
            </div>
            <div className='answer'>
                <p id="error"></p>
                <img src="" alt="Pokemon Image" id="pokemonImage" className="pokemonImage"/>
                <p id='name'></p>
            </div>
        </>
    );
}

export default SearchPokemon