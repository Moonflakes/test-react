import React from "react";

import Grid from "../components/Grid";

if (process.env.BROWSER) {
  require("../style/HomePage.scss");
}

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Grid />
      </div>
    );
  }
}

export default HomePage;