import React, { useState, useEffect } from "react";
import "./List.css";

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

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  
  const fetchPokemonDetails = async (pokemonUrl) => {
    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for URL: ${pokemonUrl}`);
      }
      const pokemonDetails = await response.json();
      return {
        name: pokemonDetails.name,
        sprite: pokemonDetails.sprites.front_default,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        types: pokemonDetails.types.map(type => type.type.name.toUpperCase()),
      };
    } catch (error) {
      console.error(`Error fetching Pokémon details: ${error.message}`);
      return null;
    }
  };

  
  const getDetailedPokemonList = async (pokemonData) => {
    try {
      const promises = pokemonData.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );
      const results = await Promise.all(promises);

      
      return results.filter((result) => result !== null);
    } catch (error) {
      console.error("Error fetching detailed Pokémon list:", error);
      return [];
    }
  };

  
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=0`
        );
        const result = await response.json();
        const pokemonData = result.results;

        
        const detailedPokemonList = await getDetailedPokemonList(pokemonData);

        setPokemonList(detailedPokemonList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [currentLimit]); 

  const loadMorePokemon = async () => {
    try {
      setLoadingMore(true); 
      const newLimit = currentLimit + 10;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${newLimit}&offset=0`
      );
      const result = await response.json();
      const pokemonData = result.results.slice(currentLimit, newLimit);

      
      const morePokemonDetails = await getDetailedPokemonList(pokemonData);

      setPokemonList((prevList) => [...prevList, ...morePokemonDetails]); 
      setCurrentLimit(newLimit); 
      setLoadingMore(false); 
    } catch (error) {
      console.error("Error loading more Pokémon:", error);
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="pokemon-container">
        {pokemonList.map((pokemon, index) => {
          
          const mainType = pokemon.types[0];
          const background = typeBackgrounds[mainType] || "linear-gradient(to top, #FFFFFF, #CCCCCC)";

          return (
            <div key={index} className="pokemon-card" style={{ background }}>
              <div className="heading1">
                <img src={pokemon.sprite} alt={pokemon.name} />
                <p>{pokemon.name.toUpperCase()}</p>
              </div>
              <h1>TYPE</h1>
              <div className="heading2">
                <p>{pokemon.types[0]}</p>
                <p>{pokemon.types[1]}</p>
              </div>
              <div className="heading3">
                <div className="div1">
                    <h1>HEIGHT</h1>
                    <p>{pokemon.height / 10} m</p>
                </div>
                <div className="div2">
                    <h1>WEIGHT</h1>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={loadMorePokemon} disabled={loadingMore}>
        {loadingMore ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default PokemonList;
