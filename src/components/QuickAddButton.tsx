"use client";

import { useState } from 'react';
import styles from './QuickAddButton.module.css';

export default function QuickAddButton({ 
  className, 
  text = "+ Quick Add" 
}: { 
  className?: string;
  text?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page when clicking Quick Add
    e.stopPropagation();

    if (status !== 'idle') return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 800);
  };

  return (
    <button 
      className={`${styles.button} ${styles[status]} ${className || ''}`}
      onClick={handleClick}
      disabled={status !== 'idle'}
    >
      <div className={styles.content}>
        {status === 'idle' && <span>{text}</span>}
        
        {status === 'loading' && (
          <span className={styles.spinnerWrapper}>
            <svg className={styles.spinner} viewBox="0 0 50 50">
              <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
          </span>
        )}

        {status === 'success' && (
          <span className={styles.successWrapper}>
            <svg className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added
          </span>
        )}
      </div>
    </button>
  );
}
