import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToHash } from '../lib/scroll';

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const savedPositions = useRef<Record<string, number>>({});

  useEffect(() => {
    return () => {
      savedPositions.current[location.key] = window.scrollY;
    };
  }, [location.key]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        scrollToHash(location.hash, navigationType === 'POP' ? 'auto' : 'smooth');
        return;
      }

      if (navigationType === 'POP' && savedPositions.current[location.key] !== undefined) {
        window.scrollTo({
          top: savedPositions.current[location.key],
          behavior: 'auto'
        });
        return;
      }

      window.scrollTo({
        top: 0,
        behavior: navigationType === 'POP' ? 'auto' : 'smooth'
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.key, location.pathname, navigationType]);

  return null;
};

export default ScrollManager;
