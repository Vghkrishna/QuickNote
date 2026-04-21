import React, { useState, useEffect } from 'react';
import { X, FileText, Type } from 'lucide-react';

const NoteModal = ({ isOpen, onClose, onSave, editingNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
    setError('');
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }
    onSave({ title, content });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <X size={24} />
        </button>

        <div style={{ marginBottom: '32px' }}>
          <h2 className="auth-title" style={{ textAlign: 'left', margin: 0 }}>
            {editingNote ? 'Edit Note' : 'Create New Note'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
            Capture your thoughts and sync them to your secure cloud.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div style={{ position: 'relative' }}>
            <Type size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: 'rgba(255,255,255,0.2)' }} />
            <input
              type="text"
              className="glass-input"
              placeholder="Note Title"
              style={{ paddingLeft: '48px' }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div style={{ position: 'relative' }}>
            <FileText size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: 'rgba(255,255,255,0.2)' }} />
            <textarea
              className="glass-input"
              placeholder="Start typing your note here..."
              style={{ paddingLeft: '48px', minHeight: '180px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {error && <div className="error-msg">{error}</div>}
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            <button type="button" className="glass-button secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="glass-button">
              {editingNote ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
