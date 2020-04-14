// Node Modules
const express = require("express"),
  router = express.Router();

// Configure API route for App
router.use("/api", require("./api"));

// Null all other requests
router.get("/*", (req, res) =>
  res.send({
    data: null,
    message: "Incorrect Route",
    error: true,
  })
);

// Export API route
module.exports = router;
