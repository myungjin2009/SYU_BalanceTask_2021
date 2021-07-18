const mongoose = require("mongoose");

const { Schema } = mongoose;
const chatSchema = new Schema({
  chat_date: {
    type: Date,
    required: true,
  },
  chat_id: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  group_name: {
    type: String,
    required: true,
  },
  chat_content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("chat", chatSchema);
