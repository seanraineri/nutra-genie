import React from 'react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid container with perspective */}
      <div 
        className="absolute inset-0" 
        style={{ 
          perspective: '1000px', 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950 to-slate-950 opacity-90" />
        
        {/* Grid container to maintain consistent perspective */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: 'rotateX(60deg) translateZ(-100px)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Horizontal grid lines */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_47%,rgba(14,165,233,0.12)_48%,rgba(14,165,233,0.18)_50%,rgba(14,165,233,0.12)_52%,transparent_53%)] bg-[length:100%_4rem] animate-grid-scroll-y"
          />
          
          {/* Vertical grid lines */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_47%,rgba(14,165,233,0.12)_48%,rgba(14,165,233,0.18)_50%,rgba(14,165,233,0.12)_52%,transparent_53%)] bg-[length:4rem_100%] animate-grid-scroll-x"
          />
          
          {/* Grid intersections */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.28)_0.5px,transparent_1.5px)] bg-[size:4rem_4rem] animate-grid-pulse"
          />
        </div>
      </div>
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0">
        {/* Uniform top glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent opacity-75" />
        
        {/* Uniform bottom glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/15 via-transparent to-transparent opacity-75" />
        
        {/* Enhanced perspective glow */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.2),transparent_70%)]" />
        </div>
      </div>
      
      {/* Subtle scan lines for added texture */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(14,165,233,0.06)_99%,rgba(14,165,233,0.08)_100%)] bg-[length:100%_0.2rem]" />
    </div>
  );
};