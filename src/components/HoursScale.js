import React from "react";
import TimeSlot, { secondsToHours } from "./TimeSlot";

class HoursScale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { startTime, endTime } = this.props;
    const hoursOfDay = getHoursOfDay(startTime, endTime);
    return (
      <div style={{ marginTop: "18px" }}>
        {hoursOfDay?.map((hour, index) => {
          return (
            <TimeSlot show={hour} key={`hour-${index}`} showHours={false} />
          );
        })}
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

export default HoursScale;
