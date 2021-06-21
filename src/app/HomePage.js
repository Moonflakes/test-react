import React, { Component } from "react";

import Grid from "../components/Grid";

if (process.env.BROWSER) {
  require("../style/HomePage.scss");
}

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <Grid />
      </div>
    );
  }
}

export default HomePage;