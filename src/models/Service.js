const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    price: {
      type: Number
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const Service = model("Service", serviceSchema);
module.exports = { serviceSchema, Service };
