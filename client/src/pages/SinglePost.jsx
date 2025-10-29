 import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import useApi from '../hooks/useApi';

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useApp();
  const navigate = useNavigate();
  const { data: post, loading, error } = useApi(() => postsAPI.getPost(id));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(id);
        navigate('/posts');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div className="container loading">Loading post...</div>;
  if (error) return <div className="container error">Error: {error}</div>;
  if (!post) return <div className="container">Post not found</div>;

  const isAuthor = user && post.author?._id === user._id;

  return (
    <div className="container">
      <article className="card" style={styles.post}>
        <div style={styles.postHeader}>
          <h1 style={styles.postTitle}>{post.title}</h1>
          
          {isAuthor && (
            <div style={styles.postActions}>
              <Link 
                to={`/edit-post/${post._id}`} 
                className="btn"
                style={styles.editBtn}
              >
                Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div style={styles.postMeta}>
          <span style={styles.category}>{post.category?.name}</span>
          <span>By {post.author?.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div style={styles.postContent}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div style={styles.backLink}>
          <Link to="/posts" className="btn">
            ← Back to Posts
          </Link>
        </div>
      </article>
    </div>
  );
};

const styles = {
  post: {
    padding: '2rem',
    margin: '2rem 0',
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    gap: '1rem',
  },
  postTitle: {
    fontSize: '2.5rem',
    color: '#333',
    margin: 0,
    flex: 1,
  },
  postActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editBtn: {
    background: '#28a745',
  },
  postMeta: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    color: '#666',
    fontSize: '0.9rem',
  },
  category: {
    background: '#007bff',
    color: 'white',
    padding: '0.2rem 0.5rem',
    borderRadius: '3px',
  },
  tags: {
    marginBottom: '1.5rem',
  },
  tag: {
    background: '#f8f9fa',
    padding: '0.3rem 0.6rem',
    borderRadius: '3px',
    marginRight: '0.5rem',
    fontSize: '0.8rem',
    color: '#666',
  },
  postContent: {
    lineHeight: '1.8',
    fontSize: '1.1rem',
    color: '#333',
  },
  backLink: {
    marginTop: '2rem',
  },
};

export default SinglePost;