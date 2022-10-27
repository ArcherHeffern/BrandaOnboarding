const mongoose = require("mongoose");
/**
 * URL to the MongoDB instance.
 */
const MONGODB_URL = "REPLACE THIS WITH YOUR DB URL";

// Tell Mongoose to connect to the MongoDB instance using the provided configuration.
mongoose.connect(MONGODB_URL);

/**
 * Mongoose connection to the MongoDB instance.
 */
let db = mongoose.connection;

// Listen for errors and print them to the console.
db.on("error", function (err) {
  console.error("Mongoose Error: ", err);
});

// When the MongoDB connection is made, print to the console.
db.once("open", function () {
  console.info("Mongoose connection successful.");
});