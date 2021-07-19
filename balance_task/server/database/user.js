const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  evaluation_score: {
    type: Number,
  },
  agreement: {
    type: Boolean,
    required: true,
  },
  evaluation_text: {
    type: String,
  },
  clear_group: {
    type: Number,
  },
  user_image: {
    type: String,
    required: true,
  },
  introduce: {
    type: String,
    required: true,
  },
  user_category: {
    type: String,
  },
});
db.createCollection("books");

module.exports = mongoose.model("user", userSchema);
