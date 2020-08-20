import React from "react";
import Home from "./home";
import Journal from "./journal";
import Ears from "./ears";
import Projects from "./projects";
import People from "./people";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import SinglePage from "./singlepage";
import fb from "./firebase";
import "./App.scss";
import Spinner from "react-bootstrap/Spinner";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { home: {} };
    this.fbd = new fb();
    this.db = this.fbd.getDb();
    this.location = window.location.href
      .substr(window.location.href.lastIndexOf("/") + 1)
      .indexOf("singlePage");
  }
  async componentDidMount() {
    window.addEventListener("orientationchange", () => {
      window.location.reload();
    });
    this.getHome();
  }
  getHome = async () => {
    const contentRef = this.db.collection("home").doc("content");
    const docey = await contentRef.get();
    const doc = docey.data();
    const linksRef = this.db.collection("home").doc("urls");
    const docey1 = await linksRef.get();
    const doc1 = docey1.data();
    const home = {
      content: {
        title: doc.title,
        para: doc.para,
      },
      urls: doc1,
    };

    this.setState({
      home: home,
    });
  };
  render() {
    //return window.screen.orientation.type === "landscape-primary" &&
    //window.screen.width >= 670 ? (
    //this.renderApp()
    //) : (
    //<SinglePage type={window.screen.width >= 670 ? "small" : "narrow"} />
    //);
    return window.screen.width >= 670 && this.location === -1 ? (
      this.renderApp()
    ) : (
      <SinglePage
        db={this.db}
        type={window.screen.width >= 670 ? "small" : "narrow"}
      />
    );
  }

  renderApp = () => {
    //const data = await getHome(this.db);
    //this.setState({
    //home: data,
    //});
    return Object.keys(this.state.home).length ? (
      <div id="mainApp">
        <div id="navigation">
          <div>
            <NavLink
              activeStyle={{ opacity: "100%" }}
              style={{ opacity: "60%" }}
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
              style={{ opacity: "60%" }}
              className="navLinks"
              to="/journal"
            >
              Journal
            </NavLink>
          </div>
          <div>
            <NavLink
              activeStyle={{ opacity: "100%" }}
              style={{ opacity: "60%" }}
              className="navLinks"
              to="/ears"
            >
              Ears
            </NavLink>
          </div>
          <div>
            <NavLink
              activeStyle={{ opacity: "100%" }}
              className="navLinks"
              style={{ opacity: "60%" }}
              to="/projects"
            >
              Projects
            </NavLink>
          </div>
          <div>
            <NavLink
              activeStyle={{ opacity: "100%" }}
              style={{ opacity: "60%" }}
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
              <Route
                path="/"
                render={() => <Home db={this.db} data={this.state.home} />}
                exact
              />
              <Route
                path="/journal"
                render={() => <Journal db={this.db} />}
                exact
              />
              <Route
                path="/journal/*"
                render={() => <Journal db={this.db} />}
                exact
              />

              <Route path="/ears" render={() => <Ears db={this.db} />} exact />
              <Route
                path="/projects"
                render={() => <Projects db={this.db} />}
                exact
              />
              <Route
                path="/people"
                render={() => <People db={this.db} />}
                exact
              />
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </div>
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  };
}
