const mongoose = require("mongoose");

const { Schema } = mongoose;
const groupCalendarSchema = new Schema({
  process: {
    type: Number,
    required: true,
    unique: true,
  },
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  do_text: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("groupCalendar", groupCalendarSchema);
