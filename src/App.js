import React, { Component } from "react";
import "./App.scss";
import HomeComponent from "./homeComponent";
import ExampleStore from "./stores/exampleStore";
import HomePageStore from "./stores/homePageStore";
import { Provider } from "mobx-react";

class App extends Component {
  render() {
    const stores = {
      ExampleStore: new ExampleStore("Example store initialized"),
      HomePageStore: new HomePageStore()
    };
    return (
      <Provider stores={stores}>
        <div className="App">
          <HomeComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
