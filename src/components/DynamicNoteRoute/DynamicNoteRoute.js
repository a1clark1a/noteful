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
      return i.id === this.props.match.params.noteId;
    });
    const folder = folders.find(i => {
      return i.id === note.folderId;
    });
    return (
      <ErrorBoundary>
        <section>
          <Link to="/">
            <h2>Go back</h2>
          </Link>
          <h2>{folder.name}</h2>
        </section>
        <article className="notes">
          <div>
            <h2>{note.name}</h2>
            <code>{note.modified}</code>
            <Link to="/">
              <DeleteNoteButton noteId={note.id} />
            </Link>
          </div>
          <p>{note.content}</p>
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
