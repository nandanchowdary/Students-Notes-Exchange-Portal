import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Share2, ShieldCheck } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="hero-title">Empower Your Learning Journey</h1>
            <p className="hero-subtitle">
              Join the ultimate student notes exchange platform. Upload your brilliant summaries, 
              discover top-tier study materials from peers, and elevate your grades together.
            </p>
            <div className="hero-cta">
              {!user ? (
                <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              ) : (
                <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard</Link>
              )}
              <Link to="/share-notes" className="btn btn-secondary btn-lg">Browse Notes</Link>
            </div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Using a placeholder aesthetic div representing an app interface */}
            <div className="mockup-window">
              <div className="mockup-header">
                <span className="dot bg-red"></span>
                <span className="dot bg-yellow"></span>
                <span className="dot bg-green"></span>
              </div>
              <div className="mockup-body">
                <div className="mockup-line w-3/4"></div>
                <div className="mockup-line w-full"></div>
                <div className="mockup-line w-5/6"></div>
                <div className="mockup-card mt-4">
                  <div className="mockup-title">Physics 101 Notes</div>
                  <div className="mockup-tags">
                    <span className="mockup-tag">Mechanics</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose NoteNexus?</h2>
            <p className="section-subtitle">Designed specifically for students to maximize productivity and collaboration.</p>
          </div>
          
          <div className="features-grid">
            <motion.div className="feature-card card" whileHover={{ y: -5 }}>
              <div className="feature-icon bg-blue-100 text-blue-600">
                <Share2 size={24} />
              </div>
              <h3>Seamless Sharing</h3>
              <p>Easily upload your study materials and share them with classmates instantly.</p>
            </motion.div>
            
            <motion.div className="feature-card card" whileHover={{ y: -5 }}>
              <div className="feature-icon bg-green-100 text-green-600">
                <BookOpen size={24} />
              </div>
              <h3>Organized Library</h3>
              <p>Find exactly what you need with our powerful tagging and subject categorization.</p>
            </motion.div>
            
            <motion.div className="feature-card card" whileHover={{ y: -5 }}>
              <div className="feature-icon bg-purple-100 text-purple-600">
                <ShieldCheck size={24} />
              </div>
              <h3>Secure Platform</h3>
              <p>Your data is protected. Only you can modify or delete the notes you contribute.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="how-it-works" style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to supercharge your study sessions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>1</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Create an Account</h3>
              <p style={{ color: 'var(--text-muted)' }}>Sign up in seconds to get your personal note vault.</p>
            </div>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>2</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Upload & Organize</h3>
              <p style={{ color: 'var(--text-muted)' }}>Add your notes, tag them by subject, and keep everything tidy.</p>
            </div>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>3</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Learn Together</h3>
              <p style={{ color: 'var(--text-muted)' }}>Explore the community feed and learn from your peers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
