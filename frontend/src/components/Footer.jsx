const Footer = () => {
  return (
    <footer style={{ background: 'white', padding: '2rem 0', borderTop: '1px solid #E5E7EB', textAlign: 'center', marginTop: 'auto' }}>
      <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} NoteNexus - Student Notes Exchange Portal. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
