export const formatDuration = (duration) => {
  const getNumber = (text) => {
    return parseInt(text, 10);
  };

  const matches = duration.match(/\d+/g);

  const hours = matches && matches.length > 2 ? getNumber(matches[0]) : 0;
  const minutes = matches && matches.length > 1 ? getNumber(matches[matches.length - 2]) : 0;
  const seconds = matches ? getNumber(matches[matches.length - 1]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `0:${seconds.toString().padStart(2, '0')}`;
  }
};
