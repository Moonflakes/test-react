import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FluxibleComponentContext } from "fluxible-addons-react";
import { connectToStores } from "fluxible-addons-react";
import TimeShow from "./TimeShow";

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

  completeWithoutShowTime(startDay, endDay, show, previousShow) {
    const isBetweenFirstAndLastTime =
      show.startTime > startDay && show.endTime < endDay;
    const withoutTimeDuration = isBetweenFirstAndLastTime
      ? previousShow.endTime - show.startTime
      : 0;
    const hasWithoutTime =
      isBetweenFirstAndLastTime && withoutTimeDuration !== 0;
    const withoutTimeShow = hasWithoutTime
      ? {
          title: "Sans programme",
          startTime: previousShow.endTime,
          endTime: show.startTime,
        }
      : null;
    return withoutTimeShow;
  }

  render() {
    const { data, hours } = this.props;

    return (
      <div className="Grid">
        <div className="Title">
          {"Grille du " + this.dateToDdMmYyyy(data.day)}
        </div>
        <div className="Chns">
          <div style={{ marginTop: "18px" }}>
            {hours.map((hour, index) => {
              return (
                <TimeShow show={hour} key={`hour-${index}`} showHours={false} />
              );
            })}
          </div>
          {data.chns.map((chn, ind) => {
            return (
              <div key={chn.key} style={{ textAlign: "center" }}>
                <div className="Chn">{chn.key}</div>
                {chn.shows.map((show, index) => {
                  const { startTime, endTime } = this.props.data;
                  const withoutTimeShow = this.completeWithoutShowTime(
                    startTime,
                    endTime,
                    show,
                    chn.shows[index - 1]
                  );
                  return (
                    <Fragment key={`show-${index}`}>
                      {withoutTimeShow && (
                        <TimeShow show={withoutTimeShow} showHours />
                      )}
                      <TimeShow show={show} showHours />
                    </Fragment>
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
      hours: context.getStore("GridStore").getHours(),
    };
  },
  { getStore: PropTypes.func }
);

export default Grid;
