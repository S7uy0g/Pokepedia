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
        else{
            document.getElementById("error").innerHTML=null;
            const values=await response.json();
            showNameImage(values);
            showDetails(values);
            console.log(values.height);
            console.log(values.weight);
            console.log(values.types);
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

    height.innerHTML=values.height+" m";
    weight.innerHTML=(values.weight/10)+" kg";

    let typeHtml = '';
    values.types.forEach(type => {
        typeHtml += `${type.type.name.toUpperCase()} `;
    });
    poketype.innerHTML = `${typeHtml}`;
    headings.forEach(heading => {
        heading.style.display = 'block';
    });
}



function SearchPokemon(){
    return (
        <>
        <div className='content'>
            <div className='search'>
                <input type="text" id="searchBox" className="searchBox" placeholder="Input Pokemon Name"/>
                <button id="searchButton" className="searchButton" onClick={findPokemon}>&#128269;</button>
            </div>
            <div className='answer' id='answer'>
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
        </>
    );
}

export default SearchPokemon