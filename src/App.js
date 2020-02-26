import React, { Component } from "react";
import "./App.css";
import AutoSuggest from "./components/AutoSuggest";
import InfoCard from "./components/InfoCard";
import sortBy from "lodash/sortBy"
import poke from "./images/pokemon.png"

class App extends Component {
  state = {
    allPokemon: null,
    userValue: "",
    selectedIndex: null,
    pokemonSelected: [],
    suggested:[],
    index: -1
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
      filter.map((value)=> {
        return value.active = "inactive"
      })
      this.setState({ userValue: event.target.value, suggested:filter});
    }else{
      this.setState({ userValue: event.target.value, suggested:[]})
    }
  };

  handleInputClick = async (index) => {
    const response = await fetch(this.state.suggested[index].url)
    const info = await response.json()
    let pokeArray = this.state.pokemonSelected;
    if (this.state.pokemonSelected.length < 4) {
      pokeArray.push(info);
    }
    this.setState({ userValue:"", selectedIndex: index, suggested:[]});
  };

  handleKeyPress = async (event) => {
    let suggested = this.state.suggested
    let value = event.keyCode
    let index = this.state.index
    switch (true) {
      case value === 38:
        index--
        break
      case value === 40:
        index++
        break
      case value === 13:
        const response = await fetch(this.state.suggested[index].url)
        const info = await response.json()
        let pokeArray = this.state.pokemonSelected;
        if (this.state.pokemonSelected.length < 4) {
          pokeArray.push(info);
        }
        suggested = []
        this.setState({userValue:""})
        break
      default:
        console.log("other input detected")
    }
    if (index > suggested.length-1) {
      index = suggested.length-1
    }else if (index < 0) {
      index = 0
    }
    if (index >= 0 && suggested.length > 0) {
      suggested.map((value)=> {
        return value.active = "inactive"
      })
      suggested[index].active = "active"
    }
    console.log(index)
    this.setState({suggested:suggested, index: index})
  }

  remove = (index) => {
    let storedChar = this.state.pokemonSelected;
    storedChar.splice(index, 1)
    this.setState({pokemonSelected: storedChar})
  }

  render() {
    const { allPokemon, userValue, pokemonSelected, suggested} = this.state;
    return (
      <div className="main">
        <img className="logo" src={poke} alt="poke logo"></img>
        <AutoSuggest
          data={allPokemon}
          userValue={userValue}
          suggested={suggested}
          selected={pokemonSelected}
          handleChange={this.handleChange}
          handleInputClick={this.handleInputClick}
          click={this.nameClicker}
          press={this.handleKeyPress}
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