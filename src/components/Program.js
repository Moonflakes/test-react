import React, { Fragment } from "react";
import TimeSlot from "./TimeSlot";
import HoursScale from "./HoursScale";

class Program extends React.Component {
  constructor(props) {
    super(props);
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
    const { data } = this.props;
    return (
      <div className="Chns">
        <HoursScale startTime={data.startTime} endTime={data.endTime} />
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
                const withoutLastTimeSlot = chn.shows.length - 1 === index &&
                  show.endTime < endTime && {
                    title: "Sans programme",
                    startTime: show.endTime,
                    endTime: endTime,
                  };
                return (
                  <Fragment key={`show-${index}-${this.props.selectedData}`}>
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
    );
  }
}

export default Program;
