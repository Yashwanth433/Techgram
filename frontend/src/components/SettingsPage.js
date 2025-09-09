import React, { useState } from 'react';
import '../App.css';
import EditProfileModal from './EditProfileModal';

function SettingsPage({ onClose, onProfileUpdate }) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    theme: 'light',
    notifications: true,
    language: 'en'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    // Here you would typically save to localStorage or send to backend
    localStorage.setItem('userSettings', JSON.stringify({ ...settings, [setting]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      content: (
        <button
          onClick={() => setShowEditProfile(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit Profile
        </button>
      )
    },
    {
      id: 'appearance',
      title: 'Appearance',
      content: (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>Theme: </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              style={{ padding: '5px', marginLeft: '10px' }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Font Size: </label>
            <select
              value={settings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              style={{ padding: '5px', marginLeft: '10px' }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      content: (
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => handleSettingChange('notifications', e.target.checked)}
          />
          Enable notifications
        </label>
      )
    },
    {
      id: 'security',
      title: 'Security',
      content: (
        <div>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Change Password
          </button>
          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Two-Factor Auth
          </button>
        </div>
      )
    },
    {
      id: 'database',
      title: 'Database',
      content: (
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Database Settings
        </button>
      )
    },
    {
      id: 'api',
      title: 'API Configuration',
      content: (
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          API Settings
        </button>
      )
    },
    {
      id: 'content',
      title: 'Content Preferences',
      content: (
        <div style={{ marginBottom: '10px' }}>
          <label>Language: </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      )
    }
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '15px',
          padding: '25px',
          width: '450px',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          border: '1px solid #4c1d95',
          boxShadow: '0 0 15px rgba(76, 29, 149, 0.2), inset 0 0 15px rgba(76, 29, 149, 0.05)'
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
              width: '35px',
              height: '35px',
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
          }}>Settings</h2>

          {sections.map((section) => (
            <div key={section.id} style={{ marginBottom: '15px' }}>
              <div
                onClick={() => toggleSection(section.id)}
                style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #2d1b69 0%, #1e1b4b 100%)',
                  border: '1px solid #7c3aed',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 0 10px rgba(124, 58, 237, 0.2), inset 0 0 10px rgba(124, 58, 237, 0.05)',
                  transition: 'all 0.3s ease',
                  transform: expandedSection === section.id ? 'scale(1.01)' : 'scale(1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.3), inset 0 0 15px rgba(124, 58, 237, 0.1)';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.borderColor = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 0 10px rgba(124, 58, 237, 0.2), inset 0 0 10px rgba(124, 58, 237, 0.05)';
                  e.target.style.transform = expandedSection === section.id ? 'scale(1.01)' : 'scale(1)';
                  e.target.style.borderColor = '#7c3aed';
                }}
              >
                <h3 style={{
                  margin: 0,
                  fontSize: '18px',
                  color: '#e879f9',
                  fontWeight: '600',
                  textShadow: '0 0 8px rgba(232, 121, 249, 0.3)'
                }}>{section.title}</h3>
              </div>

              {expandedSection === section.id && (
                <div style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                  border: '1px solid #6366f1',
                  borderRadius: '0 0 10px 10px',
                  marginTop: '2px',
                  boxShadow: '0 0 10px rgba(99, 102, 241, 0.2), inset 0 0 10px rgba(99, 102, 241, 0.05)',
                  animation: 'slideDown 0.3s ease-out',
                  borderTop: 'none'
                }}>
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
          onProfileUpdate={onProfileUpdate}
        />
      )}
    </>
  );
}

export default SettingsPage;
