//Requre mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  post_date: { type: Date, default: Date.now },
});

//Virtual for message post date
messageSchema.virtual("post_date_formatted").get(function () {
  return this.post_date.toLocaleString("en-CA");
});

// Create a model
const Message = mongoose.model("Message", messageSchema);

//Export model
module.exports = Message;
