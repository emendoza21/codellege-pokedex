import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((result) => result.json())
      .then((json) => {
        setPokemos(json.results);
      });
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const filterPokemons = () => {
    const filter = search.toLowerCase();
    return pokemons.filter((pokemon) => pokemon.name.startsWith(filter));
  };

  const data = filterPokemons();
  return (
    <div>
      <NavBar onChange={handleChange} value={search} />
      <h1 className="text-gray-600 font-bold text-4xl pt-5 mx-6">Pokedex</h1>

      <div style={{ marginLeft: 30 }}>
        <PokemonCard data={data} />
      </div>
    </div>
  );
}

export default App;
