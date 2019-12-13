import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import MainRoute from "./components/MainRoute/MainRoute";
import DynamicFolder from "./components/DynamicFolderRoute/DynamicFolder";
import DynamicNoteRoute from "./components/DynamicNoteRoute/DynamicNoteRoute";
import Error from "./components/Error/Error";
import STORE from "./dummy-store";
import "./App.css";

class App extends Component {
  render() {
    const { folders, notes } = STORE;
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
            {/*<Route path="/folder/:folderId" component={DynamicFolder} />*/}
            <Route
              path="/folder/:folderId"
              render={props => {
                return (
                  <DynamicFolder folders={folders} notes={notes} {...props} />
                );
              }}
            />
            <Route
              path="/note/:noteId"
              render={props => {
                return (
                  <DynamicNoteRoute
                    folders={folders}
                    notes={notes}
                    {...props}
                  />
                );
              }}
            />
            <Route
              exact
              path="/"
              render={props => {
                return <MainRoute folders={folders} notes={notes} {...props} />;
              }}
            />
            <Route path="/*" component={Error} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
