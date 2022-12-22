const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userName: String,
    email: String,
    comment: String,
    rate: Number,
    announce: { type: Schema.Types.ObjectId, ref: "Announcment" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reply", schema);
