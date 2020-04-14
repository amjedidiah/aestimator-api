// Require Installed Modules
const fs = require("fs"),
  path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  morgan = require("morgan"),
  dotenv = require("dotenv");

// Load custom env variables
dotenv.config();

// My Custom Modules
const routes = require("./routes/");

// App Setup
const app = express(),
  port = process.env.PORT || 8000;

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms', { stream: accessLogStream }));
app.use(routes); // Use defined Routes

// App listen and port config
app.listen(port, () => console.log(`app's server is live on port ${port}`));
