// Knex Node Modules
const knex = require("knex");

// Environment Variables
const {
    NODE_ENV,
    DATABASE_SECRET_KEY,
    DATABASE_NAME,
    DATABASE_PORT,
  } = process.env,
  DATABASE_STRING = "";

// DB setup
const db =
  NODE_ENV !== "production"
    ? knex({
        client: "pg",
        connection: {
          host: "127.0.0.1",
          user: "postgres",
          password: DATABASE_SECRET_KEY,
          database: DATABASE_NAME,
          port: DATABASE_PORT,
        },
      })
    : knex({
        client: "pg",
        connection: DATABASE_STRING,
      });

module.exports = db;
