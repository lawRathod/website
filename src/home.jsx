import React from "react";
import "./home.scss";

function Home(props) {
  return (
    <div className="Home">
      <h1>{props.text}</h1>
    </div>
  );
}

export default Home;

