import React, { Component } from "react";
import NotefulContext from "../../notefulContext";
import PropTypes from "prop-types";
import config from "../config";

export default class DeleteNoteButton extends Component {
  static contextType = NotefulContext;
  deleteNoteRequest(notes_id, callBack) {
    fetch(config.NOTES_API_ENDPOINT + `/${notes_id}`, {
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
        callBack(notes_id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <button
        className="remove_button"
        onClick={() => {
          this.deleteNoteRequest(this.props.notes_id, this.context.deleteNote);
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
  notes_id: PropTypes.number.isRequired,
  deleteNote: PropTypes.func.isRequired
};
