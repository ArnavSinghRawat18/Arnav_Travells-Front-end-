import React, { useState } from 'react';
import Lottie from 'lottie-react';
import heartAnimation from './heart.json';
import './WishlistHeart.css';

export const WishlistHeart = ({ size = 48, onToggle, isLiked = false }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onToggle) onToggle(newLiked);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className="wishlist-heart" 
      onClick={handleClick} 
      onKeyDown={handleKeyDown}
      role="button" 
      tabIndex={0}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Lottie animationData={heartAnimation} loop={false} autoplay={false} style={{ width: size, height: size }} />
    </div>
  );
};

export default WishlistHeart;
