//importing required modules
const Note = require("../models/noteModel");

//Create
const createNote = async (req, res) => {
  try {
    const note = new Note({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
    });
    const saveNote = await note.save();
    res.status(200).json(saveNote);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update
const updateNote = async (req, res) => {
  try {
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateNote);
  } catch (err) {
    res.status(400).json(err);
  }
};

//DELETE
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

//GET ALL
const allNotes = async (req, res) => {
  try {
    const allnotes = await Note.find({ user: req.user._id });
    res.status(200).json(allnotes);
  } catch (err) {
    res.status(400).json(err);
  }
};

//GET SINGLE NOTE
const singleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  allNotes,
  singleNote,
};
