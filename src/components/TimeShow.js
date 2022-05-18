import React, { useState } from "react";

/**
 *
 * @param {title?: string,
 * subtitle?: string,
 * startTime: number,
 * endTime: number,
 * pda?: number,
 * } show
 * @param {
 * startTime?: number,
 * endTime?: number,
 * } withoutTimeShow
 */
export const TimeShow = ({ show, withoutTimeShow }) => {
  const { title, subTitle, startTime, endTime, pda } = show;
  const pdaToDisplay = pda.toFixed(1);
  const { startTimeToDisplay, endTimeToDisplay, durationToDisplay, duration } =
    secondToTime(startTime, endTime);
  const pxToAdd = durationToDisplay - 75 >= 0 ? 0 : 75 - durationToDisplay;
  const [durationPx, setDurationPx] = useState(durationToDisplay);

  return (
    <>
      {durationPx > 0 && (
        <>
          <div
            className={"show"}
            onMouseEnter={() => {
              setDurationPx(durationPx + pxToAdd);
            }}
            onMouseLeave={() => {
              setDurationPx(durationToDisplay);
            }}
            style={{
              height: `${durationPx}px`,
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {title && <h4>{title}</h4>}
            {subTitle && <h5>{subTitle}</h5>}
            <h6>
              {startTimeToDisplay} - {endTimeToDisplay}
            </h6>
            {pdaToDisplay && <h5>pda: {pdaToDisplay}%</h5>}
          </div>
          {withoutTimeShow && (
            <div
              className="show"
              style={{ height: `${durationPx}px`, overflow: "hidden" }}
            />
          )}
        </>
      )}
    </>
  );
};

/**
 *
 * @param {number} startTime
 * @param {number} endTime
 */
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

/**
 *
 * @param {number} time
 */
const secondToHours = (time) => {
  return time / 60 / 60;
};

/**
 *
 * @param {number} hours
 */
const extractHoursWithoutMinutes = (hours) => {
  return parseInt(hours);
};

/**
 *
 * @param {number} hours
 * @param {number} hoursWithoutMinutes
 */
const extractMinutes = (hours, hoursWithoutMinutes) => {
  return (hours - hoursWithoutMinutes) * 60;
};

/**
 *
 * @param {number} minutes
 */
const minutesStr = (minutes) => {
  return minutes.toFixed(0) < 10
    ? `0${minutes.toFixed(0)}`
    : minutes.toFixed(0);
};

/**
 *
 * @param {number} hoursWithoutMinutes
 * @param {number} minutes
 */
const timeStr = (hoursWithoutMinutes, minutes) => {
  return `${hoursWithoutMinutes}h${minutes}`;
};
