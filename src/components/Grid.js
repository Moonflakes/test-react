import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FluxibleComponentContext } from "fluxible-addons-react";
import { connectToStores } from "fluxible-addons-react";
import TimeSlot, { secondsToHours } from "./TimeSlot";

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

  completeWithoutShowTime(startDay, endDay, show, previousShow) {
    const previousEndTime = previousShow ? previousShow.endTime : startDay;
    const isBetweenFirstAndLastTime =
      show.startTime >= startDay && show.endTime <= endDay;
    const withoutTimeDuration = isBetweenFirstAndLastTime
      ? previousEndTime - show.startTime
      : 0;
    const hasWithoutTime =
      isBetweenFirstAndLastTime && withoutTimeDuration !== 0;
    const withoutTimeSlot = hasWithoutTime
      ? {
          title: "Sans programme",
          startTime: previousEndTime,
          endTime: show.startTime,
        }
      : null;
    return withoutTimeSlot;
  }

  render() {
    const { data } = this.state;
    const hoursOfDay = getHoursOfDay(data.startTime, data.endTime);
    const day = data.day ? this.dateToDdMmYyyy(data.day) : "...";

    return (
      <div className="Grid">
        <div className="Title">{"Grille du " + day}</div>
        <fieldset style={{ marginBottom: "20px" }}>
          <legend>Sélectionner le programme :</legend>
          <div
            onChange={(event) => {
              this.setState({
                data: { ...this.props[event.target.value] },
                selectedData: event.target.value,
              });
            }}
          >
            <div>
              <input type="radio" value="data" name="data" /> Programme rempli
            </div>
            <div>
              <input type="radio" value="dataWithNoShowSlots" name="data" />{" "}
              Programme incomplet
            </div>
          </div>
        </fieldset>

        {!data.day ? (
          <>
            <h1>Aucune données</h1>
            <span>Sélectionner le programme à visualiser</span>
          </>
        ) : (
          <div className="Chns">
            <div style={{ marginTop: "18px" }}>
              {hoursOfDay?.map((hour, index) => {
                return (
                  <TimeSlot
                    show={hour}
                    key={`hour-${index}`}
                    showHours={false}
                  />
                );
              })}
            </div>
            {data.chns.map((chn) => {
              const hasProgram = chn.shows.length > 0;
              const withoutProgram = {
                title: "Aucun programme",
                startTime: data.startTime,
                endTime: data.endTime,
              };
              return (
                <div
                  key={chn.key}
                  style={{
                    textAlign: "center",
                    position: "relative",
                    width: `${100 / data.chns.length}%`,
                  }}
                >
                  <div className="Chn">{chn.key}</div>
                  {!hasProgram && <TimeSlot show={withoutProgram} showHours />}
                  {chn?.shows.map((show, index) => {
                    const { startTime, endTime } = data;
                    const withoutTimeSlot = this.completeWithoutShowTime(
                      startTime,
                      endTime,
                      show,
                      chn.shows[index - 1]
                    );
                    const withoutLastTimeSlot = chn.shows.length - 1 ===
                      index &&
                      show.endTime < endTime && {
                        title: "Sans programme",
                        startTime: show.endTime,
                        endTime: endTime,
                      };
                    return (
                      <Fragment
                        key={`show-${index}-${this.state.selectedData}`}
                      >
                        {withoutTimeSlot && (
                          <TimeSlot show={withoutTimeSlot} showHours />
                        )}
                        <TimeSlot show={show} showHours />
                        {withoutLastTimeSlot && (
                          <TimeSlot show={withoutLastTimeSlot} showHours />
                        )}
                      </Fragment>
                    );
                  }, chn.shows)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const getHoursOfDay = (startTime, endTime) => {
  const hoursOfDay = [];
  const thirtyMinutes = 1800;
  for (let i = startTime; i < endTime; i = i + thirtyMinutes) {
    const hours = secondsToHours(i);
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
      dataWithNoShowSlots: context
        .getStore("GridStore")
        .getDataWithNoShowSlots(),
    };
  },
  { getStore: PropTypes.func }
);

export default Grid;
