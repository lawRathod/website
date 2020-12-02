import React from "react";
import "../css/journal.scss";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: null,
      entries: [],
      selected: null,
    };
    this.url = window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    );
    this.db = this.props.db;
  }
  async componentDidMount() {
    if (!Object.keys(this.state.entries).length) {
      const data = await this.getBlogs(this.db);
      this.setState({
        blog: data.blog,
        entries: data.entries,
        selected: data.selected,
      });
    }
    window.onpopstate = () => {
      this.changeBlog(
        window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
      );
    };
  }

  changeBlog = async (title) => {
    if (title.length && title !== "journal") {
      title = title.replace(/\+/g, " ");
      const index = this.state.entries.findIndex((x) => x.title === title);
      if (index < 0) {
        return;
      }
      this.setState({
        blog: null,
        selected: index,
      });
      const blogRef = this.db.collection("journal").doc(title);
      const blog = await blogRef.get();
      this.setState({
        blog: blog.data(),
      });
    }
  };
  handleBlogSelect = async (title, index) => {
    this.setState({
      selected: index,
      blog: null,
    });
    const blogRef = this.db.collection("journal").doc(title);
    const blog = await blogRef.get();
    this.setState({
      blog: blog.data(),
    });
  };

  getBlogs = async (db) => {
    const entriesRef = db.collection("journal").doc("entries");
    const entriesData = await entriesRef.get();
    const entries = entriesData.data();
    var index = entries.list.length - 1;
    var blogTitle = entries.list[index].title;
    if (this.url.length && this.url !== "journal") {
      var url = this.url;
      url = url.replace(/\+/g, " ");
      blogTitle = url;
      index = entries.list.findIndex((x) => x.title === blogTitle);
      if (index < 0) {
        index = entries.list.length - 1;
        blogTitle = entries.list[index].title;
        window.history.pushState(
          null,
          "Journal",
          "/journal/" + blogTitle.replace(/\s/g, "+")
        );
      }
    } else {
      const temp = "/journal/" + blogTitle.replace(/\s/g, "+");
      window.history.pushState(null, "Journal", temp);
    }
    const blogRef = db.collection("journal").doc(blogTitle);
    const blog = await blogRef.get();
    const data = {
      blog: blog.data(),
      entries: entries.list.reverse(),
      selected: entries.list.length - 1 - index,
    };

    return data;
  };
  renderSidebar = () => {
    return (
      <div id="sidebar">
        {this.state.entries.map((val, index) => {
          return (
            <div key={val.title} className="entries">
              <div
                className={
                  index === this.state.selected
                    ? "entryTitle entrySelected"
                    : "entryTitle"
                }
              >
                <NavLink
                  onClick={() => this.handleBlogSelect(val.title, index)}
                  to={"/journal/" + val.title.replace(/\s/g, "+")}
                >
                  {val.title}
                </NavLink>
              </div>
              <div className="entryTags">
                <div className="entryTag category">{val.category}</div>
                {val.tags ? (
                  val.tags.map((tag) => {
                    return (<div className="entryTag tag" key={tag}>{tag}</div>)      
                  })
                ) :  null  }
                <div className="entryTag published">{"Published: "+val.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderJournal = () => {
    const { blog, entries } = this.state;
    return blog ? (
      <div id="journal">
        <div
          id="blog"
          dangerouslySetInnerHTML={{
            __html: this.state.blog.content,
          }}
        />
        {this.renderSidebar()}
      </div>
    ) : entries.length ? (
      <div id="journal">
        <div id="blog">
          <div id="loadSpinner">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        </div>
        {this.renderSidebar()}
      </div>
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  };

  render() {
    return this.renderJournal();
  }
}
