import React, { Component } from "react";
import "../../Styles/signup.scss";
import { Auth, Hub } from "aws-amplify";
import GoogleButton from "react-google-button";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationCode: "",
      confirmSignUp: false,
      message: "",
    };
    Hub.listen("auth", (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
      console.log(
        "A new auth event has happened: ",
        data.payload.data.username + " has " + data.payload.event
      );
    });
  }

  updateState = () => {
    this.setState({
      confirmSignUp: !this.state.confirmSignUp,
    });
  };
  updateMessage = (message) => {
    console.log("message", message);
    this.setState({
      message: message,
    });
  };

  onAuthEvent(payload) {
    console.log("payload", payload);
    // ... your implementation
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        email: this.state.email,
      },
    })
      .then((response) => {
        console.log(response);
        this.updateState();
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };
  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      .then((response) => {
        console.log(response);
        this.props.history.push("/login");
        this.updateState();
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };

  render() {
    const { email, password, confirmationCode, message } = this.state;
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <p className="error"> {message}</p>
            <div className="card-body row">
              <div className="col-sm social">
                <h4>Sign Up with your social account</h4>
                <hr />
                <GoogleButton
                  className="googlebutton"
                  label="Sign Up With Google"
                  type="light" // can be light or dark
                  onClick={() => Auth.federatedSignIn({ provider: "Google" })}
                />
              </div>
              <div className="col-sm">
                <form onSubmit={this.submitHandler}>
                  <h3>Let's Connect</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </p>

                  {this.state.confirmSignUp ? (
                    <div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Confirmation Code"
                          type="text"
                          name="confirmationCode"
                          value={confirmationCode}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <button
                        className="btn btn-lg btn-block"
                        type="button"
                        onClick={this.confirmSignUp}
                      >
                        Confirm Sign Up
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Username"
                          type="text"
                          name="email"
                          value={email}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="text"
                          name="password"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <button className="btn btn-lg btn-block" type="submit">
                        Sign Up
                      </button>
                    </div>
                  )}
                </form>
                <p className="anchor">
                  Already have an account?
                  <a href="/login"> Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
