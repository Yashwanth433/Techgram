import React, { useState, useEffect } from 'react';
import { getAllUsers, followUser, unfollowUser } from '../api';

function ConnectModal({ onClose, currentUsername }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(new Set());
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.data.success) {
        const otherUsers = res.data.users.filter(user => user.username !== currentUsername);
        setUsers(otherUsers);

        // Check which users are already being followed
        const followingSet = new Set();
        for (const user of otherUsers) {
          try {
            const followRes = await fetch(`/api/follow/check?follower=${currentUsername}&following=${user.username}`);
            const followData = await followRes.json();
            if (followData.isFollowing) {
              followingSet.add(user.username);
            }
          } catch (err) {
            console.error('Error checking follow status:', err);
          }
        }
        setFollowing(followingSet);
      }
    } catch (err) {
      setMsg('Error fetching users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (targetUsername) => {
    try {
      const isFollowing = following.has(targetUsername);
      const res = isFollowing
        ? await unfollowUser(currentUsername, targetUsername)
        : await followUser(currentUsername, targetUsername);

      if (res.data.success) {
        const newFollowing = new Set(following);
        if (isFollowing) {
          newFollowing.delete(targetUsername);
        } else {
          newFollowing.add(targetUsername);
        }
        setFollowing(newFollowing);
        setMsg(isFollowing ? 'Unfollowed successfully' : 'Followed successfully');
        setTimeout(() => setMsg(''), 2000);
      }
    } catch (err) {
      setMsg('Error updating follow status');
      console.error('Error updating follow status:', err);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '20px',
        padding: '30px',
        width: '500px',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #4c1d95',
        boxShadow: '0 0 20px rgba(76, 29, 149, 0.3), inset 0 0 20px rgba(76, 29, 149, 0.05)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            border: '1px solid #9333ea',
            fontSize: '24px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>

        <h2 style={{
          marginTop: 0,
          background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '28px',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(168, 85, 247, 0.3)',
          textAlign: 'center',
          marginBottom: '25px'
        }}>Connect with Users</h2>

        {loading ? (
          <div style={{
            textAlign: 'center',
            color: '#c084fc',
            fontSize: '1.2em',
            padding: '20px'
          }}>
            Loading users...
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {users.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#e879f9',
                fontSize: '1.1em',
                padding: '20px'
              }}>
                No other users found
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  marginBottom: '10px',
                  background: 'linear-gradient(135deg, #2d1b69 0%, #1e1b4b 100%)',
                  borderRadius: '10px',
                  border: '1px solid #7c3aed',
                  boxShadow: '0 0 10px rgba(124, 58, 237, 0.2), inset 0 0 10px rgba(124, 58, 237, 0.05)'
                }}>
                  <div>
                    <div style={{
                      color: '#e879f9',
                      fontSize: '1.2em',
                      fontWeight: 'bold',
                      textShadow: '0 0 8px rgba(232, 121, 249, 0.3)'
                    }}>
                      {user.username}
                    </div>
                    <div style={{
                      color: '#c084fc',
                      fontSize: '0.9em',
                      marginTop: '5px'
                    }}>
                      {user.email || 'No email provided'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleFollowToggle(user.username)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: following.has(user.username) ? '#dc3545' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontSize: '0.9em',
                      fontWeight: 'bold',
                      boxShadow: `0 0 10px ${following.has(user.username) ? 'rgba(220, 53, 69, 0.3)' : 'rgba(40, 167, 69, 0.3)'}`,
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = `0 0 15px ${following.has(user.username) ? 'rgba(220, 53, 69, 0.4)' : 'rgba(40, 167, 69, 0.4)'}`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = `0 0 10px ${following.has(user.username) ? 'rgba(220, 53, 69, 0.3)' : 'rgba(40, 167, 69, 0.3)'}`;
                    }}
                  >
                    {following.has(user.username) ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {msg && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: msg.includes('successfully') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${msg.includes('successfully') ? '#10b981' : '#ef4444'}`,
            color: msg.includes('successfully') ? '#10b981' : '#ef4444',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectModal;
