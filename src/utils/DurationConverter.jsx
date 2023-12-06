import React from 'react';

const DurationConverter = ({ duration }) => {
  const parseDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = (match[1] && parseInt(match[1], 10)) || 0;
    const minutes = (match[2] && parseInt(match[2], 10)) || 0;
    const seconds = (match[3] && parseInt(match[3], 10)) || 0;

    return {
      hours,
      minutes,
      seconds,
    };
  };

  const formatDuration = (durationObj) => {
    const { hours, minutes, seconds } = durationObj;
    const formattedHours = hours > 0 ? `${hours}h` : '';
    const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
    const formattedSeconds = seconds > 0 ? `${seconds}s` : '';

    return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`.trim();
  };

  const parsedDuration = parseDuration(duration);
  const formattedDuration = formatDuration(parsedDuration);

  return <span>{formattedDuration}</span>;
};

export default DurationConverter;
