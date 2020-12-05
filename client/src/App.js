import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./components/Auth";

import Home from "./pages/Home";
import Game from "./pages/Game";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Nav />
        <Router>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/games/:id">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
