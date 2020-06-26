import React, { Component } from "react";
import "../../Styles/onboard.scss";
import Logo from "../../assets/img/logo.png";
export class onboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      tenantName: "",
      companyName: "",
      numberOfEmployees: "",
      message: "",
      account_type: "",
    };
  }
  changeHandler = (e) => {
    console.log("change", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const User_id = localStorage.getItem("User_id");
    // axios
    //   .post("http://localhost:8000/dev/create_Organization", {
    //     email: email,
    //     temp_password: password,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     this.updateState("confirmation");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  render() {
    const {
      email,
      companyName,
      numberOfEmployees,
      tenantName,
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
                      htmlFor="tenantName"
                      className="col-sm-3 col-form-label"
                    >
                      Tenant Name
                    </label>
                    <div className="col-sm-7 padr-0">
                      <input
                        className="form-control"
                        placeholder="Enter Tenant Name"
                        id="tenantName"
                        type="text"
                        name="tenantName"
                        value={tenantName}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="col-sm-2 padr-0">
                      <h5>.Opnn.co</h5>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Account Type
                    </label>
                    <div className="col-sm-7 padr-0">
                      <div
                        className="btn-group btn-group-toggle"
                        data-toggle="buttons"
                      >
                        <label
                          className="btn btn-secondary active"
                          className={
                            this.state.active ? "your_className" : null
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
                            checked
                          />
                          <i className="fa fa-user-o" aria-hidden="true" />_
                          Personal
                        </label>
                        <label className="btn btn-secondary">
                          <input
                            type="radio"
                            name="account_type"
                            id="option2"
                            autoComplete="off"
                            value={"Company"}
                            onChange={this.changeHandler}
                            checked={"Company" === account_type}
                          />
                          <i className="fa fa-building-o" aria-hidden="true" />_
                          Company
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="companyName"
                      className="col-sm-3 col-form-label"
                    >
                      Company Name
                    </label>
                    <div className="col-sm-7 padr-0">
                      <input
                        className="form-control"
                        placeholder="Enter Company Name"
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={companyName}
                        onChange={this.changeHandler}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label padr-0">
                      Employees
                    </label>
                    <div className="col-sm-7 padr-0">
                      <input
                        className="form-control"
                        placeholder="Enter Number of Employees"
                        id="numberOfEmployees"
                        type="text"
                        name="numberOfEmployees"
                        value={numberOfEmployees}
                        onChange={this.changeHandler}
                      />
                    </div>
                  </div>
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
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
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
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
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
                    <div className="col-sm-7 padr-0">
                      <input
                        className="form-control"
                        placeholder="Enter Email"
                        id="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.changeHandler}
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
