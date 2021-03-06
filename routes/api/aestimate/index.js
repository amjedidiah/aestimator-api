// Node Modules
const fs = require("fs"),
  path = require("path"),
  router = require("express").Router(),
  js2xmlparser = require("js2xmlparser"),
  estimator = require("./src/estimator");

// Endpoint for default JSON response
router.post("/", ({ body }, res) => res.json(estimator(body)));

// Endpoint for JSON response
router.post("/json", ({ body }, res) => res.json(estimator(body)));

// Endpoint for XML response
router.post("/xml", ({ body }, res) => {
  res
    .contentType("application/xml")
    .send(js2xmlparser.parse("data", estimator(body)));
});

// Endpoint for Log file
router.get("/logs", (req, res) => {
  fs.readFile(
    path.join(__dirname + "/../../../", "access.log"),
    "utf8",
    (err, data) => {
      if (err) throw err;
      res.header("Content-Type", "text/plain; charset=utf-8").send(data);
    }
  );
});

module.exports = router;
