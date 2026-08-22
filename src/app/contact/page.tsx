"use client";

import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Contact.module.css";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaRef.current) return;
    
    setStatus("loading");
    try {
      const token = await recaptchaRef.current.executeAsync();
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, formData })
      });
      
      const data = await res.json();
      
      if (!data.success || !data.web3Key) {
        alert("Failed to verify: " + data.message);
        setStatus("error");
        return;
      }

      // 2. reCAPTCHA passed! Now send directly to Web3Forms from the browser
      // This bypasses Vercel -> Cloudflare blocking issues.
      const web3FormData = {
        ...formData,
        access_key: data.web3Key,
        subject: "New Contact Form Submission - Timeless Closet"
      };

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(web3FormData)
      });

      const web3Data = await web3Res.json();

      if (web3Data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message: " + (web3Data.message || "Unknown error"));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
      setStatus("error");
    } finally {
      recaptchaRef.current?.reset();
    }
  };

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
          {status === "success" ? (
            <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#f0fff4", color: "#2f855a", borderRadius: "8px", border: "1px solid #c6f6d5" }}>
              <h3 style={{ marginBottom: "1rem" }}>Thank you!</h3>
              <p style={{ marginBottom: "1.5rem" }}>Your message has been sent successfully. We will get back to you soon.</p>
              <Button variant="primary" onClick={() => setStatus("idle")}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  rows={5} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              />
              
              <Button variant="primary" size="lg" fullWidth disabled={status === "loading"}>
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
