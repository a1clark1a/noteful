import React, { Component } from "react";
import NotefulContext from "../../notefulContext";
import ValidationError from "../ValidationError/ValidationError";
import ReactRouterPropTypes from "react-router-prop-types";
import { validate } from "../ValidationError/HelperValidation";
import PropTypes from "prop-types";
import config from "../config";

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

  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired
  };
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

    fetch(config.FOLDERS_API_ENDPOINT, {
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
      <div className="form_wrapper">
        <form className="addFolder_Form" onSubmit={e => this.handleSubmit(e)}>
          <fieldset className="addFolder_group_name">
            <legend>ADD FOLDER</legend>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              className="addFolder_nameInput"
              name="name"
              id="name"
              aria-label="Folder Name"
              aria-required="true"
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
      </div>
    );
  }
}

AddFolder.defaultProps = {
  addFolder: () => {}
};

AddFolder.propTypes = {
  addFolder: PropTypes.func.isRequired
};
