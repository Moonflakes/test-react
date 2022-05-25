import React from "react";

class TimeShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      durationPx: 0,
      durationToDisplay: 0,
      startTimeToDisplay: 0,
      endTimeToDisplay: 0,
      duration: 0,
      pxToAdd: 0,
      pdaToDisplay: 0,
    };
  }

  componentDidMount() {
    const { show } = this.props;
    const { startTime, endTime, pda } = show;
    const pdaToDisplay = pda.toFixed(1);
    const {
      startTimeToDisplay,
      endTimeToDisplay,
      durationToDisplay,
      duration,
    } = secondToTime(startTime, endTime);
    const pxToAdd = durationToDisplay - 75 >= 0 ? 0 : 75 - durationToDisplay;
    this.setState({
      durationPx: durationToDisplay,
      durationToDisplay,
      startTimeToDisplay,
      endTimeToDisplay,
      duration,
      pxToAdd,
      pdaToDisplay,
    });
  }

  render() {
    const { show, withoutTimeShow } = this.props;
    const { title, subTitle } = show;
    return (
      <>
        {this.state.durationPx > 0 && (
          <>
            <div
              className={"show"}
              onMouseEnter={() => {
                this.setState({
                  durationPx: this.state.durationPx + this.state.pxToAdd,
                });
              }}
              onMouseLeave={() => {
                this.setState({ durationPx: this.state.durationToDisplay });
              }}
              style={{
                height: `${this.state.durationPx}px`,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {title && <h4>{title}</h4>}
              {subTitle && <h5>{subTitle}</h5>}
              <h6>
                {this.state.startTimeToDisplay} - {this.state.endTimeToDisplay}
              </h6>
              {this.state.pdaToDisplay && (
                <h5>pda: {this.state.pdaToDisplay}%</h5>
              )}
            </div>
            {withoutTimeShow && (
              <div
                className="show"
                style={{
                  height: `${this.state.durationPx}px`,
                  overflow: "hidden",
                }}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export default TimeShow;

const secondToTime = (startTime, endTime) => {
  const startHour = secondToHours(startTime);
  const endHour = secondToHours(endTime);
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
  console.log(duration, durationToDisplay);

  return { startTimeToDisplay, endTimeToDisplay, durationToDisplay, duration };
};

const secondToHours = (time) => {
  return time / 60 / 60;
};

const extractHoursWithoutMinutes = (hours) => {
  return parseInt(hours);
};

const extractMinutes = (hours, hoursWithoutMinutes) => {
  return (hours - hoursWithoutMinutes) * 60;
};

const minutesStr = (minutes) => {
  return minutes.toFixed(0) < 10
    ? `0${minutes.toFixed(0)}`
    : minutes.toFixed(0);
};

const timeStr = (hoursWithoutMinutes, minutes) => {
  return `${hoursWithoutMinutes}h${minutes}`;
};
