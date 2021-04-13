import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      search: "",
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((result) => result.json())
      .then((json) => {
        this.setState({ pokemons: json.results });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterPokemons = () => {
    const search = this.state.search.toLowerCase();
    return this.state.pokemons.filter((pokemon) =>
      pokemon.name.startsWith(search)
    );
  };

  render() {
    const data = this.filterPokemons();
    return (
      <div>
        <NavBar onChange={this.handleChange} value={this.state.search} />
        <h1 className="text-gray-600 font-bold text-4xl mx-6">Pokedex</h1>
        <Pokemons data={data} />
      </div>
    );
  }
}

function NavBar({ onChange, value }) {
  return (
    <div className="bg-white p-6 flex justify-between ">
      <img
        className="w-4 h-3"
        src="https://www.pikpng.com/pngl/b/365-3650457_flecha-hacia-la-derecha-png-arrow-left-to.png"
        alt="flecha"
      ></img>
      <form>
        <input
          name="search"
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Nombre Pokemon"
          className="p-1 bg-gray-300"
        />
        <button className="bg-yellow-500 text-white py-1 px-3 font-semibold">
          Buscar
        </button>
      </form>
    </div>
  );
}

function Pokemons({ data }) {
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
          <h2 className=" font-bold text-white capitalize p-1 text-xl ">
            {pokemon.name}
          </h2>

          <div className="">
            {pokemon.types.map((type) => {
              return (
                <span
                  className={`bg-white rounded bg-opacity-25 p-1  text-white mx-1 my-1`}
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
              <h1 className="text-white">#{pokemon.id}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
