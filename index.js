const dotenv = require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
console.log(dotenv);
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

// Create an express app
const app = express();

// Create db connection
mongoose
  .connect(DB || 4000)
  .then(() => console.log("Database connection successfull!"))
  .catch((e) => {
    console.log(e);
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
