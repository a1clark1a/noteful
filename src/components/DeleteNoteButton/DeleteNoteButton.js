import React, { Component } from "react";
import NotefulContext from "../../notefulContext";
import PropTypes from "prop-types";
import config from "../config";

export default class DeleteNoteButton extends Component {
  static contextType = NotefulContext;
  deleteNoteRequest(noteId, callBack) {
    fetch(config.NOTES_API_ENDPOINT + `/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .then(data => {
        callBack(noteId);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <button
        onClick={() => {
          this.deleteNoteRequest(this.props.noteId, this.context.deleteNote);
        }}
      >
        REMOVE
      </button>
    );
  }
}

DeleteNoteButton.defaultProps = {
  onClick: () => {},
  deleteNote: () => {}
};

DeleteNoteButton.propTypes = {
  noteId: PropTypes.number.isRequired,
  deleteNote: PropTypes.func.isRequired
};
