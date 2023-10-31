const express = require("express");
const Document = require("../models/document");
const auth = require("../middlewears/auth_middlewear");

const documentRouter = express.Router();

documentRouter.get("/", auth, async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user });
    res.json(documents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

documentRouter.post("/", auth, async (req, res) => {
  const { title, content, createdAt } = req.body;

  try {
    const document = Document({ title, content, createdAt, ownerId: req.user });
    await document.save();
    res.json(document);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = documentRouter;
