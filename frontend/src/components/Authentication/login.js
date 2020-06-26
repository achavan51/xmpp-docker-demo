import React, { Component } from "react";
import "../../Styles/signup.scss";
import { Auth } from "aws-amplify";
import axios from "axios";
import GoogleButton from "react-google-button";
import Logo from "../../assets/img/logo.png";
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
  getUser(email) {
    axios
      .get("http://localhost:8000/dev/get_User?filter=" + email)
      .then((response) => {
        console.log(response);
        localStorage.setItem("User_id", response.data._id);
        this.props.history.push("/onboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    Auth.signIn(this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        console.log(JSON.stringify(response.keyPrefix));
        localStorage.setItem(
          "Token",
          response.signInUserSession.accessToken.jwtToken
        );
        this.getUser(this.state.email);
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="row bg-signup" style={{ margin: "0" }}>
        <div className="col-md-6 col-sm-12" style={{ margin: "0 auto" }}>
          <div className="card">
            {message.length > 0 ? <p className="error"> {message}</p> : null}
            <div className="card-body row">
              <div className="col-sm">
                <img className="img-responsive" src={Logo} alt="Oppn Logo" />
              </div>
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
                      type="password"
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
