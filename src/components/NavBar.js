import Pokeimagen from "../Asset/pokemon.png";
import PropTypes from "prop-types";

function NavBar({ onChange, value }) {
  return (
    <div className="bg-red-500 p-6 flex justify-between ">
      <img className="w-22 h-12" src={Pokeimagen} alt="pake Imagen"></img>
      <form>
        <input
          name="search"
          value={value}
          onChange={onChange}
          type="text"
          placeholder="Nombre Pokemon"
          className="p-1 bg-white"
        />
        <button className="bg-yellow-500 text-white py-1 px-3 font-semibold">
          Buscar
        </button>
      </form>
    </div>
  );
}

NavBar.propTypes = {
  onChange: PropTypes.string,
  value: PropTypes.string,
};

export default NavBar;
