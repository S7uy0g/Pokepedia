import React from 'react';
import './style.css'; 
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams();
    const [height,setHeight]=useState();
    const [weight,setWeight]=useState();
    const [nationalNo,setNationalNo]=useState();
    const [abilities,setAbilities]=useState([]);
    const [type,setType]=useState([]);
    const [loading, setLoading] = useState(true);
    const [sprites, setSprites] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFetched = useRef(false);

    function addDetails(pokemon){
        setHeight(pokemon.height/10);
        setWeight(pokemon.weight/10);
        setNationalNo(pokemon.id);
        let typeHtml = '';
        pokemon.types.forEach(type => {
            typeHtml += `${type.type.name.toUpperCase()} `;
        });
        setType(typeHtml);
        setAbilities(pokemon.abilities);
        console.log(pokemon.abilities);
    }

    function showSprites(pokemon) {
        const spritesArray = [];
        const sprites = pokemon.sprites;
        console.log(sprites.other['official-artwork'].front_default);

        if (sprites.front_default) spritesArray.push(sprites.other['official-artwork'].front_default);
        if (sprites.front_shiny) spritesArray.push(sprites.other['official-artwork'].front_shiny);

        setSprites(spritesArray);
        setCurrentIndex(0);
    }

    async function fetchPokemon(){
        try {
            setLoading(true);
            const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const result = await response.json();
            showSprites(result);
            addDetails(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            setLoading(false);
        }
    }

    function handlePrevClick() {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sprites.length - 1));
    }

    function handleNextClick() {
        setCurrentIndex((prevIndex) => (prevIndex < sprites.length - 1 ? prevIndex + 1 : 0));
    }

    useEffect(() => {
        if (!isFetched.current) {
            fetchPokemon();
            isFetched.current = true;
        }
    }, [name]);

    if (loading) {
    return <div>Loading...</div>;
    }

    return (
        <div className='mainDiv'>
            <h1>{name.toUpperCase()}</h1>
            <div className='container1'>
                <div className='spriteContainer'>
                    {sprites.length > 0 && (
                        <div className='spriteWrapper'>
                            <button onClick={handlePrevClick} className='navButton'>&#8592;</button>
                            <img src={sprites[currentIndex]} alt={`Sprite ${currentIndex}`} className='spriteImage' />                        
                            <button onClick={handleNextClick} className='navButton'>&#8594;</button>
                        </div>
                    )}
                </div>
                <div className='details'>
                    <h2>Pokemon Data</h2>
                    <hr />
                    <p>National No: {nationalNo}</p>
                    <hr />
                    <p>Type:{type}</p>
                    <hr />
                    <p>Height:{height}m</p>
                    <hr />
                    <p>Weight:{weight}kg</p>
                    <hr />
                    <p className='Abilities'>Abilities: </p>
                    <ul>
                        {abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name.toUpperCase()}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;