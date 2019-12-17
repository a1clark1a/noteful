import React, { Component } from "react";
import NotefulContext from "../../notefulContext";

export default class DeleteNoteButton extends Component {
  static contextType = NotefulContext;
  deleteNoteRequest(noteId, callBack) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
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
        return res.json();
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
  onClick: () => {}
};
