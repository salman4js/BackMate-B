const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initializing server!
const app = express();

// Applying middlewares!
app.use(bodyParser.json());
app.use(cors());

// Route Connection!
const server = require("./routes/routes.js");

// DB connection
const database = "mongodb+srv://salman:pamelia@cluster0.idvkp3i.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
mongoose.connect(database, {
  useNewUrlParser : true,
})

mongoose.connection.on("connected", () => {
  console.log("Database connected..");
})

// Error handling
mongoose.connection.on("error", () => {
  console.log("Some internal error occured!");
});

app.use("/", server);

// Start server
app.listen(3002, () => {
  console.log("Server is up and running!");
})