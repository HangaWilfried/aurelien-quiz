const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  score: Number,
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Users", postSchema)
