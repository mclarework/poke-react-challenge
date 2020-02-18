import React, { Component } from "react";
import "./App.css";
import AutoSuggest from "./components/AutoSuggest";

class App extends Component {
  state = {
    pokemon: null,
    userValue: ""
  };

  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    console.log(data.results);
    this.setState({ pokemon: data.results });
  }

  handleChange = event => {
    this.setState({ userValue: event.target.value });
  };

  handleInputClick = selected => {
    console.log(selected);
    this.setState({ userValue: selected });
  };
  render() {
    const { pokemon, userValue } = this.state;
    return (
      <div>
        <AutoSuggest
          data={pokemon}
          userValue={userValue}
          handleChange={this.handleChange}
          handleInputClick={this.handleInputClick}
        />
      </div>
    );
  }
}

export default App;
