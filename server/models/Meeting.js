const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: String,

  fileName: String,

  transcript: String,

  summary: String,

  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "Meeting",
  meetingSchema
);