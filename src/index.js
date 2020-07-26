import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Display from './Display';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import Navigation from './Navigation';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/app" component={App} />
        <Route path="/display" component={Display} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
