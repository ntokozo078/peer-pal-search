
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm"></div>
        <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        DUT Tutoring
      </span>
    </div>
  );
};

export default Logo;
