const { Schema, model } = require("mongoose");

export const serviceSchema = new Schema(
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
    timestamps: true,
  }
);

module.exports = model("Service", serviceSchema);
