import { useEffect, useRef } from 'react';

export const useSwipe = ({ onLeft, onRight, threshold = 50 }) => {
  const startX = useRef(null);

  useEffect(() => {
    const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      if (startX.current == null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX.current;
      if (Math.abs(diff) < threshold) return;
      if (diff > 0 && onRight) onRight();
      if (diff < 0 && onLeft) onLeft();
      startX.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onLeft, onRight, threshold]);
};

export default useSwipe;
