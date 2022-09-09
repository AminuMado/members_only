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

messageSchema.virtual("timestamp_calendar").get(function () {
  return this.timestamp.toLocaleString("en-CA").slice(0, 10);
});

messageSchema.virtual("timestamp_time").get(function () {
  if (this.timestamp.toLocaleString("en-CA").length == 25) {
    const hour = this.timestamp.toLocaleString("en-CA").slice(11, 17);
    const ampm = this.timestamp.toLocaleString("en-CA").slice(20, 24);
    return hour + " " + ampm;
  }
  const hour = this.timestamp.toLocaleString("en-CA").slice(11, 16);
  const ampm = this.timestamp.toLocaleString("en-CA").slice(19, 24);
  return hour + " " + ampm;
});
// Create a model
const Message = mongoose.model("Message", messageSchema);

//Export model
module.exports = Message;
