const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
      unique: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
