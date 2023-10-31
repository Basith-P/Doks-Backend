const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Untitled",
  },
  content: {
    type: String,
    default: [],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
