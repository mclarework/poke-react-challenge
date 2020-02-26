import React from "react";
import "../infoCard.css";

const InfoCard = props => {
  // console.log(props.pokemonData);
  let arr = props.pokemonData.name.charAt(0).toUpperCase() + props.pokemonData.name.slice(1)
  return (
    <div className="card">
      <div className="pics">
        <img className="poke" src={props.pokemonData.sprites.front_default} alt="pokemon character"/>
        <img className="deleteIcon" onClick={() => props.click(props.label)} src="https://img.icons8.com/cotton/64/000000/delete-sign--v1.png" alt="delete"></img>
      </div>
      <div className="info">
        <h3>Name: <span>{arr}</span></h3>
        <h3>Height: <span>{props.pokemonData.height}</span></h3>
        <h3 className="subTitle">Abiltities</h3>
        {props.pokemonData.abilities.map((ability, index) => {
          return <p key={index}>{ability.ability.name}</p>;
        })}
        <h3 className="subTitle">Stats: </h3>
        {props.pokemonData.stats.map((currentStat, index) => {
          return (
            <p key={index}>
              {currentStat.stat.name}: {currentStat.base_stat}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;
