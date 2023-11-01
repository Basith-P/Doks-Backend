const express = require("express");
const Document = require("../models/document");
const auth = require("../middlewears/auth_middlewear");

const documentRouter = express.Router();

documentRouter.get("/", auth, async (req, res) => {
  try {
    const documents = await Document.find({ ownerId: req.user });
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

documentRouter.get("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

documentRouter.put("/:id/title", auth, async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  try {
    const document = await Document.findByIdAndUpdate(id, { title }, { new: true });
    res.json(document);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = documentRouter;
