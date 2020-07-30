const { Schema, model } = require("mongoose");
const { serviceSchema } = require("../models/Service")

const timeSchema = new Schema(
  {
    hour: {
      type: Number
    },
    minutes: {
      type: Number
    },
  },
  {
    _id: false
  }
);

const scheduleSchema = new Schema(
  {
    days: {
      type: String
    },
    from: {
      type: timeSchema
    },
    to: {
      type: timeSchema
    },
  },
  {
    _id: false
  }
)

const addressSchema = new Schema(
  {
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    zones: {
      type: [String]
    },
    address: {
      type: String
    }
  }
)

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        },
        message: props => `${props.value} is not a valid email address.`
      },
    },
    password: {
      type: String,
      minlength: [8, 'Password is too short'],
    },
    fullName: {
      type: String,
      required: [true, 'The fullname is required.'],
      trim: true,
      set: (str) => str.replace(/\s\s+/g, " "),
    },
    schedule: {
      type: [scheduleSchema]
    },
    address: {
      type: addressSChema
    },
    services: {
      type: [serviceSchema]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
