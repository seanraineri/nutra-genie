import React from 'react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cyan-950 to-slate-950">
      {/* Base grid container with perspective */}
      <div className="absolute inset-0" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {/* Horizontal grid lines with intersection highlights */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(0deg,transparent_47%,rgba(14,165,233,0.03)_48%,rgba(14,165,233,0.08)_50%,rgba(14,165,233,0.03)_52%,transparent_53%)] bg-[length:100%_4rem] animate-[grid-pulse_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
        
        {/* Vertical grid lines with intersection highlights */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_47%,rgba(14,165,233,0.03)_48%,rgba(14,165,233,0.08)_50%,rgba(14,165,233,0.03)_52%,transparent_53%)] bg-[length:4rem_100%] animate-[grid-pulse_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
        
        {/* Grid intersections glow effect */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0.5px,transparent_1.5px)] bg-[size:4rem_4rem] animate-[grid-pulse_4s_ease-in-out_infinite]"
          style={{ transform: 'rotateX(60deg) translateZ(-100px)' }}
        />
      </div>

      {/* Top ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      
      {/* Bottom ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
      
      {/* Dynamic perspective effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,165,233,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(14,165,233,0.15),transparent_70%)]" />
      
      {/* Subtle scan lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(14,165,233,0.03)_99%,rgba(14,165,233,0.05)_100%)] bg-[length:100%_0.2rem]" />
    </div>
  );
};