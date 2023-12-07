export const formatDuration = (duration) => {
    const getNumber = (text) => {
      return parseInt(text.substring(2), 10);
    };
  
    let minutes = 0;
    let seconds = 0;
  
    if (duration.includes('M')) {
      minutes = getNumber(duration.split('M')[0]);
    }
    if (duration.includes('S')) {
      seconds = getNumber(duration.split('S')[0]);
    }
  
    if (minutes > 59) {
      const hours = Math.floor(minutes / 60);
      minutes %= 60;
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };
  