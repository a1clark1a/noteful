import React, { Component } from "react";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import "./DynamicFolder.css";
import DisplayNoteList from "../DisplayNotesList/DisplayNotesList";
import ErrorBoundary from "../Error/ErrorBoundary";
import ReactRouterPropTypes from "react-router-prop-types";

export default class DynamicFolder extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired
  };
  render() {
    const clickedfolder = Number(this.props.match.params.folders_id);
    return (
      <ErrorBoundary>
        <section className="sidebar">
          <DisplayFolder />
        </section>
        <section className="notesList">
          <DisplayNoteList clickedfolderId={clickedfolder} />
        </section>
      </ErrorBoundary>
    );
  }
}
