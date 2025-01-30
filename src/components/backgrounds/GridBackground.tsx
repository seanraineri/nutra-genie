import React from 'react';

export const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cyan-950 to-slate-950">
      {/* Horizontal grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(14,165,233,0.1)_50%,transparent_51%)] bg-[length:100%_4rem] animate-[pulse_4s_ease-in-out_infinite]" />
      
      {/* Vertical grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(14,165,233,0.1)_50%,transparent_51%)] bg-[length:4rem_100%] animate-[pulse_4s_ease-in-out_infinite]" />
      
      {/* Glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
      
      {/* Perspective effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_70%)]" />
    </div>
  );
};