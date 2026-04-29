"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-10 flex items-center shrink-0">
        <Image
          src="/images/logo/logo_horizontal.png"
          alt="ZENTO Logo"
          width={180}
          height={60}
          className="h-10 w-auto object-contain transition-all duration-500"
          priority
        />
      </div>
    </div>
  );
};
