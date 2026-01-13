import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#1A2238] text-white hover:bg-[#2A3248]',
    secondary: 'bg-[#9DAAF2] text-[#1A2238] hover:bg-[#8D9AE2]',
    accent: 'bg-[#FF6A3D] text-white hover:bg-[#EF5A2D]',
    outline: 'border-2 border-[#1A2238] text-[#1A2238] hover:bg-[#1A2238] hover:text-white',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 min-h-[40px]',
    md: 'px-6 py-3 min-h-[48px]',
    lg: 'px-8 py-4 min-h-[56px]',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
