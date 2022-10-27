const express = require("express");
const router = express.Router();
let Ship = require("../models/Ship");

/**
 * tell Express.js that when it receives a POST request at the URL /newShip/, to do this code.
 */
router.post("/newShip/", function (req, res) {
  // look up documents in MongoDB by name.
  Ship.findOne({ name: req.body.name }, function (error, doc) {
    // if there was an error
    if (error) {
      console.error("Error finding ship", error);
      res.status(500).send(error);
    }
    // if no document was found
    else if (!doc) {
      // create a new instance of the Ship model, using the request body as the data.
      new Ship(req.body).save((err, doc) => {
        /**
         * this error/document fat-arrow function is required.
         * on an error, handle it. else send the newly created document back to the client.
         */
        if (err) {
          console.error("Error saving new ship", err);
          res.status(500).send(err);
        }
        else {
          res.send(doc);
        }
      });
    }
    // a document was found, return it instead.
    else {
      res.send(doc);
    }
  });
});

router.get('/getShip/name', (req, res) => {
  Ship.findOne({ name: req.params.name }, (err, doc) => {
    if (err) {
      console.error('Error finding ship')
      res.status(500).send(err)
    }
    else {
      if (!doc) {
        res.status(404).send('File not found')
      }
      else {
        res.status(200).send(doc)
      }
    }
  })
})

module.exports = router;