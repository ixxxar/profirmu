const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: String,
    rate: Number,
    inn: String,
    adres: String,
    phone: String,
    userName: String,
    email: String,
    comment: String,
    items: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Announcment", schema);
