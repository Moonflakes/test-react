import React, { Fragment } from "react";

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      durationPx: 0,
      durationToDisplay: 0,
      startTimeToDisplay: 0,
      endTimeToDisplay: 0,
      pxToAdd: 0,
      blackBorder: "",
      pdaToDisplay: 0,
    };
  }

  componentDidMount() {
    const { show } = this.props;
    const { startTime, endTime, pda } = show;
    const pdaToDisplay = pda && pda.toFixed(1);
    const { startTimeToDisplay, endTimeToDisplay, durationToDisplay } =
      getTimesToDisplay(startTime, endTime);
    const pxToAdd = durationToDisplay - 75 >= 0 ? 0 : 75 - durationToDisplay;
    this.setState({
      durationPx: durationToDisplay,
      durationToDisplay,
      startTimeToDisplay,
      endTimeToDisplay,
      pxToAdd,
      blackBorder: "",
      pdaToDisplay,
    });
  }

  render() {
    const { show, showHours } = this.props;
    const { title, subTitle } = show;
    const {
      durationPx,
      pxToAdd,
      blackBorder,
      durationToDisplay,
      startTimeToDisplay,
      endTimeToDisplay,
      pdaToDisplay,
    } = this.state;
    const isAbsolute =
      durationPx + pxToAdd > durationToDisplay &&
      durationPx !== durationToDisplay;

    return (
      <>
        {durationPx > 0 && (
          <div // display absolute div for height too small on mouse hover
            onMouseEnter={() => {
              this.setState({
                durationPx: durationPx + pxToAdd,
                blackBorder: "solid black 1px",
              });
            }}
            onMouseLeave={() => {
              this.setState({
                durationPx: durationToDisplay,
                blackBorder: "",
              });
            }}
            style={
              isAbsolute
                ? {
                    position: "absolute",
                    height: `${durationPx}px`,
                    zIndex: 10,
                    width: "100%",
                    backgroundColor: "white",
                  }
                : {}
            }
          >
            <div
              className={"show"}
              style={{
                height: `${durationPx}px`,
                border: blackBorder,
              }}
            >
              {pdaToDisplay && ( // display visual pda
                <div
                  className="pda"
                  style={{
                    height: `${durationPx}px`,
                    width: `${pdaToDisplay}%`,
                  }}
                />
              )}
              {title && <h4>{title}</h4>}
              {subTitle && (
                <h5 style={{ textAlign: showHours ? "center" : "end" }}>
                  {subTitle}
                </h5>
              )}
              {showHours && (
                <h6>
                  {startTimeToDisplay} - {endTimeToDisplay}
                </h6>
              )}
              {pdaToDisplay && (
                <h5>
                  pda: <span>{pdaToDisplay}%</span>
                </h5>
              )}
            </div>
          </div>
        )}
        {isAbsolute && ( // display div to not change the column height when it become absolute
          <div style={{ height: `${durationToDisplay + 2}px` }}></div>
        )}
      </>
    );
  }
}

export default TimeSlot;

const getTimesToDisplay = (startTime, endTime) => {
  const startHour = secondsToHours(startTime);
  const endHour = secondsToHours(endTime);
  const startHourWithoutMinutes = extractHoursWithoutMinutes(startHour);
  const endHourWithoutMinutes = extractHoursWithoutMinutes(endHour);
  const startMin = extractMinutes(startHour, startHourWithoutMinutes);
  const endMin = extractMinutes(endHour, endHourWithoutMinutes);
  const startMinToDisplay = minutesStr(startMin);
  const endMinToDisplay = minutesStr(endMin);
  const startTimeToDisplay = timeStr(
    startHourWithoutMinutes,
    startMinToDisplay
  );
  const endTimeToDisplay = timeStr(endHourWithoutMinutes, endMinToDisplay);
  const duration = endTime - startTime;
  const BORDER_SIZE = 2;
  const durationToDisplay = duration / 20 - BORDER_SIZE;

  return { startTimeToDisplay, endTimeToDisplay, durationToDisplay };
};

export const secondsToHours = (time) => {
  const oneDaySeconds = 86400;
  const oneHourSeconds = 3600;
  return time - oneDaySeconds < 0
    ? time / oneHourSeconds
    : (time - oneDaySeconds) / oneHourSeconds;
};

const extractHoursWithoutMinutes = (hours) => {
  return parseInt(hours);
};

const extractMinutes = (hours, hoursWithoutMinutes) => {
  return (hours - hoursWithoutMinutes) * 60;
};

const minutesStr = (minutes) => {
  //with 2 numbers
  return minutes.toFixed(0) < 10
    ? `0${minutes.toFixed(0)}`
    : minutes.toFixed(0);
};

const timeStr = (hoursWithoutMinutes, minutes) => {
  return `${hoursWithoutMinutes}h${minutes}`;
};
