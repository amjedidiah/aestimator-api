const timeInDays = (timeToElapse, periodType) => {
  const count = {
    days: timeToElapse,
    weeks: timeToElapse * 7,
    months: timeToElapse * 30,
  }[periodType];

  return count;
};

module.exports = timeInDays;
