import React from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
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
    if (this.state.login) {
      return (
        <div>
          <Link to="/app">Add a note</Link>
          <br />
          <Link to="/display">Show all added notes</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/">Login</Link>
          <br />
          <Link to="/register">Register</Link>
        </div>
      );
    }
  }
}

export default Navigation;