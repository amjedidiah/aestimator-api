// Node Modules
const fs = require("fs"),
  path = require("path"),
  readline = require("readline"),
  router = require("express").Router(),
  crypto = require("crypto"),
  js2xmlparser = require("js2xmlparser"),
  estimator = require("./src/estimator"),
  secret = "aestimator";

// Get DB from Config
const db = require("../../../config/db");

// Endpoint for default JSON response
router.post("/", ({ body }, res) => res.json(estimator(body)));

// Endpoint for JSON response
router.post("/json", ({ body }, res) => res.json(estimator(body)));

// Endpoint for XML response
router.post("/xml", ({ body }, res) =>
  res
    .writeHead("Content-Type", "text/xml")
    .send(js2xmlparser.parse("output", estimator(body)))
);

// Endpoint for Log file
router.get("/logs", (req, res) => {
  async function processLineByLine() {
    const fileStream = fs.createReadStream(
        path.join(__dirname + "/../../../", "access.log")
      ),
      rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

    let output = [];
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      output.push(line);
    }

    output = output.join("\n");

    res.setHeader("Content-Type", "text/plain").send(output);
  }

  processLineByLine();
});

module.exports = router;
