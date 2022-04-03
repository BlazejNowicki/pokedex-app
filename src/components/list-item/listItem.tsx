import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PokemonModel } from "../../types/pokemonTypes";

interface propType {
    data: PokemonModel;
}

export const ListItem = (props: propType) => {
    const data = props.data;
    return (
        <div style={{display:"flex", alignItems: 'center'}}>
            <img src={data.sprite} alt="Picture" style={{width:"150px"}}/>
            <div style={{padding: "20px"}}>Name: {data.name}</div>
            <div style={{padding: "20px"}}>Type: {data.types}</div>
            <Link to={`/details/${data.id}`}>More details</Link> <br />
        </div>
    )
}