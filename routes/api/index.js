// Node Modules
const express = require("express"),
  router = express.Router();

// Configure API routes
router.use("/v1/on-covid-19", require("./aestimate"));

// Export API routes
module.exports = router;
