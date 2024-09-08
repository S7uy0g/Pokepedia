import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams();

    return (
        <div>
            <h1>{name.toUpperCase()} Details</h1>
        </div>
    );
}

export default PokemonDetails;