/**
 * 
Display name
Notes:
You can nest values if you like, especially when it comes to gas or electric-specific values.
If you feel strongly, you use SI instead of Imperial units.
If you are an angry car person, feel free to add more detail.
For number values, please specify what unit those values are in, either in a comment or by adding a nested unit field to the property
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CarSchema = new Schema({
  /**
   * Make of car and release date
   */
  make: {
    model: { type: String },
    modelYear: { type: String }
  },
  /**
   * MPG (Miles Per Gallon) or range (for EVs)
   */
  fuelEfficiency: {
    distance: { type: Number },
    units: { type: String }
  },
  /**
   * Engine type (gas, hybrid, or EV)
   */
  engineType: {
    type: String
  },
  /**
   * VIN (unique alphanumeric identifier)
   */
  VIN: {
    type: String
  },
  /**
   * Odometer miles (how many miles the car has been driven)
   */
  OdometerMiles: {
    type: Number
  }
})

let Car = mongoose.model("Car", CarSchema);
module.exports = Car;