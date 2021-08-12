const mongoose = require("mongoose");

const { Schema } = mongoose;
const groupsSchema = new Schema({
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
  group_images: {
    type: String,
  },
  startdate: {
    type: Date,
    required: true,
  },
  percentage: {
    type: Number,
  },
  group_chatting: {
    type: String,
  },
  group_calendar: {
    type: String,
  },
  user: {
    type: String,
  },
  enjoy: {
    type: Boolean,
  },
  host: {
    type: String,
  },
  manager: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  host_images: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("groups", groupsSchema);
