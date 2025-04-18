
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/dut-logo.png" 
        alt="DUT Logo" 
        className="h-8 w-auto" 
      />
      <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        DUT Tutoring
      </span>
    </div>
  );
};

export default Logo;
