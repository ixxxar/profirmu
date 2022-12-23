const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
