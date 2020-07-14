import React from "react";
import Home from "./home";
import Journal from "./journal";
import Music from "./music";
import Projects from "./projects";
import People from "./people";
import { Route, Switch, NavLink } from "react-router-dom";
import * as fb from "./firebase";
import "./App.scss";

function App() {
  const fbd = fb.init(); // eslint-disable-line
  return (
    <div className="mainApp">
      <div id="navigation">
        <div>
          <NavLink
            activeStyle={{ opacity: "100%" }}
            className="navLinks"
            to="/"
            exact
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ opacity: "100%" }}
            className="navLinks"
            to="/journal"
          >
            Journal
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ opacity: "100%" }}
            className="navLinks"
            to="/music"
          >
            Music
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ opacity: "100%" }}
            className="navLinks"
            to="/projects"
          >
            Projects
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ opacity: "100%" }}
            className="navLinks"
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
      <div id="separator"></div>
      <div>
        <main>
          <Switch>
            <Route path="/" render={() => <Home text="Home" />} exact />
            <Route path="/journal" render={() => <Journal />} exact />
            <Route path="/music" render={() => <Music />} exact />
            <Route path="/projects" render={() => <Projects />} exact />
            <Route path="/people" render={() => <People />} exact />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
