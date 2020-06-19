import React, { Component } from "react";
import "../../Styles/login.scss";
import { Auth } from "aws-amplify";
import GoogleButton from "react-google-button";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  updateMessage = (message) => {
    console.log("message", message);
    this.setState({
      message: message,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    Auth.signIn(this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6 col-sm-12">
          <div className="card">
            <p className="error"> {message}</p>
            <div className="card-body row">
              <div className="col-sm" />
              <div className="col-sm">
                <form onSubmit={this.submitHandler}>
                  <h3>Let's Connect</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </p>

                  <div className="form-group">
                    <GoogleButton
                      className="googlebutton"
                      type="light" // can be light or dark
                      onClick={() =>
                        Auth.federatedSignIn({ provider: "Google" })
                      }
                    />
                    <hr />
                  </div>
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
                    Login
                  </button>
                </form>
                <p className="anchor">
                  Don't have an account? <a href="/signup">SignUp</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
