const { Schema, model } = require("mongoose");
const { serviceSchema } = require("../models/Service")

const turnSchema = new Schema(
  {
    client: {
      type: String
    },
    business: {
      type: String
    },
    schedule: {
      type: Date
    },
    state: {
      type: String
    },
    service: {
      type: serviceSchema,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Turn", turnSchema);
