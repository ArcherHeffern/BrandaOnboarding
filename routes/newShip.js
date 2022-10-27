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
  Ship.findOne({ name: req.body.name }, (err, doc) => {
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

router.get('/getShip/:key/:value', (req, res) => {
  // find item with key req.params['characteristic'] AND value 
  Ship.find({ [req.params['key']]: req.params['value'] }, (err, doc) => {
    if (err) {
      res.status(500).send("Error finding ship")
    }
    else {
      if (!doc) {
        res.status(404).send("File not found")
      }
      else {
        res.status(200).send(doc)
      }
    }
  })
})

/*
Our stored years of launch are not very accurate. While year of design can be fuzzy, a ship's launch date is kind of important. Let's try and update the launch dates of our non-napkin ships to be more accurate. Create a new route that will accept PATCH requests at /updateShip and update the ship with the given name to have whichever new fields are passed in the request body.
Use the Mongoose findOneAndUpdate function.
Assume that the name of the ship to update is always included in the request.
Assume that there will be at least one field to update included in the request.
If no ship with the given name is found, return HTTP code 404.
If there is an error while finding the ship to update, return HTTP code 500 and the error message.
Upon a successful update, return the updated document */

router.patch('/updateShip', (req, res) => {
  // If no ship name is given in the request, return HTTP code 400.
  if (!req.body.name) {
    res.status(400).send('No ship specified')
  }
  Ship.findOneAndUpdate({ name: req.body.name }, { launched: req.body.newDate }, { new: true }, (err, doc) => {
    if (err) {
      res.status(500).send('Error finding the ship')
    }
    else if (!doc) {
      res.status(404).send('No ship with the given name found')
    }
    else {
      res.status(200).send(doc)
    }
  })
})


module.exports = router;