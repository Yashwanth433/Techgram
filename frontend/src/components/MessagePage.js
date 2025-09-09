import React, { useState, useEffect } from 'react';
import { getFriends, getMessagesBetweenUsers, sendMessage } from '../api';
import '../App.css';

function MessagePage() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Assume current user ID is stored in localStorage after login
    const userId = localStorage.getItem('userId');
    if (userId) {
      setCurrentUserId(parseInt(userId));
      fetchFriends(parseInt(userId));
    }
  }, []);

  const fetchFriends = async (userId) => {
    try {
      const response = await getFriends(userId);
      setFriends(response.data);
      if (response.data.length > 0) {
        setSelectedFriend(response.data[0]);
        fetchMessages(userId, response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchMessages = async (userId, friendId) => {
    try {
      const response = await getMessagesBetweenUsers(userId, friendId);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    if (currentUserId) {
      fetchMessages(currentUserId, friend.id);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedFriend || !currentUserId) return;
    try {
      await sendMessage({
        senderId: currentUserId,
        receiverId: selectedFriend.id,
        content: newMessage.trim(),
      });
      setNewMessage('');
      fetchMessages(currentUserId, selectedFriend.id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-page-container" style={{ display: 'flex', height: '100vh' }}>
      <div className="friends-list" style={{ width: '25%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h3 style={{ padding: '10px' }}>Friends</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => handleFriendClick(friend)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: selectedFriend && selectedFriend.id === friend.id ? '#e6f7ff' : 'transparent',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedFriend && selectedFriend.id === friend.id ? '#e6f7ff' : 'transparent')
              }
            >
              {friend.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          className="chat-header"
          style={{
            padding: '10px',
            borderBottom: '1px solid #ccc',
            fontWeight: 'bold',
            fontSize: '18px',
            backgroundColor: '#fafafa',
          }}
        >
          {selectedFriend ? `Chatting with ${selectedFriend.username}` : 'Select a friend to chat'}
        </div>
        <div
          className="chat-messages"
          style={{ flex: 1, padding: '10px', overflowY: 'auto', backgroundColor: '#fff' }}
        >
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: '10px',
                textAlign: msg.sender.id === currentUserId ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  backgroundColor: msg.sender.id === currentUserId ? '#dcf8c6' : '#f1f0f0',
                  maxWidth: '60%',
                  wordWrap: 'break-word',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div
          className="chat-input"
          style={{ padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#fafafa' }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            placeholder="Type a message"
            style={{ width: '80%', padding: '8px', borderRadius: '20px', border: '1px solid #ccc' }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#4caf50',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
