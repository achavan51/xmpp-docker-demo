import React, { Component } from "react";
import Logo from "../../assets/img/logo.png";
import "../../Styles/onboard.scss";
import "../../Styles/multiInput.scss";

import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export class invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      social: "",
      message: "",
      tags: [],
      isEmail: false,
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  verifyEmail = (result) => {
    this.setState({
      isEmail: result,
    });
  };
  ValidateEmail = (email) => {
    console.log("email", email);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  updateMessage = (message) => {
    console.log("message", message);
    this.setState({
      message: message,
    });
  };
  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  };

  handleAddition = (tag) => {
    console.log("tag", tag);
    console.log("verify", this.ValidateEmail(tag.email));
    if (this.ValidateEmail(tag.email)) {
      this.updateMessage("");
      this.setState((state) => ({ tags: [...state.tags, tag] }));
    } else {
      this.updateMessage("Please Enter a valid email address.");
    }
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    // re-render
    this.setState({ tags: newTags });
  };

  handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  render() {
    const { email, message, tags } = this.state;
    return (
      <div className="row bg-onboard " style={{ margin: "0" }}>
        <div className="col-md-6 col-sm-12" style={{ margin: "0 auto" }}>
          <div className="card">
            {message.length > 0 ? <p className="error"> {message}</p> : null}
            <div className="row">
              <div className="col-md-12" style={{ textAlign: "center" }}>
                <img src={Logo} alt="Oppn Logo" className="img-responsive1" />
              </div>
            </div>
            <div className="card-body row">
              <div className="col-sm">
                <form onSubmit={this.submitHandler}>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label padr-0">
                      Invite team
                    </label>
                    <div className="col-sm-7">
                      <div
                        className="form-check form-check-inline"
                        style={{ paddingTop: "10px" }}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          name="social"
                          id="inlineRadio1"
                          value={"Google"}
                          onChange={this.changeHandler}
                          checked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Google
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="social"
                          id="inlineRadio2"
                          value={"Social"}
                          onChange={this.changeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Microsoft
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-sm-3 col-form-label padr-0"
                    >
                      Invite team member
                    </label>
                    <div className="col-sm-9">
                      <ReactTags
                        autocomplete={true}
                        tags={tags}
                        delimiters={delimiters}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        handleTagClick={this.handleTagClick}
                        handleInputBlur={this.handleInputBlur}
                        inline={true}
                        placeholder="Enter Email Address"
                        labelField={"email"}
                        inputFieldPosition="top"
                        classNames={{
                          // tags: "tagsClass",
                          // tagInput: "tagInputClass",
                          tagInputField: "form-control mb-2",
                          // selected: "selectedClass",
                          // tag: "tagClass",
                          // remove: "removeClass",
                          // suggestions: "suggestionsClass",
                          // activeSuggestion: "activeSuggestionClass",
                        }}
                        allowDeleteFromEmptyInput={false}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Get a link to invite
                    </label>
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-link">
                        <i className="fa fa-link" />
                      </button>
                    </div>
                  </div>
                  <div className="form-group row" />
                  <button
                    className="btn btn-lg btn-block cus-button"
                    type="submit"
                  >
                    Invite
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default invite;
