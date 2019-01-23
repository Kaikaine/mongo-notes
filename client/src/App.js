import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Landing from './components/Landing/Landing';
import Login from './components/Signin/Login';
import Register from './components/Signin/Register';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </div>
      </Router>
    );
  }
}

export default App;
