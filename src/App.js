import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";
import './App.css';

import Navigation from './components/Navigation'
import PostList from './components/PostList'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Navigation/>
      <Route path="/" exact component={PostList} />
    </Router>
  );
}

export default App;
