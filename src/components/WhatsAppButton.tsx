import Link from 'next/link';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  // Use the phone number without spaces or plus sign for the API link
  const whatsappNumber = "94768678104";
  const message = "Hi! I would like to know more about your products.";
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.whatsappButton}
      aria-label="Chat on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        width="32" 
        height="32"
        fill="currentColor"
      >
        <path d="M12.01 2.01c-5.5 0-9.99 4.49-9.99 9.99 0 1.95.56 3.78 1.54 5.34L2.2 21.8l4.63-1.22c1.51.91 3.28 1.43 5.17 1.43 5.5 0 9.99-4.49 9.99-9.99S17.51 2.01 12.01 2.01zm5.35 14.34c-.23.65-1.34 1.25-1.85 1.32-.47.07-1.12.18-3.15-.66-2.45-1.02-4.04-3.52-4.16-3.69-.12-.16-1-1.33-1-2.54s.63-1.81.86-2.05c.22-.24.47-.3.63-.3h.43c.16 0 .37-.06.57.43.2.49.71 1.73.77 1.85.06.12.1.27.02.43-.08.16-.12.27-.24.41-.12.14-.25.32-.35.42-.12.12-.25.26-.11.5.14.25.61 1.01 1.3 1.63.89.8 1.63 1.05 1.87 1.17.24.12.37.1.51-.06.14-.16.6-1 .76-1.34.16-.34.32-.28.53-.2.2.08 1.28.61 1.5.72.22.11.37.16.42.25.07.09.07.51-.16 1.16z" />
      </svg>
    </a>
  );
}
