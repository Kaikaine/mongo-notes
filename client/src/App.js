import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Landing from './components/Landing/Landing';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Landing />
      </div>
      </Router>
    );
  }
}

export default App;
