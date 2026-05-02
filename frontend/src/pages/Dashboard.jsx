import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { Plus, X } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [tags, setTags] = useState('');

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/notes/my-notes');
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSubject('');
    setTags('');
    setEditingNote(null);
    setShowForm(false);
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setSubject(note.subject);
    setTags(note.tags.join(', '));
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`/api/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, description, subject, tags };

    try {
      if (editingNote) {
        await axios.put(`/api/notes/${editingNote._id}`, noteData);
      } else {
        await axios.post('/api/notes', noteData);
      }
      fetchNotes();
      resetForm();
    } catch (error) {
      console.error('Error saving note', error);
    }
  };

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>My Notes</h1>
          <p className="page-subtitle" style={{ margin: '0', textAlign: 'left' }}>Manage and organize your personal study materials.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { resetForm(); setShowForm(true); }}
        >
          <Plus size={18} style={{ marginRight: '8px' }} />
          Create Note
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="card modal-content">
            <div className="modal-header">
              <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
              <button className="btn-close" onClick={resetForm}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="note-form">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input type="text" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. mechanics, formulas, exam prep" />
              </div>
              <div className="form-group">
                <label className="form-label">Description / Content</label>
                <textarea className="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingNote ? 'Update Note' : 'Save Note'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notes.length === 0 && !showForm ? (
        <div className="empty-state">
          <h3>No notes found</h3>
          <p>You haven't created any notes yet. Click the button above to get started.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard 
              key={note._id} 
              note={note} 
              isOwner={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
