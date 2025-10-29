 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import useApi from '../hooks/useApi';

const Posts = () => {
  const [page, setPage] = useState(1);
  const { data: postsData, loading, error, execute: fetchPosts } = useApi(() => postsAPI.getPosts(page), false);
  
  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (loading && !postsData) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const posts = postsData?.posts || [];
  const totalPages = postsData?.totalPages || 1;

  return (
    <div className="container">
      <div style={styles.header}>
        <h1>Blog Posts</h1>
        <Link to="/create-post" className="btn btn-success">
          Create New Post
        </Link>
      </div>

      <div style={styles.postsGrid}>
        {posts.map(post => (
          <div key={post._id} className="card" style={styles.postCard}>
            <h3 style={styles.postTitle}>
              <Link to={`/posts/${post._id}`} style={styles.postLink}>
                {post.title}
              </Link>
            </h3>
            
            <p style={styles.postExcerpt}>
              {post.excerpt || 'No excerpt available'}
            </p>
            
            <div style={styles.postMeta}>
              <span style={styles.postCategory}>
                {post.category?.name || 'Uncategorized'}
              </span>
              <span style={styles.postAuthor}>
                By {post.author?.username || 'Unknown'}
              </span>
              <span style={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div style={styles.noPosts}>
          <p>No posts found. Be the first to create one!</p>
          <Link to="/create-post" className="btn btn-success">
            Create First Post
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn"
          >
            Previous
          </button>
          
          <span style={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  postsGrid: {
    display: 'grid',
    gap: '1.5rem',
  },
  postCard: {
    transition: 'transform 0.2s',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  postTitle: {
    marginBottom: '1rem',
    color: '#333',
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  postExcerpt: {
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  postMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    color: '#888',
  },
  postCategory: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '3px',
    fontSize: '0.8rem',
  },
  noPosts: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
  },
  pageInfo: {
    padding: '0 1rem',
  },
};

export default Posts;