import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import MainRoute from "./components/MainRoute/MainRoute";
import DynamicFolder from "./components/DynamicFolderRoute/DynamicFolder";
import DynamicNoteRoute from "./components/DynamicNoteRoute/DynamicNoteRoute";
import Error from "./components/Error/Error";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <h1>Noteful App</h1>
            </Link>
          </nav>
        </header>
        <main className="App">
          <Route path="/:folderId" component={DynamicFolder} />
          <Switch>
            <Route exact path="/" component={MainRoute} />
            <Route path="/:noteId" component={DynamicNoteRoute} />
            <Route component={Error} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
