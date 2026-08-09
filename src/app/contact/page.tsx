import styles from "./Contact.module.css";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className={`container ${styles.contactPage}`}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <span className={styles.separator}>›</span>
        <span>Contact Us</span>
      </div>

      <div className={styles.content}>
        <div className={styles.infoContent}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.description}>
            We'd love to hear from you. Get in touch with us for any questions or support.
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <div className={styles.icon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <h4 className={styles.itemTitle}>Email</h4>
                <p className={styles.itemText}>cgholdingssl@gmail.com</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.icon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h4 className={styles.itemTitle}>Phone</h4>
                <p className={styles.itemText}>+94 76 867 8104</p>
              </div>
            </div>


          </div>
        </div>

        <div className={styles.formContent}>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" placeholder="Your name" required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" placeholder="Your email address" required />
            </div>
            
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="How can we help you?" rows={5} required></textarea>
            </div>
            
            <Button variant="primary" size="lg" fullWidth>
              SEND MESSAGE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
