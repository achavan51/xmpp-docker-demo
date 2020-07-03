import React, { Component } from "react";
import "../../Styles/onboard.scss";
import axios from "axios";
import Logo from "../../assets/img/logo.png";
import { Auth } from "aws-amplify";
export class onboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      orgName: "",
      company_name: "",
      numberOfEmployees: "",
      account_type: "",
      message: "",
      active: true,
    };

    Auth.currentSession()
      .then((response) => {
        console.log(response);
        // this.props.history.push("/invite");
        console.log("email", response.idToken.payload.email);
        this.getUser(response.idToken.payload.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getUser(email) {
    axios
      .get("http://localhost:3000/userOrgAdmin/getUser?filter=" + email)
      .then((response) => {
        console.log(response);
        if (response.data !== "") {
          localStorage.setItem("User_id", response.data._id);
          localStorage.setItem("email", response.data.email);
          console.log(response.data);
          if (response.data.orgId) {
            // this.props.history.push("/dashboard");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeClass = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("orgName", formData.get("orgName") + ".Opnn.co");
    const User_id = localStorage.getItem("User_id");
    const email = localStorage.getItem("email");
    formData.append("userName", email);
    formData.append("admins", [{ userId: User_id }]);
    formData.append("usersThatCanInvite", [{ userId: User_id }]);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const config = {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTMyMDYzMjYsImV4cCI6MTYyNDc0MjMyNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoidGVzdHNpZ251cEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6InRlc3QiLCJTdXJuYW1lIjoic2lnbnVwIiwiRW1haWwiOiJ0ZXN0c2lnbnVwQGV4YW1wbGUuY29tIiwiUm9sZSI6WyJNYW5hZ2VyIiwiUHJvamVjdCBBZG1pbmlzdHJhdG9yIl19.e3exTvjRUGtBhcbFl7uOsu-2Y94WOfOMLyS7RMaJF4o`,
      },
    };

    axios
      .post(
        "http://127.0.0.1:3000/userOrgAdmin/createUserAndOrg",
        object,
        config
      )
      .then((response) => {
        console.log(response);
        this.props.history.push("/invite");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const {
      company_name,
      numberOfEmployees,
      orgName,
      message,
      account_type,
    } = this.state;

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
                    <label
                      htmlFor="orgName"
                      className="col-sm-3 col-form-label"
                    >
                      Tenant Name
                    </label>
                    <div className="col-sm-9 input-group mb-3">
                      <input
                        className="form-control"
                        placeholder="Enter Tenant Name"
                        id="orgName"
                        type="text"
                        name="orgName"
                        value={orgName}
                        onChange={this.changeHandler}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          .Opnn.co
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Account Type
                    </label>
                    <div className="col-sm-9 mb-3">
                      <div
                        className="btn-group btn-group-toggle"
                        data-toggle="buttons"
                      >
                        <label
                          className={
                            this.state.active
                              ? "btn btn-secondary active"
                              : "btn btn-secondary "
                          }
                        >
                          <input
                            type="radio"
                            name="account_type"
                            id="option1"
                            autoComplete="off"
                            value={"Personal"}
                            onChange={this.changeHandler}
                            checked={"Personal" === account_type}
                            onClick={this.changeClass}
                          />
                          <i className="fa fa-user-o" aria-hidden="true" />_
                          Personal
                        </label>
                        <label
                          className={
                            this.state.active
                              ? "btn btn-secondary"
                              : "btn btn-secondary active"
                          }
                        >
                          <input
                            type="radio"
                            name="account_type"
                            id="option2"
                            autoComplete="off"
                            value={"Company"}
                            onChange={this.changeHandler}
                            onClick={this.changeClass}
                            checked={"Company" === account_type}
                          />
                          <i className="fa fa-building-o" aria-hidden="true" />_
                          Company
                        </label>
                      </div>
                    </div>
                  </div>
                  {this.state.account_type === "Company" ? (
                    <div>
                      <div className="form-group row">
                        <label
                          htmlFor="company_name"
                          className="col-sm-3 col-form-label"
                        >
                          Company Name
                        </label>
                        <div className="col-sm-9 mb-3">
                          <input
                            className="form-control"
                            placeholder="Enter Company Name"
                            id="company_name"
                            type="text"
                            name="company_name"
                            value={company_name}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Employees
                        </label>
                        <div className="col-sm-9 mb-3">
                          <select
                            className="form-control"
                            placeholder="Enter Number of Employees"
                            id="numberOfEmployees"
                            name="numberOfEmployees"
                            onChange={this.changeHandler}
                            value={numberOfEmployees}
                          >
                            <option value="" defaultValue>
                              Please select
                            </option>
                            <option value="49">0-49</option>
                            <option value="99">50-99</option>
                            <option value="149">100-149</option>
                            <option value="199">150-199</option>
                            <option value="9999">200+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <button
                    className="btn btn-lg btn-block cus-button"
                    type="submit"
                  >
                    Finish Setup
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

export default onboard;
