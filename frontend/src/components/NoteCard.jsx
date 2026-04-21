import React from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="note-card glass-panel">
      <h3 className="note-card-title" title={note.title}>{note.title}</h3>
      <div className="note-card-content">
        {note.content}
      </div>
      <div className="note-card-footer">
        <span className="note-card-date">
          <Calendar size={14} />
          {date}
        </span>
        <div className="note-card-actions">
          <button className="action-btn edit" onClick={() => onEdit(note)} title="Edit Note">
            <Pencil size={16} />
          </button>
          <button className="action-btn delete" onClick={() => onDelete(note._id)} title="Delete Note">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
