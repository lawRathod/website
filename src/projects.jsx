import React from "react";
import "./projects.scss";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";

export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.palette = [
      "#bad1e6",
      "#ffc7a1",
      "#e1c5fa",
      "#ffc0bd",
      "#fff7b8",
      "#ffd4cc",
    ];
    this.state = {
      projects: [],
    };
  }
  async componentDidMount() {
    const data = await this.getProjects(this.db);
    this.setState({
      projects: data.list,
    });
  }

  getProjects = async (db) => {
    const pRef = db.collection("projects").doc("projects");
    const projects = await pRef.get();

    return projects.data();
  };

  renderProjects = () => {
    return (
      <div id="projects">
        <div id="projectsContainer">
          {this.state.projects.map((obj, index) => {
            return (
              <div
                style={{ backgroundColor: this.palette[index % 6] }}
                className="project"
                key={obj.name}
              >
                <div className="pName">{obj.name}</div>
                <div className="pMid">
                  <NavLink
                    to={"/journal/" + obj.name}
                    className="projectGithubUrls"
                  >
                    Read
                  </NavLink>
                  <span className="projectGithubUrls"> / </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projectGithubUrls"
                    href={obj.github}
                  >
                    Github
                  </a>
                </div>
                <div className="pDesc">
                  <p>{obj.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    return this.state.projects.length ? (
      this.renderProjects()
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
