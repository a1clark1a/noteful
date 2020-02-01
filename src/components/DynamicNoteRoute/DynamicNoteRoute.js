import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";
import ErrorBoundary from "../Error/ErrorBoundary";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import "./DynamicNoteRoute.css";
import DynamicFolder from "../DynamicFolderRoute/DynamicFolder";

export default class DynamicNoteRoute extends Component {
  static contextType = NotefulContext;
  static defaultProps = {
    folders: [],
    notes: []
  };
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired
  };
  render() {
    const { folders, notes } = this.context;

    const note = notes.find(i => {
      return i.id === Number(this.props.match.params.notes_id);
    });
    const folder = folders.find(i => {
      return i.id === note.folders_id;
    });
    const date = new Date(note.modified);
    return (
      <ErrorBoundary>
        <article className="sidebar">
          <Link to="/">
            <button className="goBack_button">Go back</button>
          </Link>
          <div className="folder_name">
            <h2>{folder.name}</h2>
          </div>
        </article>
        <article className="note_article">
          <h2>{note.name}</h2>
          <code>Date modified: {date.toLocaleDateString()}</code>
          <Link to="/">
            <DeleteNoteButton notes_id={note.id} />
          </Link>
          {/* TODO add an Update notes component */}

          <p className="note_content">{note.content}</p>
        </article>
      </ErrorBoundary>
    );
  }
}

DynamicFolder.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string
    })
  )
};
