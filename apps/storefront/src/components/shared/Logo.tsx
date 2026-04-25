import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = '', showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon or Full Logo */}
      <div className="relative h-8 flex items-center shrink-0">
        {showText ? (
          <Image 
            src="/images/logo/logo-full.png" 
            alt="ZENTO Logo" 
            width={140} 
            height={40}
            className="h-10 w-auto object-contain"
          />
        ) : (
          <Image 
            src="/images/logo/logo-icon.png" 
            alt="ZENTO Icon" 
            width={40} 
            height={40}
            className="h-10 w-10 object-contain"
          />
        )}
      </div>
    </div>
  );
};
