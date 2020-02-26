import React from "react";
import "../DropDown.css";

const DropDown = (props) => {
    return (
        <div className="drop-down">
        {props.suggested ? (
          props.suggested.map((pokemon, index) => {
            return (
              <h3 className="pokeList" key={index} onClick={() => props.handleInputClick(index)}>
                {pokemon.name}
              </h3>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    )
}

export default DropDown