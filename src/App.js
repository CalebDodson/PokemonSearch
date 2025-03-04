import { useState, useRef } from "react";

function App() {
  const searchInputRef = useRef(null);
  
  const [pokemonInfo, setPokemonInfo] = useState({
    imgUrl: "",
    name: "",
    id: "",
    weight: "",
    height: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      spAttack: "",
      spDefense: "",
      speed: ""
    },
    types: []
  });

  async function getData() {
    const nameOrId = searchInputRef.current.value.toLowerCase();

    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setPokemonInfo({
        imgUrl: json.sprites.front_default,
        name: `${json.name[0].toUpperCase() + json.name.slice(1)}`,
        id: `#${json.id}`,
        weight: json.weight,
        height: json.height,
        stats: {
          hp: json.stats[0].base_stat,
          attack: json.stats[1].base_stat,
          defense: json.stats[2].base_stat,
          spAttack: json.stats[3].base_stat,
          spDefense: json.stats[4].base_stat,
          speed: json.stats[5].base_stat
        },
        types: json.types
      });
    }
    catch (error) {
      alert("Pokémon not found");
      console.error(error.message);
    }
  }

  

  return (
    <div className="app">
      <div className="header">
        <h1>Pokémon Search</h1>
        <h2>Search for <span id="nowrap">Pokémon Name or ID:</span></h2>
        <div className="searchContainer">
          <input id="search-input" ref={searchInputRef} autocomplete="off" spellcheck="false" required />
          <button id="search-button" onClick={getData}>Search</button>
        </div>
      </div>
      <div className="pokemonContainer">
        {pokemonInfo.name && (
          <div>
            <p id="pokemon-name">{pokemonInfo.name} {pokemonInfo.id}</p>
            <p id="weight">Weight: {pokemonInfo.weight} Height: {pokemonInfo.height}</p>
            <div className="imgContainer">
              <img id="pokemon-img" src={pokemonInfo.imgUrl} alt={pokemonInfo.name}></img>
            </div>
            <div id="pokemon-types">
              {pokemonInfo.types.length > 0 && (
                <div className="typesContainer">
                  {pokemonInfo.types.map((type, index) => (
                    <p key={index} id={type.type.name} className="type">{type.type.name[0].toUpperCase() + type.type.name.slice(1)}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="statInfoContainer">
        <div className="baseContainer">
          <p className="box stat"><strong>Base</strong></p>
          <p className="box stat">HP:</p>
          <p className="box stat">Attack:</p>
          <p className="box stat">Defense:</p>
          <p className="box stat">Sp. Attack:</p>
          <p className="box stat">Sp. Defense:</p>
          <p className="box stat">Speed:</p>
        </div>
        <div className="statsContainer">
          <p className="box stat"><strong>Stats</strong></p>
          <p id="hp" className="box stat">{pokemonInfo.stats.hp}</p>
          <p id="attack" className="box stat">{pokemonInfo.stats.attack}</p>
          <p id="defense" className="box stat">{pokemonInfo.stats.defense}</p>
          <p id="special-attack" className="box stat">{pokemonInfo.stats.spAttack}</p>
          <p id="special-defense" className="box stat">{pokemonInfo.stats.spDefense}</p>
          <p id="speed" className="box stat">{pokemonInfo.stats.speed}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
