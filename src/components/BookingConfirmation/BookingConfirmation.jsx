import React from 'react';
import Lottie from 'lottie-react';
import confetti from './confetti.json';
import check from './check.json';
import './BookingConfirmation.css';

export const BookingConfirmation = ({ booking }) => {
  return (
    <div className="booking-confirmation d-flex direction-column align-center">
      <Lottie animationData={confetti} style={{ width: 260 }} />
      <Lottie animationData={check} style={{ width: 120 }} />
      <h2>Booking Confirmed</h2>
      <p>Your booking at {booking?.name} is confirmed. Check email for details.</p>
    </div>
  );
};

export default BookingConfirmation;
