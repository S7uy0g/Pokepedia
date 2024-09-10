import React from 'react';
import './style.css'; 
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [sprites, setSprites] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFetched = useRef(false);

    function showSprites(pokemon) {
        const spritesArray = [];
        const sprites = pokemon.sprites;

        if (sprites.front_default) spritesArray.push(sprites.front_default);
        if (sprites.back_default) spritesArray.push(sprites.back_default);
        if (sprites.front_shiny) spritesArray.push(sprites.front_shiny);
        if (sprites.back_shiny) spritesArray.push(sprites.back_shiny);

        setSprites(spritesArray);
        setCurrentIndex(0);
    }

    async function fetchPokemon(){
        try {
            setLoading(true);
            const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const result = await response.json();
            console.log(result);
            showSprites(result);
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
            <div>
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
                    <p>National No:</p>
                    <p>Type</p>
                    <p>Height</p>
                    <p>Weight</p>
                    <p>Abilities</p>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;