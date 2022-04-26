const dotenv = require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

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

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 * Routes
 **/

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
