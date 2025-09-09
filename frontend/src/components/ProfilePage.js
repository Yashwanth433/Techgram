import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { getProfile, updateProfile, createDefaultProfile } from '../api';
import SettingsPage from './SettingsPage';
import ConnectModal from './ConnectModal';
import EditProfileModal from './EditProfileModal';

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [msg, setMsg] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      setMsg('User not logged in.');
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await getProfile(username);
        if (res.data.success) {
          setProfile(res.data.profile);
          setName(res.data.profile.name || '');
          setBio(res.data.profile.bio || '');
        } else {
          // If profile not found, create default profile
          await createDefaultProfile(username);
          const defaultRes = await getProfile(username);
          if (defaultRes.data.success) {
            setProfile(defaultRes.data.profile);
            setName(defaultRes.data.profile.name || '');
            setBio(defaultRes.data.profile.bio || '');
          }
        }
      } catch (err) {
        setMsg('Error fetching profile');
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleProfileUpdate = () => {
    // Refresh profile data
    const username = localStorage.getItem('username');
    if (username) {
      const fetchProfile = async () => {
        try {
          const res = await getProfile(username);
          if (res.data.success) {
            setProfile(res.data.profile);
            setName(res.data.profile.name || '');
            setBio(res.data.profile.bio || '');
          }
        } catch (err) {
          console.error('Error refreshing profile:', err);
        }
      };
      fetchProfile();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
    }}>
      <div className="profile-container" style={{
        height: '75vh',
        width: '75vw',
        display: 'flex',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '20px',
        padding: '30px',
        position: 'relative',
        border: '1px solid #4c1d95',
        boxShadow: '0 0 15px rgba(76, 29, 149, 0.2), inset 0 0 15px rgba(76, 29, 149, 0.05)'
      }}>
        {/* Settings Icon */}
        <button
          onClick={() => setShowSettings(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
          }}
          title="Settings"
        >
          ⚙️
        </button>

        <div style={{
          width: '38%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #2d1b69 0%, #1e1b4b 100%)',
          borderRadius: '15px',
          padding: '20px',
          border: '1px solid #7c3aed',
          boxShadow: '0 0 10px rgba(124, 58, 237, 0.2), inset 0 0 10px rgba(124, 58, 237, 0.05)'
        }}>
          {profile && profile.profileImage ? (
            <img
              src={`data:image/jpeg;base64,${profile.profileImage}`}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
                border: '2px solid #a855f7',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #6366f1',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.2), inset 0 0 10px rgba(99, 102, 241, 0.05)',
              fontSize: '1.3em',
              color: '#c084fc',
              fontWeight: 'bold',
              textShadow: '0 0 8px rgba(192, 132, 252, 0.3)'
            }}>
              No Image
            </div>
          )}
        </div>

        <div style={{
          width: '62%',
          paddingLeft: '35px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #16213e 0%, #0f0f23 100%)',
          borderRadius: '15px',
          marginLeft: '20px',
          border: '1px solid #4c1d95',
          boxShadow: '0 0 15px rgba(76, 29, 149, 0.2), inset 0 0 15px rgba(76, 29, 149, 0.05)'
        }}>
          <h1 style={{
            fontSize: '3.5em',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 10px rgba(168, 85, 247, 0.3)',
            letterSpacing: '2px'
          }}>
            {profile ? profile.username : 'Loading...'}
          </h1>

          <p style={{
            fontSize: '1.4em',
            color: '#e879f9',
            marginBottom: '30px',
            maxWidth: '500px',
            lineHeight: '1.5',
            textShadow: '0 0 8px rgba(232, 121, 249, 0.2)'
          }}>
            {bio || 'No bio available'}
          </p>

          <div style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '20px',
            fontSize: '1em',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ color: '#fbbf24', fontSize: '1em' }}>Followers</strong><br />
              <span style={{
                color: '#fbbf24',
                fontSize: '1.5em',
                fontWeight: 'bold'
              }}>0</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ color: '#fbbf24', fontSize: '1em' }}>Following</strong><br />
              <span style={{
                color: '#fbbf24',
                fontSize: '1.5em',
                fontWeight: 'bold'
              }}>0</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setShowEditProfile(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: 'bold',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.3)';
              }}
            >
              Edit Profile
            </button>

            <button
              onClick={() => setShowConnect(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4c1d95',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: 'bold',
                boxShadow: '0 0 10px rgba(76, 29, 149, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 15px rgba(76, 29, 149, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 10px rgba(76, 29, 149, 0.3)';
              }}
            >
              Connect +
            </button>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '12px 25px',
              background: 'linear-gradient(135deg, #2d1b69 0%, #1e1b4b 100%)',
              color: '#c084fc',
              border: '1px solid #4c1d95',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '1.1em',
              fontWeight: 'bold',
              marginTop: '10px',
              boxShadow: '0 0 10px rgba(76, 29, 149, 0.3)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 15px rgba(76, 29, 149, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 0 10px rgba(76, 29, 149, 0.3)';
            }}
          >
            Logout
          </button>

          {msg && <p style={{
            marginTop: '20px',
            color: msg.includes('successfully') ? '#10b981' : '#ef4444',
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}>{msg}</p>}
        </div>
      </div>

      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
          onProfileUpdate={handleProfileUpdate}
        />
      )}

      {showConnect && (
        <ConnectModal
          onClose={() => setShowConnect(false)}
          currentUsername={profile ? profile.username : ''}
        />
      )}
    </div>
  );
}

export default ProfilePage;
