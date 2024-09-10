import './style.css'; 
import { useNavigate } from 'react-router-dom';

const typeBackgrounds = {
    "NORMAL": "linear-gradient(to top, #A8A878, #2c2c2c 80%)",
    "FIRE": "linear-gradient(to top, #F08030, #2c2c2c 80%)",
    "WATER": "linear-gradient(to top, #6890F0, #2c2c2c 80%)",
    "GRASS": "linear-gradient(to top, #78C850, #2c2c2c 80%)",
    "ELECTRIC": "linear-gradient(to top, #F8D030 10%, #2c2c2c 80%)",
    "ICE": "linear-gradient(to top, #98D8D8, #2c2c2c 80%)",
    "FIGHTING": "linear-gradient(to top, #C03028, #2c2c2c 80%)",
    "POISON": "linear-gradient(to top, #A040A0, #2c2c2c 80%)",
    "GROUND": "linear-gradient(to top, #E0C068, #2c2c2c 80%)",
    "FLYING": "linear-gradient(to top, #A890F0, #2c2c2c 80%)",
    "PSYCHIC": "linear-gradient(to top, #F85888, #2c2c2c 80%)",
    "BUG": "linear-gradient(to top, #A8B820, #2c2c2c 80%)",
    "ROCK": "linear-gradient(to top, #B8A038, #2c2c2c 80%)",
    "GHOST": "linear-gradient(to top, #705898, #2c2c2c 80%)",
    "DRAGON": "linear-gradient(to top, #7038F8, #2c2c2c 80%)",
    "DARK": "linear-gradient(to top, #705848, #A29288 80%)",
    "STEEL": "linear-gradient(to top, #B8B8D0, #2c2c2c 80%)",
    "FAIRY": "linear-gradient(to top, #EE99AC, #2c2c2c 80%)",
};


function findPokemon(){
    var pokeName=document.getElementById("searchBox").value.toLowerCase();
    findInAPI(pokeName);
    document.getElementById("searchBox").value = "";
}

async function findInAPI(pokeName) {
    try {
        const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        if(!response.ok){
            throw new Error("Could not find data");
        }
        else{
            document.getElementById("error").innerHTML=null;
            const values=await response.json();
            showNameImage(values);
            showDetails(values);
        }

    } catch (error) {
        document.getElementById("error").innerHTML=error;
    }
}

//shows name and image of the pokemon
function showNameImage(values){
    const image=document.getElementById("pokemonImage");
    image.src=values.sprites.front_default;
    // document.getElementById("answer").classList.add("display");
    image.classList.add("display");
    const name=document.getElementById("name");
    name.innerHTML=values.name.toUpperCase();
}
//shows details about the pokemon
function showDetails(values){
    const height=document.getElementById("height");
    const weight=document.getElementById("weight");
    const poketype=document.getElementById("type");
    const headings = document.querySelectorAll('.heading');
    const backgroundImage=document.getElementById("card");

    height.innerHTML=values.height/10+" m";
    weight.innerHTML=(values.weight/10)+" kg";

    let typeHtml = '';
    values.types.forEach(type => {
        typeHtml += `${type.type.name.toUpperCase()} `;
    });
    poketype.innerHTML = `${typeHtml}`;
    headings.forEach(heading => {
        heading.style.display = 'block';
    });
    const mainType= typeHtml.split(" ")[0];
    backgroundImage.style.background = typeBackgrounds[mainType] || "linear-gradient(to top, #FFFFFF, #CCCCCC)";
}



function SearchPokemon(){
    const navigate = useNavigate();

    const handleCardClick = (pokemonName) => {
        navigate(`/details/${pokemonName}`);
    };
    return (
        <>
        <div className='content'>
            <div className='search'>
                <input type="text" id="searchBox" className="searchBox" placeholder="Input Pokemon Name"/>
                <button id="searchButton" className="searchButton" onClick={findPokemon}>&#128269;</button>
            </div>
            <div className='answer' id='answer'>
                <div className='card' id='card' onClick={() => handleCardClick(document.getElementById("name").innerText.toLowerCase())}>
                    <p id="error" className='error'></p>
                    <img src="" alt="Pokemon Image" id="pokemonImage" className="pokemonImage"/>
                    <p id='name' className='name'></p>
                    <div className='details'>
                        <p className='heading'>TYPE</p>
                        <p id='type'></p>
                        <div className='div'>
                            <div className='div1'>
                                <p className='heading'>HEIGHT</p>
                                <p id='height'></p>
                            </div>
                            <div className='div2'>
                                <p className='heading'>WEIGHT</p>
                                <p id='weight'></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SearchPokemon