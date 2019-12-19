import React, { Component } from "react";
import NotefulContext from "../../notefulContext";
import ValidationError from "../ValidationError/ValidationError";
import { validate } from "../ValidationError/HelperValidation";

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        input: "name",
        value: "",
        touched: false
      }
    };
  }

  static contextType = NotefulContext;

  updateName(name) {
    this.setState({
      name: {
        input: "name",
        value: name,
        touched: true
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const folderName = this.state.name.value;
    const folderId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);

    const folderObject = {
      name: folderName,
      id: folderId
    };

    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      body: JSON.stringify(folderObject),
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
        this.context.addFolder(data);
      })
      .catch(error => {
        console.log("folder posting", { error });
      });
  };

  handClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="addFolder_Form" onSubmit={e => this.handleSubmit(e)}>
        <h2>ADD FOLDER</h2>
        <fieldset className="addFolder_group_name">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="addFolder_nameInput"
            name="name"
            id="name"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.name.touched && (
            <ValidationError message={validate(this.state.name)} />
          )}
          <button type="submit" disabled={(this, validate(this.state.name))}>
            ADD
          </button>
        </fieldset>
        <button type="button" onClick={this.handClickCancel}>
          CANCEL
        </button>
      </form>
    );
  }
}
