import React, { Component } from 'react';
import Dashboard from '../Dashboard.jsx';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accountEmail: '',
      accountPassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      loginMethod: 'registration',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      token: 'test',
    };
    fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .then(this.props.successfulLogin());
  }

  submitLogIn(e) {
    e.preventDefault();
    const logIn = {
      accountEmail: this.state.accountEmail,
      accountPassword: this.state.accountPassword,
    };
    fetch('/users/findAccount')
      .then((response) => {
        if (response === true) {
          this.props.successfulLogin();
        }
      });
  }

  render() {

    return (
      <div>
        <h1>Log in or sign up</h1>
        <h4>Log in</h4>
        <form onSubmit={this.submitLogIn}>
          <input type="text" name="accountEmail" placeholder="Email" value={this.state.accountEmail} onChange={this.onChange} />
          <input type="text" name="accountPassword" placeholder="Password" value={this.state.accountPassword} onChange={this.onChange} />
        </form>

        <h4>Signup</h4>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.onChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.onChange} />
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange} />
          <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
