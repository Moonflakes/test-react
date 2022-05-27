import React from "react";

class TimeShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      durationPx: 0,
      durationToDisplay: 0,
      startTimeToDisplay: 0,
      endTimeToDisplay: 0,
      pxToAdd: 0,
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
      pdaToDisplay,
    });
  }

  render() {
    const { show, showHours } = this.props;
    const { title, subTitle } = show;
    const {
      durationPx,
      pxToAdd,
      durationToDisplay,
      startTimeToDisplay,
      endTimeToDisplay,
      pdaToDisplay,
    } = this.state;
    return (
      <>
        {durationPx > 0 && (
          <>
            <div
              className={"show"}
              onMouseEnter={() => {
                this.setState({
                  durationPx: durationPx + pxToAdd,
                });
              }}
              onMouseLeave={() => {
                this.setState({ durationPx: durationToDisplay });
              }}
              style={{
                height: `${durationPx}px`,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {pdaToDisplay && (
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
                  pda:{" "}
                  <span style={{ backgroundColor: "rgb(21 14 216 / 20%)" }}>
                    {pdaToDisplay}%
                  </span>
                </h5>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default TimeShow;

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

const minutesStr = (minutes) => { //with 2 numbers
  return minutes.toFixed(0) < 10
    ? `0${minutes.toFixed(0)}`
    : minutes.toFixed(0);
};

const timeStr = (hoursWithoutMinutes, minutes) => {
  return `${hoursWithoutMinutes}h${minutes}`;
};
