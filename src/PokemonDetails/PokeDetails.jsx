import React from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { name } = useParams(); // Retrieve the Pokemon name from the URL

    return (
        <div>
            <h1>{name.toUpperCase()} Details</h1>
            {/* Add your own content here */}
        </div>
    );
}

export default PokemonDetails;