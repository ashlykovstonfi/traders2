import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'px-8 py-4 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg';
  
  const variantStyles = {
    primary: 'bg-white text-dark-bg hover:bg-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed focus:ring-white',
    secondary: 'bg-dark-border text-dark-text border border-dark-border hover:bg-opacity-20 disabled:opacity-40 disabled:cursor-not-allowed focus:ring-dark-text',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

