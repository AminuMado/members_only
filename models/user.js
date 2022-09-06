//Requre mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: [true, "Please enter your username"] },
  password: { type: String, required: [true, "Please enter a password"] },
  avatar: { type: String, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  join_date: { type: Date, default: Date.now },
});

//Virtual for user join date
userSchema.virtual("join_date_formatted").get(function () {
  return this.join_date.toLocaleDateString("en-CA");
});

// Create a model
const User = mongoose.model("User", userSchema);

//Export model
module.exports = User;
