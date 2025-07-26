

import React, { useState } from 'react';
// Import the CSS Module for scoped styling
import styles from './Contact.module.css';

const Contact = () => {
  // State to manage form data (name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State to manage the submission message (e.g., success, error)
  const [submissionMessage, setSubmissionMessage] = useState(null); // { type: 'success' | 'error', text: string }

  // Handles changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    
    console.log('Form submitted:', formData);

    // Simulate API call success/failure
    const isSuccess = Math.random() > 0.1; // 90% chance of success for demo

    if (isSuccess) {
      setSubmissionMessage({
        type: 'success',
        text: 'Thank you for your message! We will contact you soon.'
      });
      // Clear the form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmissionMessage({
        type: 'error',
        text: 'Failed to send message. Please try again later.'
      });
    }

    // Clear the message after a few seconds
    setTimeout(() => {
      setSubmissionMessage(null);
    }, 5000);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>Contact Us</h1>
      <div className={styles.contactContainer}>
        {/* Contact Information Section */}
        <section className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p className={styles.contactItem}>
            <img src="https://cdn-icons-png.flaticon.com/128/646/646135.png" alt="Email" className={styles.contactIcon} />
            Email: <a href="mailto:info@reservelt.com">info@reservelt.com</a>
          </p>
          <p className={styles.contactItem}>
            <img src="https://cdn-icons-png.flaticon.com/128/13/13936.png" alt="Phone" className={styles.contactIcon} />
            Phone: +254 776 435 7980
          </p>
          <p className={styles.contactItem}>
            <img src="https://cdn-icons-png.flaticon.com/128/5616/5616461.png" alt="Location" className={styles.contactIcon} />
            Address: 123 Hospitality Ave, Resort City
          </p>

          {/* Social Media Links Section */}
          <div className={styles.socialLinks}>
            <h3>Connect With Us</h3>
            <div className={styles.socialIcons}>
              {/* Facebook */}
              <a href="https://facebook.com/reservelt" target="_blank" rel="noopener noreferrer" className={`${styles.socialIconLink} ${styles.facebook}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.657 9.18 8.438 9.939V14.89H8.05V12.02h2.388V9.74c0-2.365 1.443-3.65 3.543-3.65 1.025 0 1.914.076 2.17.11V8.4h-1.29c-1.134 0-1.354.538-1.354 1.322V12h2.713l-.443 2.87h-2.27V22c5.336-.78 9.388-5.016 9.388-9.939C22 6.477 17.523 2 12 2z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/reservelt" target="_blank" rel="noopener noreferrer" className={`${styles.socialIconLink} ${styles.instagram}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.33 4.29a.9.9 0 0 0-1.272 0l-4.524 4.524a.9.9 0 0 0 0 1.272l4.524 4.524a.9.9 0 0 0 1.272 0l4.524-4.524a.9.9 0 0 0 0-1.272L15.33 4.29zm-1.06 1.06l3.464 3.464-3.464 3.464-3.464-3.464 3.464-3.464z" clipRule="evenodd" />
                  <path d="M16.5 7.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" />
                  <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  <path d="M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com/@reservelt" target="_blank" rel="noopener noreferrer" className={`${styles.socialIconLink} ${styles.tiktok}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525 2.195V4.65c3.673 0 6.65 2.977 6.65 6.65s-2.977 6.65-6.65 6.65V21.8c4.975 0 9.025-4.05 9.025-9.025S17.5 2.195 12.525 2.195zM10.15 2.195v16.11c-3.673 0-6.65-2.977-6.65-6.65s2.977-6.65 6.65-6.65z" />
                </svg>
              </a>
              {/* X (formerly Twitter) */}
              <a href="https://x.com/reservelt" target="_blank" rel="noopener noreferrer" className={`${styles.socialIconLink} ${styles.x}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-6.06-7.68-6.182 7.68H2.977l7.432-9.4L2.25 2.25h3.308l5.35 6.784L18.244 2.25zm-4.50 16.098l-3.016-3.818-5.602-7.09V4.309h2.337l5.35 6.784 3.016 3.818 5.602 7.09v-2.05h-2.337L13.744 18.348z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>

          {/* Submission Message Box */}
          {submissionMessage && (
            <div className={`${styles.messageBox} ${submissionMessage.type === 'success' ? styles.successMessage : styles.errorMessage}`}>
              {submissionMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
