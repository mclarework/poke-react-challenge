import React, { Component } from "react";
import "./App.css";
import AutoSuggest from "./components/AutoSuggest";
import InfoCard from "./components/InfoCard";
import sortBy from "lodash/sortBy"

class App extends Component {
  state = {
    allPokemon: null,
    userValue: "",
    selectedIndex: null,
    pokemonSelected: [],
    suggested: []
  };

  //this is a React lifecycle method (part of react)
  //you may want to look it up, and also might want to remind yourself about async/await
  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    const alphabetical = sortBy(data.results,"name")
    this.setState({ allPokemon: alphabetical });
    let arr = await alphabetical.map(pokeObj => {
      return { name: pokeObj.name.charAt(0).toUpperCase() + pokeObj.name.slice(1), url: pokeObj.url}
    })
    this.setState({ allPokemon: arr});
  }

  handleChange = event => {
    const all = this.state.allPokemon
    const input = event.target.value
    let filter = null
    if (event.target.value.length > 0){
      filter = all.filter( pokemon =>{
        return pokemon.name.toLowerCase().slice(0, input.length).indexOf(input.toLowerCase()) > -1
      })
      this.setState({ userValue: event.target.value, suggested:filter});
    }else{
      this.setState({ userValue: event.target.value, suggested:[]})
    }
  };

  handleInputClick = async (selectedName, index) => {
    this.setState({ userValue: selectedName, selectedIndex: index });
  };

  remove = (index) => {
    let storedChar = this.state.pokemonSelected;
    storedChar.splice(index, 1)
    this.setState({pokemonSelected: storedChar})
  }

  handleButtonClick = async data => {
    const response = await fetch(data[this.state.selectedIndex].url);
    const info = await response.json();
    console.log(info)
    let pokeArray = this.state.pokemonSelected;
    if(this.state.pokemonSelected.length < 4){
      pokeArray.push(info);
    }
    this.setState({ pokemonSelected: pokeArray });
  };
  render() {
    const { allPokemon, userValue, pokemonSelected, suggested } = this.state;
    return (
      <div>
        <AutoSuggest
          data={allPokemon}
          userValue={userValue}
          suggested={suggested}
          handleChange={this.handleChange}
          handleInputClick={this.handleInputClick}
          handleButtonClick={this.handleButtonClick}
        />
        <div className="card-container">
          {pokemonSelected.map((pokemon, index) => {
            return (
              <div>
                <InfoCard click={() => this.remove(index)} key={index} pokemonData={pokemon} pokemonName={allPokemon} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
