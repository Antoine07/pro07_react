import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import App from './App';
import Form from './components/Form';
import FormUpdate from './components/FormUpdate';

const Home = () => {
  return (

    <div className="App">
      <Router>
        <nav className="navbar navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add">
                Add
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/add" component={ Form } />
          <Route exact path="/update/:id" component={ FormUpdate } />
        </Switch>
      </Router>
    </div>
  );
}

export default Home;