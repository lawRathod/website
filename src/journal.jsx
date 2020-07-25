import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import "./journal.scss";

export default class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      blogs: {},
      categories: {},
      test: {},
    };
    this.db = this.props.db;
  }
  async componentDidMount() {
    if (!Object.keys(this.state.blogs).length) {
      const data = await this.getBlogs(this.db);
      this.setState({
        selected: data.blogs.content.length - 1,
        blogs: data.blogs,
        categories: data.categories,
      });
    }
  }

  renderJournal = () => {
    const [open, setOpen] = useState(false);
    return (
      <div id="journal">
        <div
          id="blog"
          dangerouslySetInnerHTML={{
            __html: this.state.blogs.content[this.state.selected].entry.content,
          }}
        />
        <div id="sidebar">
          <div
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className="category collapsible"
          >
            <span>Recents</span>
          </div>

          <Collapse in={open}>
            <div id="example-collapse-text">Hello</div>
          </Collapse>
          {this.state.categories.names.map((name) => {
            return (
              <div className="category">
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  async getBlogs(db) {
    const blogRef = db.collection("journal").doc("blogs");
    const catRef = db.collection("journal").doc("categories");
    const blogsData = await blogRef.get();
    const catData = await catRef.get();
    const data = {
      blogs: blogsData.data(),
      categories: catData.data(),
    };
    return data;
  }
  render() {
    return Object.keys(this.state.blogs).length ? (
      this.renderJournal()
    ) : (
      <div>loading</div>
    );
  }
}
