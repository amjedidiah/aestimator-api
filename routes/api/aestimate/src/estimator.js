const covid19ImpactEstimator = (data) => {
  const computeInfectionsByRequestedTime = require("./infections"),
    computeDollarsInFlight = require("./dollars"),
    {
      reportedCases,
      periodType,
      timeToElapse,
      totalHospitalBeds,
      region,
    } = data,
    { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region,
    obj = {
      data: {},
      impact: {
        currentlyInfected: reportedCases * 10,
        get infectionsByRequestedTime() {
          return computeInfectionsByRequestedTime(
            periodType,
            timeToElapse,
            this.currentlyInfected
          );
        },
        get severeCasesByRequestedTime() {
          return 0.15 * this.infectionsByRequestedTime;
        },
        get hospitalBedsByRequestedTime() {
          const val =
            totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime;
          return val > 0 ? Math.floor(val) : Math.ceil(val);
        },
        get casesForICUByRequestedTime() {
          return Math.floor(0.05 * this.infectionsByRequestedTime);
        },
        get casesForVentilatorsByRequestedTime() {
          return Math.floor(0.02 * this.infectionsByRequestedTime);
        },
        get dollarsInFlight() {
          return computeDollarsInFlight(
            periodType,
            timeToElapse,
            this.infectionsByRequestedTime,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
          );
        },
      },
      severeImpact: {
        currentlyInfected: reportedCases * 50,
        get infectionsByRequestedTime() {
          return computeInfectionsByRequestedTime(
            periodType,
            timeToElapse,
            this.currentlyInfected
          );
        },
        get severeCasesByRequestedTime() {
          return 0.15 * this.infectionsByRequestedTime;
        },
        get hospitalBedsByRequestedTime() {
          const val =
            totalHospitalBeds * 0.35 - this.severeCasesByRequestedTime;
          return val > 0 ? Math.floor(val) : Math.ceil(val);
        },
        get casesForICUByRequestedTime() {
          return Math.floor(0.05 * this.infectionsByRequestedTime);
        },
        get casesForVentilatorsByRequestedTime() {
          return Math.floor(0.02 * this.infectionsByRequestedTime);
        },
        get dollarsInFlight() {
          return computeDollarsInFlight(
            periodType,
            timeToElapse,
            this.infectionsByRequestedTime,
            avgDailyIncomeInUSD,
            avgDailyIncomePopulation
          );
        },
      },
    };

  return obj;
};

module.exports = covid19ImpactEstimator;
