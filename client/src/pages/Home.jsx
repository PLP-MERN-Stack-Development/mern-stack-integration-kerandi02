 import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to MERN Blog</h1>
        <p style={styles.heroSubtitle}>
          A full-stack blog application built with MongoDB, Express, React, and Node.js
        </p>
        
        <div style={styles.heroActions}>
          <Link to="/create-post" className="btn">
            Create Your First Post
          </Link>
          <Link to="/posts" className="btn">
            Browse Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    padding: '4rem 0',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#333',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
  },
  heroActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
};

export default Home;