const express = require('express');
const router = express.Router();
const { getNotes, getMyNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getNotes)
  .post(protect, createNote);

router.get('/my-notes', protect, getMyNotes);

router.route('/:id')
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
