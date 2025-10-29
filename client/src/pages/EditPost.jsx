 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI, categoriesAPI } from '../services/api';
import { useApp } from '../context/AppContext';
import useApi from '../hooks/useApi';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  
  const { user } = useApp();
  const navigate = useNavigate();
  const { data: categories } = useApi(categoriesAPI.getCategories);
  const { data: post, loading: postLoading } = useApi(() => postsAPI.getPost(id));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Populate form when post data is loaded
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category: post.category?._id || '',
        tags: post.tags?.join(', ') || ''
      });
    }
  }, [post]);

  // Redirect if not author
  useEffect(() => {
    if (post && user && post.author?._id !== user._id) {
      navigate('/posts');
    }
  }, [post, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await postsAPI.updatePost(id, postData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (postLoading) return <div className="container loading">Loading...</div>;
  if (!post) return <div className="container">Post not found</div>;

  return (
    <div className="container">
      <div style={styles.formContainer}>
        <h1>Edit Post</h1>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select a category</option>
              {categories?.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-control"
              rows="10"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-control"
              placeholder="react, javascript, web-development"
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              className="btn btn-success" 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Post'}
            </button>
            <button 
              type="button" 
              className="btn"
              onClick={() => navigate(`/posts/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  form: {
    marginTop: '1.5rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
};

export default EditPost;