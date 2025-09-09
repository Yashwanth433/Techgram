import React, { useState, useRef } from 'react';
import '../App.css';

const cardsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Beautiful nature scenery with mountains and lake.',
    backContent: 'This stunning landscape showcases the majesty of nature. The serene lake reflects the towering mountains, creating a perfect harmony between water and earth. Such scenes remind us of the incredible beauty our planet holds and the importance of preserving these natural wonders for future generations.',
    username: 'NatureLover',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
    description: 'Vibrant city skyline during sunset.',
    backContent: 'Urban landscapes like this represent human innovation and progress. The city lights begin to twinkle as the sun sets, creating a magical atmosphere. Each building tells a story of dreams, ambitions, and the collective effort of countless individuals working together to build something extraordinary.',
    username: 'CityExplorer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    description: 'Futuristic technology and gadgets.',
    backContent: 'Technology continues to evolve at an unprecedented pace, transforming how we live, work, and connect with each other. These innovations represent the culmination of human curiosity and ingenuity, pushing the boundaries of what we once thought was possible and opening new frontiers for exploration.',
    username: 'TechWizard',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=32&h=32&q=80',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=400&q=80',
    description: 'Stunning view of outer space and stars.',
    backContent: 'The vastness of space reminds us of our place in the universe. Each star we see represents a distant sun, potentially with its own planets and life forms. This cosmic perspective encourages us to think bigger, dream larger, and appreciate the incredible diversity of existence.',
    username: 'SpaceDreamer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=32&h=32&q=80',
  },
];

function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const clickTimeout = useRef(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // swipe left
        setCurrentIndex((prevIndex) =>
          prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // swipe right
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1
        );
      }
      setIsFlipped(false); // Reset flip when changing cards
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDoubleClick = () => {
    setIsLiked(true);
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 1000);
  };

  // Calculate indices for previous and next cards
  const prevIndex = currentIndex === 0 ? cardsData.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === cardsData.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="explore-container">
      <div className="card-wrapper">
        <div className="side-card prev-card">
          <img
            src={cardsData[prevIndex].image}
            alt="Previous Card"
            className="card-image side-image"
          />
          <p className="card-description side-description">{cardsData[prevIndex].description}</p>
        </div>

        <div
          className="floating-card main-card"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            className="swipe-button left-swipe"
            onClick={() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1
              );
              setIsFlipped(false);
            }}
            aria-label="Previous card"
          />
          <button
            className="center-flip-button"
            style={{ width: '20%' }}
            onClick={handleFlip}
            aria-label="Flip card"
          />
          <button
            className="swipe-button right-swipe"
            onClick={() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1
              );
              setIsFlipped(false);
            }}
            aria-label="Next card"
          />

          <div className={`card-flipper ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">
              <div className="card-header">
                <img
                  src={cardsData[currentIndex].avatar}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <span className="username">{cardsData[currentIndex].username}</span>
              </div>
              <div className="card-content">
                <img
                  src={cardsData[currentIndex].image}
                  alt="Current Card"
                  className="card-image"
                  onDoubleClick={handleDoubleClick}
                />
                {showHeartAnimation && (
                  <div className="floating-heart">
                    <i className="fas fa-heart"></i>
                  </div>
                )}
                <p className="card-description">{cardsData[currentIndex].description}</p>
                <div className="card-actions">
                  <button
                    className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
                    aria-label="Like"
                  >
                    <i className="fas fa-heart action-icon"></i>
                  </button>
                  <button className="action-btn comment-btn" aria-label="Comment">
                    <i className="fas fa-comment action-icon"></i>
                  </button>
                  <button className="action-btn share-btn" aria-label="Share">
                    <i className="fas fa-share action-icon"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="back-content">
                <h3>More Information</h3>
                <p>{cardsData[currentIndex].backContent}</p>
                <button className="flip-button back-flip" onClick={handleFlip}>
                  🔙
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="side-card next-card">
          <img
            src={cardsData[nextIndex].image}
            alt="Next Card"
            className="card-image side-image"
          />
          <p className="card-description side-description">{cardsData[nextIndex].description}</p>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
