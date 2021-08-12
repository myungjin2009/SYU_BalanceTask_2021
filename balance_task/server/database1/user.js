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

let user = mongoose.model("user", userSchema);
user.create({
  id: "bjh9807",
  name: "백정훈",
  password: "1234",
  phone: "010-1234-5678",
  evaluation_score: 97,
  agreement: true,
  evaluation_text: "굿임",
  clear_group: 5,
  user_image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs0iXMmW2tJE-aDI2loDJxn_a3hIjWHR4VwA&usqp=CAU",
  introduce: "백엔드요",
  user_category: "it",
});

module.exports = mongoose.model("user", userSchema);
