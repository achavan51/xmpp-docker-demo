import React, { Component } from "react";
import "../../Styles/signup.scss";
import { Auth, Hub } from "aws-amplify";
import axios from "axios";
import GoogleButton from "react-google-button";
import Logo from "../../assets/img/logo.png";
// import queryString from "query-string";
var generator = require("generate-password");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      oldPassword: "",
      newPassword: "",
      confirmationCode: "",
      formType: "signup",
      message: "",
      formTypes: ["submit", "confirmation", "signup"],
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

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let form = params.get("formType");
    let email = params.get("email");
    let code = params.get("code");
    console.log(form);
    if (!!form && this.state.formTypes.includes(form)) {
      this.updateState(form);
    }
    if (!!form && this.state.formTypes.includes(form) && !!email && !!code) {
      console.log(email, code, form);
      this.changeHandler({
        target: {
          name: "email",
          value: email,
        },
      });
      this.changeHandler({
        target: {
          name: "confirmationCode",
          value: code,
        },
      });
      this.getUser(email);
    }
  }
  updateState = (page) => {
    this.setState({
      formType: page,
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
  getUser(email) {
    axios
      .get("http://localhost:8000/dev/get_User?filter=" + email)
      .then((response) => {
        console.log(response);
        localStorage.setItem("User_id", response.data._id);
        this.changeHandler({
          target: { name: "oldPassword", value: response.data.temp_password },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  saveUser(email, password) {
    axios
      .post("http://localhost:8000/dev/create_User", {
        email: email,
        temp_password: password,
      })
      .then((response) => {
        console.log(response);
        this.updateState("confirmation");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateUser(User_id, data) {
    axios
      .patch("http://localhost:8000/dev/update_User?User_id=" + User_id, data)
      .then((response) => {
        console.log(response);
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    var password = generator.generate({
      length: 10,
      numbers: true,
    });
    console.log(password);
    Auth.signUp({
      username: this.state.email,
      password: password,
      attributes: {
        email: this.state.email,
      },
    })
      .then((response) => {
        console.log(response);
        this.saveUser(this.state.email, password);
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };
  confirmSignUp = () => {
    console.log("verify");
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      .then((response) => {
        console.log(response);
        this.updatePassword();
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };
  updatePassword = () => {
    Auth.signIn(this.state.email, this.state.oldPassword)
      .then((res) => {
        return Auth.currentAuthenticatedUser();
      })
      .then((user) => {
        console.log("user", user);
        return Auth.changePassword(
          user,
          this.state.oldPassword,
          this.state.newPassword
        );
      })
      .then((response) => {
        console.log(response);
        let User_id = localStorage.getItem("User_id");
        this.updateUser(User_id, { name: this.state.name });
        // this.props.history.push("/login");
        // this.updateState("signup");
      })
      .catch((error) => {
        console.log("error", error);
        this.updateMessage(error.message);
      });
  };

  render() {
    const { email, newPassword, message, formType, name } = this.state;
    return (
      <div className="row" style={{ margin: "0" }}>
        <div className="col-md-6 col-sm-12" style={{ margin: "0 auto" }}>
          <div className="card">
            {message.length > 0 ? <p className="error"> {message}</p> : null}
            <div className="card-body row row-divided">
              <div className="col-sm">
                <img className="img-responsive" src={Logo} alt="Oppn Logo" />
              </div>
              {/* <div className="vertical-divider  d-none d-md-block">or</div> */}
              <div className="col-sm">
                <form onSubmit={this.submitHandler}>
                  {formType === "submit" && (
                    <div>
                      <h3>Welcome to Opnn!</h3>
                      <p>You are signing up as {email}</p>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="What's your FullName"
                          type="text"
                          name="name"
                          value={name}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password"
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <button
                        className="btn btn-lg btn-block"
                        type="button"
                        onClick={this.confirmSignUp}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {formType === "confirmation" && (
                    <div className="alert alert-success" role="alert">
                      We have sent an email with a confirmation link to your
                      email address. In order to complete the sign-up process,
                      please click the confirmation link.
                    </div>
                  )}
                  {formType === "signup" && (
                    <div>
                      <h3>Let's Connect</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod
                      </p>
                      <div className="form-group">
                        <GoogleButton
                          className="googlebutton"
                          type="light" // can be light or dark
                          label="Sign up with Google"
                          onClick={() =>
                            Auth.federatedSignIn({ provider: "Google" })
                          }
                        />
                        <hr />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Email"
                          type="text"
                          name="email"
                          value={email}
                          onChange={this.changeHandler}
                        />
                      </div>
                      <button className="btn btn-lg btn-block" type="submit">
                        Sign Up With Email
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
