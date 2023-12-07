export const formatCount = (count) => {
  // 1e3 represents 1 followed by 3 zeros, which equals 1,000 (1 thousand)
  if (count >= 1e9) {
    return (count / 1e9).toFixed(1) + "B";
  } else if (count >= 1e6) {
    return (count / 1e6).toFixed(1) + "M";
  } else if (count >= 1e3) {
    return (count / 1e3).toFixed(1) + "K";
  } else {
    return count.toString();
  }
};
