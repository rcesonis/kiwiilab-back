const dotenv = require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const corsMiddleWare = require("cors");

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
app.use(corsMiddleWare());

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 * Routes
 **/

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
