const express = require("express");
const {
  allNotes,
  //singleNote,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController.js");
const router = express.Router();
const verifyToken = require("../middlewares/verifyTokenMiddleware");

router.get("/", verifyToken, allNotes);
//router.get("/single/:id ", verifyToken, singleNote);
router.post("/create", verifyToken, createNote);
router.delete("/:id", verifyToken, deleteNote);
router.put("/:id", verifyToken, updateNote);

module.exports = router;
