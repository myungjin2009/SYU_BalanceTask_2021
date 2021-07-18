const mongoose = require("mongoose");

const { Schema } = mongoose;
const friendsSchema = new Schema({
  user: {
    type: String,
  },
  friend: {
    type: String,
    required: true,
  },
  friend_introduce: {
    type: String,
  },
});

module.exports = mongoose.model("friends", friendsSchema);
