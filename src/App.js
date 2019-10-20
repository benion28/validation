import React, { Component } from "react";
import "./App.css";

const emailRegexp = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // Validate The Form Being Filled Out
  Object.values(formErrors).forEach(value => {
    value.length > 0 && (valid = false);
  });

  // Validate Form Being Empty
  Object.values(rest).forEach(value => {
    value === null  && (valid = false);
  });
  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (formValid(this.state)) {
      console.log(`
      ---SUBMITTING----
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      `);
    } else {
      console.error("--FORM INVALID === DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "Name Should Be A Minimum Of 3 Characters" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Name Should Be A Minimum Of 3 Characters" : "";
        break;
      case "email":
        formErrors.email = emailRegexp.test(value)
          ? ""
          : "Please Provide A Valid Email Address";
        break;
      case "password":
        formErrors.password =
          value.length < 8
            ? "Password Should Be A Minimum Of 8 Characters"
            : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={ formErrors.firstName.length > 0 ? "error" : null }
                type="text"
                noValidate
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={ formErrors.lastName.length > 0 ? "error" : null }
                type="text"
                noValidate
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={ formErrors.email.length > 0 ? "error" : null }
                type="email"
                noValidate
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={ formErrors.password.length > 0 ? "error" : null }
                type="password"
                noValidate
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have An Account ??</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
