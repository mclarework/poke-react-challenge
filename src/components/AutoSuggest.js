import React from "react";
import "../autoSuggest.css";

const AutoSuggest = props => {
  return (
    <div>
      <input onChange={props.handleChange} value={props.userValue} />
      <button
        onClick={() => {
          props.handleButtonClick(props.data);
        }}
      >
        Search for Pokemon data
      </button>
      <div className="drop-down">
        {props.data ? (
          props.data.map((pokemon, index) => {
            return (
              <h1 key={index} onClick={() => props.handleInputClick(pokemon.name, index)}>
                {pokemon.name}
              </h1>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default AutoSuggest;
