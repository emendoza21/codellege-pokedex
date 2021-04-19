import { useEffect, useState } from "react";

function PokemonCard({ data }) {
  return (
    <div className="flex flex-wrap my-4 ">
      {data.map((pokemon) => (
        <Pokemon key={pokemon.url} {...pokemon} />
      ))}
    </div>
  );
}

function Pokemon({ url }) {
  const [pokemon, setPokemon] = useState({ sprites: [], types: [] });

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((json) => {
        setPokemon(json);
      });
  }, []);

  const getTypeColor = (type) => {
    const TYPE_COLORS = {
      water: "blue-500",
      fire: "red-500",
      grass: "green-500",
      bug: "yellow-600",
      normal: "gray-400",
      poison: "purple-500",
      fairy: "pink-500",
    };
    return TYPE_COLORS[type] || "gray-500";
  };

  const types = pokemon.types.map((type) => type.type.name);
  const color = getTypeColor(types[0]);

  return (
    <div className=" m-2 relative">
      <div className={`hover:bg-opacity-80  w-60 h-40 rounded-lg bg-${color}`}>
        <h2 className=" font-bold text-white capitalize p-4 text-xl ">
          {pokemon.name}
        </h2>

        <div className="pl-3">
          {pokemon.types.map((type) => {
            return (
              <span
                className={`bg-white rounded bg-opacity-25 p-1   text-white mx-1 my-1`}
              >
                {type.type.name}
              </span>
            );
          })}
          <div>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-26 flex justify-end absolute right-0 bottom-0"
            />
            <h1 className="text-white pt-6">#{pokemon.id}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
