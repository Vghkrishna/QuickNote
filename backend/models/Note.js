const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title for the note'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content for the note']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', NoteSchema);
