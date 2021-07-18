const mongoose = require("mongoose");

const { Schema } = mongoose;
const groupUserSchema = new Schema({
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("groupUser", groupUserSchema);
