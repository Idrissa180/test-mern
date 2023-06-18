// constants
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

// configs
dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());

// routes
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// launching server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is run");
});
