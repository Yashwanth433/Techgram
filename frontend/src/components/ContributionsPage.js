import React, { useState, useEffect } from 'react';
import '../App.css';
import { getPostsByUsername } from '../api';

function ContributionsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setMsg('User not logged in.');
        setLoading(false);
        return;
      }

      try {
        const res = await getPostsByUsername(username);
        if (res.data.success) {
          setPosts(res.data.posts);
        } else {
          setMsg('Error fetching posts: ' + res.data.message);
        }
      } catch (err) {
        setMsg('Error fetching posts');
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <div className="home-card">
          <h1>Contributions</h1>
          <p>Loading your contributions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Contributions</h1>

        {msg && <div className={`message ${msg.includes('Error') ? 'error' : ''}`}>{msg}</div>}

        {posts.length === 0 ? (
          <p>No posts found. Create your first post!</p>
        ) : (
          <div className="posts-container">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                {post.image && (
                  <img
                    src={`data:image/jpeg;base64,${post.image}`}
                    alt="Post"
                    className="post-image"
                  />
                )}
                <div className="post-content">
                  <p className="post-description">{post.description}</p>
                  {post.tags && <p className="post-tags">{post.tags}</p>}
                  <p className="post-category">Category: {post.category}</p>
                  <p className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContributionsPage;
