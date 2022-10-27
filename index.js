const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const db = require('./db')

let newShip = require("./routes/newShip");

// on every request, parse the request body using this library.
app.use(express.json());
// on a request to /, use the newShip code.
// note that the entire URL including the one declared in the file must match.
app.use("/", newShip);
app.get('/', (req, res) => {
    res.send("Listening")
})

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))
