import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FluxibleComponentContext } from "fluxible-addons-react";
import { connectToStores } from "fluxible-addons-react";
import TimeShow, { secondToHours } from "./TimeShow";

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
    const previousEndTime = previousShow ? previousShow.endTime : startDay;
    const isBetweenFirstAndLastTime =
      show.startTime > startDay && show.endTime < endDay;
    const withoutTimeDuration = isBetweenFirstAndLastTime
      ? previousEndTime - show.startTime
      : 0;
    const hasWithoutTime =
      isBetweenFirstAndLastTime && withoutTimeDuration !== 0;
    const withoutTimeShow = hasWithoutTime
      ? {
          title: "Sans programme",
          startTime: previousEndTime,
          endTime: show.startTime,
        }
      : null;
    return withoutTimeShow;
  }

  render() {
    const { data, hours } = this.props;
    const hoursOfDay = getHoursOfDay(data.startTime, data.endTime);

    return (
      <div className="Grid">
        <div className="Title">
          {"Grille du " + this.dateToDdMmYyyy(data.day)}
        </div>
        <div className="Chns">
          <div style={{ marginTop: "18px" }}>
            {hoursOfDay.map((hour, index) => {
              return (
                <TimeShow show={hour} key={`hour-${index}`} showHours={false} />
              );
            })}
          </div>
          {data.chns.map((chn) => {
            return (
              <div key={chn.key} style={{ textAlign: "center" }}>
                <div className="Chn">{chn.key}</div>
                {chn.shows.map((show, index) => {
                  const { startTime, endTime } = data;
                  const withoutTimeShow = this.completeWithoutShowTime(
                    startTime,
                    endTime,
                    show,
                    chn.shows[index - 1]
                  );
                  const withoutLastTimeShow = chn.shows.length - 1 === index &&
                    show.endTime < endTime && {
                      title: "Sans programme",
                      startTime: show.endTime,
                      endTime: endTime,
                    };
                  return (
                    <Fragment key={`show-${index}`}>
                      {withoutTimeShow && (
                        <TimeShow show={withoutTimeShow} showHours />
                      )}
                      <TimeShow show={show} showHours />
                      {withoutLastTimeShow && (
                        <TimeShow show={withoutLastTimeShow} showHours />
                      )}
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

const getHoursOfDay = (startTime, endTime) => {
  const hoursOfDay = [];
  const thirtyMinutes = 1800;
  for (let i = startTime; i < endTime; i = i + thirtyMinutes) {
    const hours = secondToHours(i);
    hoursOfDay.push({
      subTitle: Number.isInteger(hours) ? `${hours}h` : "",
      startTime: i,
      endTime: i + 1800,
    });
  }
  return hoursOfDay;
};

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
