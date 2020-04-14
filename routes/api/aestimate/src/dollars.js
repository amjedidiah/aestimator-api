const computeDollarsInFlight = (
  periodType,
  timeToElapse,
  infectionsByRequestedTime,
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation
) => {
  const timeInDays = require("./days"),
    days = timeInDays(timeToElapse, periodType);

  return Math.floor(
    (infectionsByRequestedTime *
      avgDailyIncomePopulation *
      avgDailyIncomeInUSD) /
      days
  );
};

module.exports = computeDollarsInFlight;
