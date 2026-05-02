import { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('/api/misc/feedback', formData);
      setStatus({ type: 'success', message: 'Thank you for your feedback! We appreciate your input.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit feedback. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0', maxWidth: '800px' }}>
      <div className="page-header">
        <h1 className="page-title">We Value Your Feedback</h1>
        <p className="page-subtitle">Help us improve NoteNexus by sharing your thoughts, suggestions, or any issues you've encountered.</p>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {status.message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius)',
            backgroundColor: status.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: status.type === 'success' ? '#065F46' : '#991B1B',
            border: `1px solid ${status.type === 'success' ? '#34D399' : '#F87171'}`
          }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Your Feedback</label>
            <textarea 
              className="form-control" 
              rows="6" 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
