import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import heroSvg from '../../assets/hero-travel.svg';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const [tag, setTag] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add engaging typewriter effect
    const text = "Your Next Adventure Awaits ✈️🌟";
    let i = 0;
    const typeInterval = setInterval(() => {
      setTag(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typeInterval);
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, []);

  const categories = [
    { name: "🏖️ Beach Resorts", color: "#00bcd4" },
    { name: "🏙️ City Hotels", color: "#ff5722" },
    { name: "🏔️ Mountain Retreats", color: "#4caf50" },
    { name: "🌾 Countryside", color: "#ff9800" },
    { name: "💎 Luxury Suites", color: "#9c27b0" },
    { name: "💰 Budget Stays", color: "#607d8b" }
  ];

  return (
    <section className="hero-root d-flex align-center">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroSvg})` }} />
      
      {/* Floating decorative elements */}
      <div className="hero-decorations">
        <motion.div 
          className="float-element" 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ top: '20%', left: '10%' }}
        >
          ✈️
        </motion.div>
        <motion.div 
          className="float-element" 
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ top: '60%', right: '15%' }}
        >
          🌟
        </motion.div>
        <motion.div 
          className="float-element" 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '40%', left: '85%' }}
        >
          🗺️
        </motion.div>
      </div>

      <div className="hero-content">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }} 
          className="hero-title"
        >
          🌍 Travelista Tours 🌍
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }} 
          className="hero-tag"
        >
          {tag}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
        </motion.h2>
        
        <div className="hero-ctas d-flex gap">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }} 
            whileTap={{ scale: 0.95 }}
            className="button btn-primary" 
            onClick={() => navigate('/hotels')}
          >
            🔍 Explore Amazing Destinations
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.2)" }} 
            whileTap={{ scale: 0.95 }}
            className="button btn-outline-primary" 
            onClick={() => navigate('/auth')}
          >
            🚀 Start Your Journey
          </motion.button>
        </div>
        
        <motion.div 
          className="hero-categories d-flex gap" 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {categories.map((category, i) => (
            <motion.div 
              key={i} 
              className="category-card" 
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: category.color,
                boxShadow: `0 8px 25px ${category.color}40`
              }}
              style={{ borderColor: category.color }}
            >
              <div className="category-front">{category.name}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="hero-stats d-flex gap"
        >
          <div className="stat-item">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Hotels Worldwide</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">200+</span>
            <span className="stat-label">Destinations</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
