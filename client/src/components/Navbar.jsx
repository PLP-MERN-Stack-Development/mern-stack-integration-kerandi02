 import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div className="container">
        <div style={styles.navContent}>
          <Link to="/" style={styles.logo}>
            MERN Blog
          </Link>
          
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/posts" style={styles.navLink}>Posts</Link>
            
            {user ? (
              <>
                <Link to="/create-post" style={styles.navLink}>Create Post</Link>
                <span style={styles.welcome}>Welcome, {user.username}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.navLink}>Login</Link>
                <Link to="/register" style={styles.navLink}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#343a40',
    padding: '1rem 0',
    color: 'white',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  welcome: {
    color: '#ccc',
    marginRight: '1rem',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #dc3545',
    color: '#dc3545',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default Navbar;