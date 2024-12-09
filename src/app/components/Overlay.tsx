'use client'
import React, { ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  darkened?: boolean;
  openOverlay: boolean;
  setOpenOverlay: (value: boolean) => void;
}

const Overlay: React.FC<OverlayProps> = ({ children, darkened = false, openOverlay, setOpenOverlay }) => {
  const overlay = `fixed w-full h-full top-0 right-0 left-0 bottom-0 ${darkened ? 'bg-[#00000040]' : ''} z-10 cursor-pointer`;
  return (
      <div className={`${overlay} ${openOverlay ? 'block' : 'hidden'}`}>
        <div onClick={() => setOpenOverlay(false)} className="absolute h-full w-full"></div>
        {children}
      </div>
  );
};

export default Overlay;
