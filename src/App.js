import React from "react";
import Home from "./home";
import Journal from "./journal";
import Music from "./music";
import Projects from "./projects";
import People from "./people";
import { Route, Switch, NavLink } from "react-router-dom";
import fb from "./firebase";
import "./App.scss";
import Spinner from "react-bootstrap/Spinner";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { home: {} };
    this.fbd = new fb();
    this.db = this.fbd.getDb();
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
    return window.screen.orientation.type === "landscape-primary" ? (
      this.renderApp()
    ) : (
      <div>
        <h1>Sorry! Didn't add enough css! Please rotate your screen. </h1>
      </div>
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
              <Route
                path="/music"
                render={() => <Music db={this.db} />}
                exact
              />
              <Route path="/projects" render={() => <Projects />} exact />
              <Route path="/people" render={() => <People />} exact />
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
