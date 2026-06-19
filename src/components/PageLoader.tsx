import React, { useEffect, useState } from 'react';
import './PageLoader.css';
import workhallBlack from '../assets/workhall-black.svg';

const PageLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 640);
    const t2 = setTimeout(() => onComplete(), 1480);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className={`loader-root phase-${phase}`}>
      <div className="loader-orange" />

      <div className="loader-black-wipe" />

      <div className="loader-content">
        <img
          className="loader-mark"
          src={workhallBlack}
          alt="WorkHall"
          draggable="false"
        />
        <div className="loader-dots">
          <span className="loader-dot" style={{ animationDelay: '0ms' }} />
          <span className="loader-dot" style={{ animationDelay: '150ms' }} />
          <span className="loader-dot" style={{ animationDelay: '300ms' }} />
          <span className="loader-dot" style={{ animationDelay: '450ms' }} />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
