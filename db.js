const mongoose = require("mongoose");
require("dotenv").config()
/**
 * URL to the MongoDB instance.
 */
// Tell Mongoose to connect to the MongoDB instance using the provided configuration.
mongoose.connect(process.env.MongoDB_URL);

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