import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectPokemonById } from "../../store/pokemonSlice";

export const DetailsView = () => {
    let params = useParams();
    let pokemon = useAppSelector(selectPokemonById(params.id? parseInt(params.id) : 1));

    return (
        <div>
            <h3>Details about pokemon with ID: {params.id}</h3>
            <img src={pokemon.sprite} alt="Picture" style={{width:"100px"}}/>
            <div style={{padding: "20px"}}>Name: {pokemon.name}</div>
            <div style={{padding: "20px"}}>Type: {pokemon.types}</div>
            <div style={{padding: "20px"}}>Weight: {pokemon.weight}</div>
            {/* <div style={{padding: "20px"}}>Types: {pokemon.types}</div> */}
            <Link to="/">Back</Link>
        </div>
    );
}

export default DetailsView;
