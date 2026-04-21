const express = require('express');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All note routes are protected
router.use(protect);

// @route   GET /api/notes
// @desc    Get all notes for logged in user
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    // Make sure user owns the note
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this note' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   POST /api/notes
// @desc    Create new note
router.post('/', async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update note
router.put('/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    // Make sure user owns the note
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to update this note' });
    }
    
    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    // Make sure user owns the note
    if (note.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this note' });
    }
    
    await note.deleteOne();
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
