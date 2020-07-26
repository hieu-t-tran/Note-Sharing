import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import firebase from 'firebase';
import { db } from './config/firebase-config.js';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      notes: []
    };

    this.getStoredValues.bind(this);
  }

  signOut() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  /* Fetch all notes from database */
  getStoredValues() {
    db.collection("notes")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ ["notes"]: data });
      });
  }

  /* Method to invoke before render() */
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ ['login']: true });
      } else {
        this.setState({ ['login']: false });
      }
    });
    if (this.state.login) {
      this.getStoredValues();
    }
  }

  render() {
    if (this.state.login) {
      var storage = firebase.storage();
      const listNotes = this.state.notes.map((note, index) =>
        <li key={index}>
          {note.course} : {note.description}
          <embed src={note.file} width="300" height="300"></embed>
        </li>
      );
      return (
        <div>
          <h1>List of added notes</h1>
          <ul>{listNotes}</ul>
          <button onClick={this.signOut}>Log out</button>
        </div>
      );
    } else {
      return (<Redirect to="/" />);
    }
  }
}

export default Display;