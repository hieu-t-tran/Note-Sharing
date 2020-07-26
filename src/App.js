import React from 'react';
import { Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import { db } from './config/firebase-config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      topic: '',
      description: '',
      college: '',
      course: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const app = this;

    // upload the file
    var storageRef = firebase.storage().ref();
    const file = this.fileInput.current.files[0];
    const randomNumber = Math.floor(Math.random() * 10000);
    var uploadTask = storageRef.child(randomNumber + file.name).put(file);

    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // handle unsuccessful uploads
      console.log(error);
    }, function () {
      // handle successful uploads
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        var isPdf = false;
        if (file.name.substr(file.name.length - 3, 3) === 'pdf') {
          isPdf = true;
        }
        db.collection("notes").add({
          topic: app.state.topic,
          description: app.state.description,
          college: app.state.college,
          course: app.state.course,
          file: downloadURL,
          pdf: isPdf
        })
        .then(function () {
          console.log("Database successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating database: ", error);
        });
      });
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
    if (this.state.login) {
      return (
        <form onSubmit={this.handleSubmit} >
          <label>
            Topic:
          <input type="text" name="topic" value={this.state.topic} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description:
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            College:
          <input type="text" name="college" value={this.state.college} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Course:
          <input type="text" name="course" value={this.state.course} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Choose files to upload:
          <input type="file" ref={this.fileInput} accept=".jpg, .jpeg, .png, .pdf" multiple />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return (<Redirect to="/" />);
    }
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form>
          <label>
            Topic:
          <input type="text" />
          </label>
          <label>
            Description:
          <input type="text" />
          </label>
          <label>
            College:
          <input type="text" />
          </label>
          <label>
            Course:
          <input type="text" />
          </label>
          <label>
            Choose files to upload
          <input type="file" accept=".jpg, .jpeg, .png, .pdf" multiple />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}
*/

export default App;