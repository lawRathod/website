import React from "react";
import "../css/people.scss";
import Spinner from "react-bootstrap/Spinner";

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.db = props.db;
    this.state = {
      people: [],
    };
  }
  async componentDidMount() {
    const data = await this.getPeople(this.db);
    this.setState({
      people: data.list,
    });
  }
  getPeople = async (db) => {
    const pRef = db.collection("people").doc("superstars");
    const people = await pRef.get();
    return people.data();
  };

  renderPeople = () => {
    return (
      <div id="people">
        <div id="peopleContainer">
          <div id="peopleTitle">
            <span>Lesser known superstars...</span>
          </div>
          <div id="peopleGrid">
            {this.state.people.map((obj) => {
              return (
                <div key={obj.name} className="person">
                  <div className="personName">{obj.name}</div>
                  <div className="personMid">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="personUrl"
                      href={obj.twitter}
                    >
                      Twitter
                    </a>
                    <span className="personUrl"> / </span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="personUrl"
                      href={obj.website}
                    >
                      Website
                    </a>
                  </div>
                  <div className="personDesc">{obj.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return this.state.people.length ? (
      this.renderPeople()
    ) : (
      <div id="loadSpinner">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
}
