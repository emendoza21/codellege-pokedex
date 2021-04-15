import { Component } from "react";

function PokemonCard({ data }) {
  return (
    <div className="flex flex-wrap my-4 ">
      {data.map((pokemon) => (
        <Pokemon key={pokemon.url} {...pokemon} />
      ))}
    </div>
  );
}

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {
        sprites: {},
        types: [],
      },
    };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((result) => result.json())
      .then((json) => {
        this.setState({ pokemon: json });
      });
  }

  getTypeColor = (type) => {
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

  render() {
    const { pokemon } = this.state;
    const color = this.getTypeColor(pokemon.types[0]?.type.name);
    return (
      <div className="pl-2 m-2 relative">
        <div
          className={`hover:bg-opacity-80  w-56 h-36 rounded-lg bg-${color}`}
        >
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
}
export default PokemonCard;
