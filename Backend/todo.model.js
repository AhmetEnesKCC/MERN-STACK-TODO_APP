const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Todo = new Schema(
  {
    todo: {
      type: String,
    },
    importance: {
      type: Number,
    },

    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

module.exports = mongoose.model("Todo", Todo);
