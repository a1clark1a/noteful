import React, { Component } from "react";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import DisplayNoteList from "../DisplayNotesList/DisplayNotesList";
import ErrorBoundary from "../Error/ErrorBoundary";
import "./MainRoute.css";

class MainRoute extends Component {
  render() {
    return (
      <ErrorBoundary>
        <section className="sidebar">
          <DisplayFolder />
        </section>
        <section className="notesList">
          <DisplayNoteList />
        </section>
      </ErrorBoundary>
    );
  }
}

export default MainRoute;
