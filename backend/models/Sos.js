const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  emergency: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
    default: "",
  },

  aiAnalysis: {
    type: String,
    default: "",
  },

  location: {
    latitude: Number,
    longitude: Number,
  },

  status: {
    type: String,
    default: "Pending",
  },

  assignedTo: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SOS", sosSchema);