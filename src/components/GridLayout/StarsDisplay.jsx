/**
 * StarDisplay.jsx
 * 
 * Purpose: Display of stars earned by the user throughout the game, part of WordDistribution
 * 
 * Author(s): Michael Allain, Mark Louis Tabudlong
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */
import { useEffect, useRef, useState } from "react";
import mikmaqStar from "../images/mikmaqStar.png";

// Trigger animation when a new star is earned (skip when getting correct answer on last word to avoid overlap with game over screen)
function StarsDisplay({ successCount, shouldSkipLastStar = false }) {
  const [prevCount, setPrevCount] = useState(0);
  const [animatingStarIndex, setAnimatingStarIndex] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (successCount > prevCount && !shouldSkipLastStar) {
      const newStarIndex = successCount - 1;
      setAnimatingStarIndex(newStarIndex);
      
      const startTime = Date.now();
      const duration = 800;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimationProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatingStarIndex(null);
        }
      };
      
      requestAnimationFrame(animate);
    }
    setPrevCount(successCount);
  }, [successCount, shouldSkipLastStar, prevCount]);

  /// Calculate position for the star
  const getAnimatedPosition = () => {
    if (animatingStarIndex === null || !containerRef.current) return null;
    
    const stars = containerRef.current.children;
    const targetStar = stars[animatingStarIndex];
    if (!targetStar) return null;
    
    const rect = targetStar.getBoundingClientRect();
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3);

    // Start from center, end at target star position
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    const endX = rect.left + rect.width / 2;
    const endY = rect.top + rect.height / 2;
    
    return {
      left: startX + (endX - startX) * easeProgress - 32,
      top: startY + (endY - startY) * easeProgress - 32,
      transform: `scale(${2.2 - 1.2 * easeProgress}) rotate(${360 * easeProgress}deg)`,
      opacity: 1 - easeProgress * 0.3,
      filter: `drop-shadow(0 0 ${15 * (1 - animationProgress)}px gold) brightness(${1 + 0.8 * (1 - animationProgress)})`
    };
  };

  const animatedPos = getAnimatedPosition();
  const displayCount = shouldSkipLastStar ? successCount - 1 : successCount;

  return (
    <>
      {animatedPos && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <img
            src={mikmaqStar}
            alt="Floating Star"
            className="absolute w-16 h-16"
            style={animatedPos}
          />
        </div>
      )}

      <div ref={containerRef} className="inline-flex gap-1">
        {Array(displayCount).fill(null).map((_, index) => (
          <img
            key={index}
            src={mikmaqStar}
            alt="Success"
            className="w-[8vw] rounded-full"
            style={{
              opacity: index === animatingStarIndex ? 0 : 1,
              visibility: index === animatingStarIndex ? 'hidden' : 'visible'
            }}
          />
        ))}
      </div>
    </>
  );
}

export default StarsDisplay;