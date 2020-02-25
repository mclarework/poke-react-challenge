import React from "react";
import "../autoSuggest.css";
import DropDown from "./DropDown";

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
      {props.suggested.length > 0 || props.selected.length > 0 ? (
      <DropDown suggested={props.suggested} handleInputClick={props.handleInputClick} selected={props.selected}/>
      ):(
       null
        )}
    </div>
  );
};

export default AutoSuggest;
