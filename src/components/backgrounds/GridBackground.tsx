import React from 'react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid container with perspective */}
      <div className="absolute inset-0" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {/* Horizontal grid lines with softer intersection highlights */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(0deg,transparent_47%,rgba(14,165,233,0.02)_48%,rgba(14,165,233,0.05)_50%,rgba(14,165,233,0.02)_52%,transparent_53%)] bg-[length:100%_4rem] animate-grid-scroll-y"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
        
        {/* Vertical grid lines with softer intersection highlights */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_47%,rgba(14,165,233,0.02)_48%,rgba(14,165,233,0.05)_50%,rgba(14,165,233,0.02)_52%,transparent_53%)] bg-[length:4rem_100%] animate-grid-scroll-x"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
        
        {/* Grid intersections softer glow effect */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0.5px,transparent_1.5px)] bg-[size:4rem_4rem] animate-grid-pulse"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
      </div>
      
      {/* Softer ambient glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.08),transparent_70%)]" />
    </div>
  );
};