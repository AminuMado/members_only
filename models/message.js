//Requre mongoose
const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

//Virtual for message post date
messageSchema.virtual("timestamp_formatted").get(function () {
  return this.timestamp.toLocaleString("en-CA");
});

// Create a model
const Message = mongoose.model("Message", messageSchema);

//Export model
module.exports = Message;
