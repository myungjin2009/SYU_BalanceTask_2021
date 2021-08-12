const mongoose = require("mongoose");

const { Schema } = mongoose;
const groupBoardSchema = new Schema({
  board_number: {
    type: Number,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  file: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  info_user: {
    type: String,
    required: true,
  },
  info_groupname: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("groupBoard", groupBoardSchema);
