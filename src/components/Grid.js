import React from "react";
import PropTypes from "prop-types";
import { FluxibleComponentContext } from "fluxible-addons-react";
import { connectToStores } from "fluxible-addons-react";
import ProgramSelector from "./ProgramSelector";
import Program from "./Program";

if (process.env.BROWSER) {
  require("../style/Grid.scss");
}
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      selectedData: "",
    };
  }

  padStr(input) {
    return input < 10 ? "0" + input : "" + input;
  }

  dateToDdMmYyyy(input) {
    const dte = new Date(input);
    return (
      this.padStr(dte.getDate()) +
      "/" +
      this.padStr(dte.getMonth() + 1) +
      "/" +
      dte.getFullYear()
    );
  }

  render() {
    const { data } = this.state;
    const day = data.day ? this.dateToDdMmYyyy(data.day) : "...";

    return (
      <div className="Grid">
        <div className="Title">{"Grille du " + day}</div>

        <ProgramSelector
          onChange={(event) => {
            this.setState({
              data: { ...this.props[event.target.value] },
              selectedData: event.target.value,
            });
          }}
        />

        {!data.day ? (
          <>
            <h1>Aucune données</h1>
            <span>Sélectionner le programme à visualiser</span>
          </>
        ) : (
          <Program data={data} selectedData={this.state.selectedData} />
        )}
      </div>
    );
  }
}

Grid.contextType = FluxibleComponentContext;

Grid = connectToStores(
  Grid,
  ["GridStore"],
  (context) => {
    return {
      data: context.getStore("GridStore").getData(),
      dataWithNoShowSlots: context
        .getStore("GridStore")
        .getDataWithNoShowSlots(),
    };
  },
  { getStore: PropTypes.func }
);

export default Grid;
