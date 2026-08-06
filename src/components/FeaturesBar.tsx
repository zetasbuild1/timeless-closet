import styles from './FeaturesBar.module.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="6.5"></line></svg>
    ),
    title: 'Trendy Styles',
    description: 'Stay ahead of fashion'
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    ),
    title: 'Premium Quality',
    description: 'Finest materials'
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    ),
    title: 'Trusted Brand',
    description: 'Loved by thousands'
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    ),
    title: 'Support',
    description: "We're here to help"
  }
];

export default function FeaturesBar() {
  return (
    <div className={styles.featuresBar}>
      <div className={styles.sliderTrack}>
        {/* Render twice for infinite scrolling effect */}
        {[...features, ...features, ...features].map((f, i) => (
          <div key={i} className={styles.featureItem}>
            <div className={styles.icon}>{f.icon}</div>
            <div>
              <h4 className={styles.title}>{f.title}</h4>
              <p className={styles.description}>{f.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
