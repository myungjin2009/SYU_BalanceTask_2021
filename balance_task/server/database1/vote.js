const mongoose = require("mongoose");

const { Schema } = mongoose;
const voteSchema = new Schema({
  board_number: {
    type: Number,
    required: true,
    unique: true,
  },
  discuss: {
    type: Number,
  },
  user: {
    type: String,
  },
  group: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("vote", voteSchema);
