const Note = require('../models/Note');

// @desc    Get all public notes
// @route   GET /api/notes
// @access  Public
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's notes
// @route   GET /api/notes/my-notes
// @access  Private
exports.getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
exports.createNote = async (req, res) => {
  const { title, description, subject, tags } = req.body;

  if (!title || !description || !subject) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const note = await Note.create({
      title,
      description,
      subject,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      authorId: req.user._id,
      authorName: req.user.name
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Make sure user owns note
    if (note.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this note' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tags: req.body.tags ? (typeof req.body.tags === 'string' ? req.body.tags.split(',').map(t => t.trim()) : req.body.tags) : note.tags
      },
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Make sure user owns note
    if (note.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this note' });
    }

    await note.deleteOne();

    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
