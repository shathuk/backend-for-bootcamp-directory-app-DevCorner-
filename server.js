const express = require("express");
const dotEnv = require("dotenv");
const colors = require("colors");
const bootcampRoute = require("./routes/bootcamp");
const connectDB = require("./config/db");
const app = express();
//Error middleware
const errorHandler = require("./middleware/error");

//Load ENV
dotEnv.config({ path: "./config/config.env" });

//Enable req.body parser
app.use(express.json());

//Routes For Bootcamps
app.use("/api/v1/bootcamps", bootcampRoute);

//Error middleware
app.use(errorHandler);

//Connect MongoDB
connectDB();

//Server running Port
const PORT = process.env.PORT || 5000;

//Server Listen on Port
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.MODE} Mode on port ${PORT}`.inverse.green
  );
});
