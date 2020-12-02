import React from "react";
import "../css/singlepage.scss";
import Spinner from "react-bootstrap/Spinner";

export default class SinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.blog = null;
    this.url = window.location.href;
    this.path = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    if(this.url.indexOf("journal") >= 0){
      this.blog = window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
    }
    this.state = {
      blog: null,
      home: {
        content: {},
        urls: {},
      },
      entries: [],
      projects: [],
    };
  }

  async componentDidMount() {
    if (this.blog) {
      const blog = await this.getBlog();
      if (blog) {
        this.setState({ blog: blog });
      } else {
        window.location.href = "/";
      }
    } else if (!this.blog && this.path) {
        window.location.href = "/";
    }


    const entries = await this.getEntries(this.db);
    const home = await this.getHome(this.db);
    const projects = await this.getProjects(this.db);

    this.setState({
      home: home,
      projects: projects.list,
      entries: entries,
    });
  }

  getBlog = async () => {
    const blogRef = this.db.collection("journal").doc(this.blog);
    const blog = await blogRef.get();

    return blog.data();
  };

  getEntries = async (db) => {
    const entriesRef = db.collection("journal").doc("entries");
    const entriesData = await entriesRef.get();
    const entries = entriesData.data();

    return entries.list.reverse();
  };

  getProjects = async (db) => {
    const pRef = db.collection("projects").doc("projects");
    const projects = await pRef.get();

    return projects.data();
  };

  getHome = async (db) => {
    const contentRef = db.collection("home").doc("content");
    const docey = await contentRef.get();
    const doc = docey.data();
    const linksRef = db.collection("home").doc("urls");
    const docey1 = await linksRef.get();
    const doc1 = docey1.data();
    const home = {
      content: {
        title: doc.title,
        para: doc.para,
      },
      urls: doc1,
    };

    return home;
  };

  renderProjects = () => {
    return (
      <div id="spProjects">
        <h1>Projects</h1>
        <div id="spProjectEntryContainer">
          {this.state.projects.map((obj) => {
            return (
              <div className="spProject" key={obj.name}>
                <div className="pName">
                  <h4>{obj.name}</h4>
                </div>
                <div className="pMid">
                  <a
                    href={"/journal/" + obj.name}
                    className="projectGithubUrls"
                  >
                    Read
                  </a>
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

  renderSidebar = () => {
    return (
      <div id="spJournal">
        <h1> Journal</h1>
        <div id="spJournalEntryContainer">
          {this.state.entries.map((val) => {
            return (
              <div key={val.title} className="entry">
                <div>
                  <a href={"/journal/" + val.title.replace(/\s/g, "+")}>
                    <h4>{val.title}</h4>
                  </a>
                </div>
                <div className="entryMeta">
                  <span>Category: </span>
                  {val.category} | <span>Published on: </span>
                  {val.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  renderHome = () => {
    const { home } = this.state;
    return (
      <div id="spHome">
        <div id="sphomeContent">
          <div id="sphomeTitle">
            <h1>{home.content.title}</h1>
          </div>
          <div id="sphomePara">
            <p>{home.content.para}</p>
          </div>
        </div>
        <div id="spUrls">
          {Object.keys(home.urls).map((key) => (
            <div className="spUrl" key={key}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="homeUrls"
                href={home.urls[key]}
              >
                {key}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderSP = () => {
    return (
      <div className="singlePage">
        <div id="spHomeContainer">{this.renderHome()}</div>
        <div id="spJournalContainer">{this.renderSidebar()}</div>
        <div id="spProjectContainer"> {this.renderProjects()}</div>
        <div id="spFooter">
          <p>
            Please rotate your screen to landscape to check out the full app.{" "}
            <b>Have a great day</b>.
          </p>
        </div>
      </div>
    );
  };

  render() {
    return this.state.blog ? (
      <div
        className="spBlog singlePage"
        dangerouslySetInnerHTML={{
          __html: this.state.blog.content,
        }}
      ></div>
    ) : this.state.projects.length ? (
      this.renderSP()
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
