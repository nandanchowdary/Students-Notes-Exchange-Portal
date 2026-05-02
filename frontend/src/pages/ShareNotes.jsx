import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { Search } from 'lucide-react';

const ShareNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get('/api/notes');
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes', error);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <div className="page-header">
        <h1 className="page-title">Community Notes</h1>
        <p className="page-subtitle">Discover study materials shared by students across the platform.</p>
        
        <div style={{ maxWidth: '600px', margin: '2rem auto 0', position: 'relative' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by title, subject, or tag..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '3rem', borderRadius: '9999px' }}
          />
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div className="notes-grid">
        {filteredNotes.map(note => (
          <NoteCard 
            key={note._id} 
            note={note} 
            isOwner={false} // Users cannot edit/delete from the public feed
          />
        ))}
      </div>
      
      {filteredNotes.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
          <p>No notes found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ShareNotes;
