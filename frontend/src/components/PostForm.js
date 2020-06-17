import React, { Component } from "react";
import "../App.css";
import axios from "axios";
class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }
  googleSignup = () => {
    window.location.replace(
      "https://thinkitive.auth.us-east-1.amazoncognito.com/login?client_id=5ia75r436n2bib96m1deh9ib2m&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://dev.mdm.airtrack.com/dashboard"
    );
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("", this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="card" style={{ width: "44%" }}>
        <div className="card-body row">
          <div className="col-sm">
            <h5>Sign In with your social account</h5>
            <button
              className="btn btn-primary btn-lg btn-block google "
              onClick={this.googleSignup}
            >
              Google Login
            </button>
          </div>
          <div className="col-sm">
            <form onSubmit={this.submitHandler}>
              <h5>Sign in with your email and password</h5>
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-control"
                  placeholder="Email Address"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  placeholder="Password"
                  type="text"
                  name="password"
                  value={password}
                  onChange={this.changeHandler}
                />
              </div>
              <button className="btn btn-dark btn-lg btn-block" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
