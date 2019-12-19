import React, { Component } from "react";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import "./DynamicFolder.css";
import DisplayNoteList from "../DisplayNotesList/DisplayNotesList";
import ErrorBoundary from "../Error/ErrorBoundary";

export default class DynamicFolder extends Component {
  render() {
    const clickedfolder = this.props.match.params.folderId;
    return (
      <ErrorBoundary>
        <section className="sidebar">
          <DisplayFolder />
        </section>
        <section className="noteList">
          <DisplayNoteList clickedfolderId={clickedfolder} />
        </section>
      </ErrorBoundary>
    );
  }
}
