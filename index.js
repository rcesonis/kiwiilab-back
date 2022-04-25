const express = require("express");
const PORT = 4000;

// Create an express app
const app = express();

/**
 * Middlewares
 **/

/**
 * Database configuration
 **/

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
