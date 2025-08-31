import React from 'react';
import { motion } from 'framer-motion';
import './QuickViewModal.css';

export const QuickViewModal = ({ hotel, onClose, onBook }) => {
  if (!hotel) return null;
  return (
    <div className="quickview-overlay fixed d-flex align-center justify-center">
      <motion.div className="quickview-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
        <button className="button btn-close-quick" onClick={onClose}>Close</button>
        <div className="qv-content d-flex">
          <img src={hotel.image} alt={hotel.name} className="qv-image" />
          <div className="qv-details">
            <h3>{hotel.name}</h3>
            <p>{hotel.address}, {hotel.state}</p>
            <p>Rs. {hotel.price} / night</p>
            <button className="button btn-primary" onClick={()=>onBook(hotel)}>Book Now</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickViewModal;
