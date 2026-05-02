import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <BookOpen className="brand-icon" />
          <span>NoteNexus</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/share-notes" className="nav-link">Shared Notes</NavLink>
          <NavLink to="/feedback" className="nav-link">Feedback</NavLink>
          <NavLink to="/contact" className="nav-link">Contact</NavLink>
          
          {user ? (
            <>
              <NavLink to="/dashboard" className="nav-link">My Notes</NavLink>
              <div className="nav-user">
                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn btn-secondary nav-btn">
                  <LogOut size={16} style={{ marginRight: '6px' }} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary nav-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
