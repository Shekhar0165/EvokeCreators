'use client';

import { useState, useEffect, useRef } from 'react';

export const UseInterSectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const hasTriggered = useRef(false); // Track if the observer has already triggered once.

  useEffect(() => {
    const observerOptions = {
      threshold: options.threshold || 0.4,
      root: options.root || null,
      rootMargin: options.rootMargin || '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true; // Mark as triggered
          setIsVisible(true); // Update visibility state
        }
      });
    }, observerOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return { elementRef, isVisible };
};
