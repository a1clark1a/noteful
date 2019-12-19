import React, { Component } from "react";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import DisplayNoteList from "../DisplayNotesList/DisplayNotesList";
import ErrorBoundary from "../Error/ErrorBoundary";
import "./MainRoute.css";

class MainRoute extends Component {
  render() {
    return (
      <ErrorBoundary>
        <section>
          <div className="sidebar">
            <DisplayFolder />
          </div>
        </section>
        <section className="notesList">
          <DisplayNoteList />
        </section>
      </ErrorBoundary>
    );
  }
}

export default MainRoute;
