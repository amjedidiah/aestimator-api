const computeInfectionsByRequestedTime = (
  periodType,
  timeToElapse,
  currentlyInfected
) => {
  const timeInDays = require("./days"),
    days = timeInDays(timeToElapse, periodType),
    factor = Math.floor(days / 3),
    multiplier = 2 ** factor;

  return currentlyInfected * multiplier;
};

module.exports = computeInfectionsByRequestedTime;
