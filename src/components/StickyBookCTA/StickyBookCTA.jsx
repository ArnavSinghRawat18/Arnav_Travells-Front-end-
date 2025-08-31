import React, { useEffect, useState } from 'react';
import './StickyBookCTA.css';
import { useNavigate } from 'react-router-dom';

export const StickyBookCTA = ({ hotelId, name, address, state }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-book-cta fixed d-flex align-center justify-center">
      <button className="button btn-primary pulse" onClick={() => navigate(`/hotels/${name}/${address}-${state}/${hotelId}/reserve`)}>Book Now</button>
    </div>
  );
};

export default StickyBookCTA;
