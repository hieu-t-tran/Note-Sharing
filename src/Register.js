import React from 'react';
import { Redirect } from "react-router-dom";
import './App.css';
import firebase from 'firebase';
import { db } from './config/firebase-config.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: '',
      college: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert("Failure to create a new account!");
    });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ ['login']: true });
      } else {
        this.setState({ ['login']: false });
      }
    });
  }

  render() {
    if (!this.state.login) {
      return (
        <form onSubmit={this.handleSubmit} >
          <label>
            Full Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            College:
          <input type="text" name="college" value={this.state.college} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Email:
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return (<Redirect to="/display" />);
    }
  }
}

export default Register;