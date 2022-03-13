export const findNearest = (arr, goal) => {
  var num = arr.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
  return num;
};

export const getDistance = (stationPath, stationCode) => {
  const nearest = findNearest(stationPath, stationCode);
  const distance = Math.abs(nearest - stationCode);
  return distance;
};
