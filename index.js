const dotenv = require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
console.log(dotenv);
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 4000;

// Create an express app
const app = express();

// Create database connection
mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connection successfull!"))
  .catch((e) => {
    console.log("Connection unsuccessfull: ", e);
  });

/**
 * Middlewares
 **/

/**
 * Database configuration
 **/

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
