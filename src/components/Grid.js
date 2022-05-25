import React from "react";
import PropTypes from "prop-types";
import { FluxibleComponentContext } from "fluxible-addons-react";
import { connectToStores } from "fluxible-addons-react";
import TimeShow from "./TimeShow";
// import Test from "./test";

if (process.env.BROWSER) {
  require("../style/Grid.scss");
}
class Grid extends React.Component {
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
    const { data } = this.props;

    return (
      <div className="Grid">
        <div className="Title">
          {"Grille du " + this.dateToDdMmYyyy(data.day)}
        </div>
        <div className="Chns">
          {data.chns.map((chn, ind) => {
            return (
              <div key={chn.key}>
                <div className="Chn">{chn.key}</div>
                {chn.shows.map((show, index) => {
                  const startDay = this.props.data.startTime;
                  const endDay = this.props.data.endTime;
                  const isBetweenFirstAndLastTime =
                    show.startTime > startDay && show.endTime < endDay;
                  const withoutTimeDuration = isBetweenFirstAndLastTime
                    ? this.props.data.chns[ind].shows[index - 1].endTime -
                      show.startTime
                    : 0;
                  const hasWithoutTime =
                    isBetweenFirstAndLastTime && withoutTimeDuration !== 0;
                  const withoutTimeShow = hasWithoutTime
                    ? {
                        startTime: chn.shows[index - 1].endTime,
                        endTime: show.startTime,
                      }
                    : null;
                  return (
                    <TimeShow
                      key={`show-${index}`}
                      show={show}
                      withoutTimeShow={withoutTimeShow}
                    />
                  );
                }, chn.shows)}
              </div>
            );
          })}
        </div>
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
    };
  },
  { getStore: PropTypes.func }
);

export default Grid;
