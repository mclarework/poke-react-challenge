import React from "react";
import "../autoSuggest.css";
import DropDown from "./DropDown";

const AutoSuggest = props => {
  return (
    <div>
      <div className="ui">
        <input onChange={props.handleChange} value={props.userValue} placeholder="Search for Pokémon Data" onKeyUp={props.press}/>
      </div>
      {props.suggested.length > 0 ? (
      <DropDown suggested={props.suggested} handleInputClick={props.handleInputClick} selected={props.selected}/>
      ):(
        null
        )}
    </div>
  );
};

export default AutoSuggest;
