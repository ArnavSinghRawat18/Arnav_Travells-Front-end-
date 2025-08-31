import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './BookingStepper.css';

export const BookingStepper = ({ steps = ['Dates','Guest Details','Payment'], current = 0 }) => {
  return (
    <div className="booking-stepper d-flex">
      {steps.map((s, i) => (
        <div key={s} className={`step ${i <= current ? 'active' : ''}`}>
          <div className="step-indicator">{i+1}</div>
          <div className="step-label">{s}</div>
        </div>
      ))}
    </div>
  );
};

export default BookingStepper;
