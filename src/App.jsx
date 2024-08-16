import React, { Component } from "react";
import CardList from "./CardList.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Searchbox from "./Searchbox.jsx";
import Scroll from "./Scroll.jsx";
import ParticlesComponent from "./Particles.jsx";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { searchfield, robots } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });
    if (robots.length === 0) {
      return <h1>Loading....</h1>;
    } else {
      return (
        <div className="tc">
          <ParticlesComponent id="particles" />
          <h1>RoboFriends</h1>
          <Searchbox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  }
}
export default App;
