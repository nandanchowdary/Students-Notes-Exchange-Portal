import { Calendar, Tag, User, Clock } from 'lucide-react';
import './NoteCard.css';

const NoteCard = ({ note, isOwner, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card note-card">
      <div className="note-card-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-subject">{note.subject}</span>
      </div>
      
      <p className="note-description">{note.description}</p>
      
      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag, index) => (
            <span key={index} className="tag">
              <Tag size={12} style={{ display: 'inline', marginRight: '4px' }} />
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="note-footer">
        <div className="note-meta">
          <span className="meta-item">
            <User size={14} />
            {note.authorName}
          </span>
          <span className="meta-item">
            <Calendar size={14} />
            {formatDate(note.createdAt)}
          </span>
        </div>
        
        {isOwner && (
          <div className="note-actions">
            <button onClick={() => onEdit(note)} className="btn btn-secondary action-btn">Edit</button>
            <button onClick={() => onDelete(note._id)} className="btn btn-danger action-btn">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
