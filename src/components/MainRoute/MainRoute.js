import React, { Component } from "react";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import DisplayNoteList from "../DisplayNotesList/DisplayNotesList";
import "./MainRoute.css";

class MainRoute extends Component {
  render() {
    return (
      <>
        <section>
          <div className="sidebar">
            <DisplayFolder />
            <button>Add a folder</button>
          </div>
        </section>
        <section className="notesList">
          <DisplayNoteList />
          <button>Add a note</button>
        </section>
      </>
    );
  }
}

export default MainRoute;
