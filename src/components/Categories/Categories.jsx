import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useCategory, useFilter } from "../../context";
import { motion } from "framer-motion";
import { API_BASE } from "../../config/api";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { hotelCategory, setHotelCategory } = useCategory();

  const { filterDispatch } = useFilter();

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/category`
        );
        setCategories(data);
      } catch (err) {
        // Silently fail for categories, as the app can work without them
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  // Horizontal slider implementation
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 8);
      setCanRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [categories]);

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.7) * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="categories categories-slider">
      {categories && categories.length > 0 && (
        <div className="cat-scroll-wrapper">
          <button
            type="button"
            aria-label="Previous categories"
            className={`cat-nav cat-nav-left ${canLeft ? '' : 'disabled'}`}
            onClick={() => scrollByAmount('left')}
            disabled={!canLeft}
          >
            <span className="material-icons-outlined">chevron_left</span>
          </button>
          <motion.div
            ref={scrollRef}
            className="cat-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map(({ _id, category }) => (
              <motion.button
                key={_id}
                type="button"
                className={`cat-chip ${category === hotelCategory ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          <button
            type="button"
            aria-label="Next categories"
            className={`cat-nav cat-nav-right ${canRight ? '' : 'disabled'}`}
            onClick={() => scrollByAmount('right')}
            disabled={!canRight}
          >
            <span className="material-icons-outlined">chevron_right</span>
          </button>
        </div>
      )}
      <div className="cat-actions">
        <button
          className="button btn-filter d-flex align-center gap-small cursor-pointer"
          onClick={handleFilterClick}
        >
          <span className="material-icons-outlined">filter_alt</span>
          <span>Filter</span>
        </button>
      </div>
    </section>
  );
};
