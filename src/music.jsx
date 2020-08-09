import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default class Music extends React.Component {
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

  renderMusic = () => {
    return (
      <div id="music">
        <div id="topFive"></div> <div id="playlists"></div>
      </div>
    );
  };

  render() {
    return this.state.topFive.length ? (
      this.renderMusic()
    ) : (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
}
