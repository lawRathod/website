import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "../css/ears.scss";

export default class Ears extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topFive: [],
      playlists: {},
    };
    this.db = this.props.db;
  }

  async componentDidMount() {
    const data = await this.getData(this.db);
    this.setState({
      topFive: data.topFive,
      playlists: data.playlists,
    });
  }

  getData = async (db) => {
    const dataRef = db.collection("music").doc("data");
    const data = await dataRef.get();

    return data.data();
  };

  renderEars = () => {
    return (
      <div id="ears">
        <div id="topFive">
          <div id="tTitle">
            <span>Listening to...</span>
          </div>
          <div id="tEntries">
            {this.state.topFive.map((obj) => {
              return (
                <div className="tEntry" key={obj.title}>
                  <div className="eTitle">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tUrls"
                      href={obj.url}
                    >
                      {obj.title}
                    </a>
                  </div>
                  <div className="eBy">
                    <span>By: </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tUrls"
                      href={obj.artist}
                    >
                      {obj.by}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="playlists">
          <div id="pTitle">
            <span>Playlists</span>
          </div>
          <div id="pEntries">
            {Object.keys(this.state.playlists).map((key) => {
              return (
                <div className="pEntry" key={key}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pUrls"
                    href={this.state.playlists[key]}
                  >
                    {key}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.state.topFive.length ? (
      this.renderEars()
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
