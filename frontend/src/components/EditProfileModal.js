import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api';

function EditProfileModal({ onClose, onProfileUpdate }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      const fetchProfile = async () => {
        try {
          const res = await getProfile(username);
          if (res.data.success) {
            setName(res.data.profile.name || '');
            setBio(res.data.profile.bio || '');
          }
        } catch (err) {
          setMsg('Error fetching profile');
        }
      };
      fetchProfile();
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');
    if (!username) {
      setMsg('User not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const res = await updateProfile(formData);
      if (res.data.success) {
        setMsg('Profile updated successfully!');
        onProfileUpdate(); // Refresh profile data in parent component
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMsg('Failed to update profile: ' + res.data.message);
      }
    } catch (err) {
      setMsg('Error updating profile');
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
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '400px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Name:</label><br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Bio:</label><br />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Profile Image:</label><br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '5px' }}
            />
          </div>

          {msg && (
            <p style={{
              marginBottom: '15px',
              color: msg.includes('successfully') ? 'green' : 'red'
            }}>
              {msg}
            </p>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
