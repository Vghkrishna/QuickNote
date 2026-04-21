import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import ConfirmModal from '../components/ConfirmModal';
import { 
  Plus, 
  StickyNote, 
  Search, 
  LayoutGrid, 
  BookOpen,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  // Custom Confirm Modal State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notes');
      setNotes(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError('Failed to fetch notes. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        const res = await api.put(`/notes/${editingNote._id}`, noteData);
        setNotes(notes.map(note => note._id === editingNote._id ? res.data.data : note));
      } else {
        const res = await api.post('/notes', noteData);
        setNotes([res.data.data, ...notes]);
      }
      setIsNoteModalOpen(false);
      setEditingNote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save note.');
    }
  };

  const openDeleteConfirm = (id) => {
    setNoteToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteNote = async () => {
    if (!noteToDelete) return;
    try {
      await api.delete(`/notes/${noteToDelete}`);
      setNotes(notes.filter(note => note._id !== noteToDelete));
      setNoteToDelete(null);
    } catch (err) {
      setError('Failed to delete note.');
    }
  };

  return (
    <div className="main-layout">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="nav-brand" style={{ marginBottom: '10px' }}>
          <BookOpen size={28} style={{ color: 'var(--accent-color)' }} />
          <span>QuickNote</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '30px', paddingLeft: '10px' }}>
          PERSONAL SPACE
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-item active">
            <LayoutGrid size={20} />
            <span>All Notes</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email?.split('@')[0]}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Cloud Workspace</div>
            </div>
          </div>
          <button onClick={logout} className="glass-button secondary" style={{ width: '100%', padding: '8px', fontSize: '0.8rem', gap: '6px' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Section */}
      <main className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">My Notes</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
              You have {notes.length} total notes saved.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', gap: '20px' }}>
            <div className="search-bar-container">
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="Search your notes..." 
                  style={{ paddingLeft: '48px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button className="glass-button" onClick={() => setIsNoteModalOpen(true)}>
              <Plus size={20} /> Create Note
            </button>
          </div>
        </header>

        {error && <div className="error-msg" style={{ marginBottom: '20px' }}>{error}</div>}

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '100px' }}>
            <p>Syncing Cloud...</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <StickyNote size={64} style={{ color: 'var(--accent-color)', opacity: 0.8 }} />
                <h2>{searchQuery ? 'No results found' : 'No notes yet'}</h2>
                <p>{searchQuery ? `We couldn't find anything matching "${searchQuery}"` : 'Click "Create Note" to start organizing your thoughts.'}</p>
              </div>
            ) : (
              filteredNotes.map(note => (
                <NoteCard 
                  key={note._id} 
                  note={note} 
                  onEdit={(n) => { setEditingNote(n); setIsNoteModalOpen(true); }} 
                  onDelete={openDeleteConfirm} 
                />
              ))
            )}
          </div>
        )}

        <NoteModal 
          isOpen={isNoteModalOpen} 
          onClose={() => { setIsNoteModalOpen(false); setEditingNote(null); }} 
          onSave={handleSaveNote}
          editingNote={editingNote}
        />

        <ConfirmModal 
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteNote}
          title="Delete Note"
          message="Are you sure you want to delete this note? This action cannot be undone."
          confirmText="Delete"
          type="danger"
        />
      </main>
    </div>
  );
};

export default Dashboard;
