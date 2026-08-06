import styles from "./About.module.css";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className={`container ${styles.aboutPage}`}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span className={styles.separator}>›</span>
        <span>About Us</span>
      </div>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.description}>
            Timeless is more than just a clothing brand. We believe in creating timeless pieces that inspire confidence every day and that outlast every trend.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 className={styles.featureTitle}>Our Mission</h3>
              <p className={styles.featureDesc}>To provide high quality detail clothing that brings joy and satisfaction.</p>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.icon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h3 className={styles.featureTitle}>Our Values</h3>
              <p className={styles.featureDesc}>Quality. Sustainability. Customer Satisfaction.</p>
            </div>
          </div>
        </div>

        <div className={styles.imageContent}>
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Timeless Clothing Quality" 
          />
        </div>
      </div>
    </div>
  );
}
