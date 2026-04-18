import React from 'react';

interface RenkLogoProps {
  className?: string;
  variant?: "large" | "small";
}

export const RenkLogo = ({ className = "h-8 w-auto", variant = "large" }: RenkLogoProps) => (
  <img 
    src={variant === "small" ? "/logo-renk-small.png" : "/logo-renk.png"} 
    alt="Renk Logo" 
    className={className}
    referrerPolicy="no-referrer"
  />
);
