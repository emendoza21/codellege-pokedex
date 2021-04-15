import { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PokemonCard from "./components/PokemonCard";

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
        <PokemonCard data={data} />
      </div>
    );
  }
}

export default App;
