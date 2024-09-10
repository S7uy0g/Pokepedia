import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams();

    return (
        <div>
            <h1>{name.toUpperCase()}</h1>
            <div>
                <img src="" alt="" />
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