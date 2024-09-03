import './Heading.css'; 


function Heading(){

    async function findInAPI() {
        try {
            const randomNumber = Math.floor(Math.random() * (1024 - 1 + 1)) + 1;
            const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
            if(!response.ok){
                throw new Error("Could not find data");
            }
            else{
                document.getElementById("error").innerHTML=null;
                const values=await response.json();
                showNameImage(values);
            }
    
        } catch (error) {
            document.getElementById("error").innerHTML=error;
        }
    }
    function showNameImage(values){
        const image=document.getElementById("heading-pokeImage");
        image.src=values.sprites.front_default;
        image.classList.add("display");
    }

    return(
        <>
        <div className="main-heading-container">
            <div className='dis-container'>
                <h1>Welcome To PokePedia</h1>
                <h3>A wikipedia for pokemons</h3>
            </div>
            <div className='image-slider'>
                <img src="" alt="Image1" className='heading-pokeImage' id='heading-pokeImage'/>
            </div>
        </div>
        </>
    )
}

export default Heading