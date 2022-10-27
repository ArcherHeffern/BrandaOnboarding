const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema to describe a ship.
 */
let ShipSchema = new Schema({
  /**
   * Name of this Ship
   */
  name: {
    type: String
  },
  /**
   * Ship's top speed in kts.
   */
  speed: {
    value: {type: Number},
    unit: {type: String, default: "kts"}
  },
  /**
   * When this Ship was designed.
   */
  designed: {
    type: Date
  },
  /**
   * When this Ship was launched.
   */
  launched: {
    type: Date
  },
  /**
   * Descriptor of ship's main battery guns.
   */
  mainBattery: {
    type: String
  },
  /**
   * Descriptor of the ship's secondary battery guns.
   */
  secondaryBattery: {
    type: String
  },
  /**
   * Ship's belt armor in mm.
   */
  armor: {
    value: {type: Number},
    unit: {type: String, default: "mm"}
  }
});

let Ship = mongoose.model("Ship", ShipSchema);
module.exports = Ship;