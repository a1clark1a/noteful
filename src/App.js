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
          <Switch>
            <Route path="/folder/:folderId" component={DynamicFolder} />
            <Route path="/note/:noteId" component={DynamicNoteRoute} />
            <Route exact path="/" component={MainRoute} />
            <Route path="/*" component={Error} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
