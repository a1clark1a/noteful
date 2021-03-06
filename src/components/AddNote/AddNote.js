import React, { Component } from "react";
import NotefulContext from "../../notefulContext";
import { validate } from "../ValidationError/HelperValidation";
import ValidationError from "../ValidationError/ValidationError";
import PropTypes from "prop-types";
import config from "../config";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        input: "name",
        value: "",
        touched: false
      },
      folders_id: {
        input: "option",
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      }
    };
  }
  static contextType = NotefulContext;

  updateName = name => {
    this.setState({
      name: {
        input: "name",
        value: name,
        touched: true
      }
    });
  };

  updateContent = content => {
    this.setState({
      content: {
        value: content,
        touched: true
      }
    });
  };

  updateSelect = option => {
    this.setState({
      folders_id: {
        input: "option",
        value: option,
        touched: true
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, folders_id, content } = this.state;
    const notes_id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const date = new Date().toUTCString();

    const noteObj = {
      id: notes_id,
      name: name.value,
      modified: date,
      folders_id: folders_id.value,
      content: content.value
    };

    fetch(config.NOTES_API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(noteObj),
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
        this.props.history.push("/");
        this.context.addNote(data);
      })
      .catch(error => {
        console.log("note posting", error);
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };
  render() {
    const folderList = this.context.folders;
    const folderOptions = folderList.map((folder, i) => {
      return (
        <option key={`option_${i}`} value={folder.id}>
          {folder.name}
        </option>
      );
    });
    return (
      <div className="form_wrapper">
        <form className="addNote_Form" onSubmit={e => this.handleSubmit(e)}>
          <fieldset className="addNote_group">
            <legend>ADD NOTE</legend>
            <fieldset className="nameInputField">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                className="addNote_nameInput"
                name="name"
                id="name"
                aria-label="Note name"
                aria-required="true"
                onChange={e => this.updateName(e.target.value)}
              />
              {this.state.name.touched && (
                <ValidationError message={validate(this.state.name)} />
              )}
            </fieldset>
            <fieldset className="contentInputField">
              <label htmlFor="content">Content </label>
              <input
                type="text"
                className="addNote_contentInput"
                name="content"
                id="content"
                aria-label="Note content"
                onChange={e => this.updateContent(e.target.value)}
              />
            </fieldset>
            <fieldset className="folderSelectField">
              <label htmlFor="folders">Select Folder</label>
              <select
                className="addNote_select"
                aria-label="Folder to place the note in"
                aria-required="true"
                onChange={e => this.updateSelect(e.target.value)}
              >
                <option></option>
                {folderOptions}
              </select>
              {this.state.folders_id.touched && (
                <ValidationError message={validate(this.state.folders_id)} />
              )}
            </fieldset>
            <button
              type="submit"
              disabled={
                validate(this.state.name) || validate(this.state.folders_id)
              }
            >
              ADD NOTE
            </button>
            <button type="button" onClick={this.handleClickCancel}>
              CANCEL
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddNote.defaultProps = {
  addNote: () => {},
  history: {},
  folders: []
};

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
  addNote: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};
