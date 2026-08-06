import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const btnClass = `
    ${styles.btn} 
    ${styles[`btn-${variant}`]} 
    ${styles[`btn-${size}`]} 
    ${fullWidth ? styles.fullWidth : ''} 
    ${className}
  `.trim();

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
