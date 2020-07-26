import React from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import { db } from './config/firebase-config.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      console.log(error.code);
      console.log(error.message);
      alert("Failure to sign in!");
    });
  }

  /*
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ ['login']: true });
      } else {
        this.setState({ ['login']: false });
      }
    });
  }
  */

  render() {
    if (!this.state.login) {
      return (
        <form onSubmit={this.handleSubmit} >
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

export default Login;