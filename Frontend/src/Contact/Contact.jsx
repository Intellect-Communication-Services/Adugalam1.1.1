import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";
import "./Contact.css";

import { useEffect } from "react";
import Run from "../Run.jsx";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };



  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Run />;
  }

  return (
    <main className="contact">
      {/* HERO */}
      <header className="contact__hero">
        <h1>Get in Touch</h1>
        <p>
          Have questions? We’d love to hear from you. Send us a message and we’ll
          respond as soon as possible.
        </p>
      </header>

      {/* INFO CARDS */}
      <section className="contact__info">
        <div className="info-card">
          <FiMail />
          <h4>Email Us</h4>
          <p>hello@adugalam.com</p>
          <span>We reply within 24 hours</span>
        </div>

        <div className="info-card">
          <FiPhone />
          <h4>Call Us</h4>
          <p>+91 9944533100</p>
          <span>Mon–Sat, 9am–6pm</span>
        </div>

        <div className="info-card">
          <FiMapPin />
          <h4>Visit Us</h4>
          <p>Chennai, Tamil Nadu</p>
          <span>By appointment only</span>
        </div>

        <div className="info-card">
          <FiClock />
          <h4>Support Hours</h4>
          <p>9 AM – 9 PM IST</p>
          <span>7 days a week</span>
        </div>
      </section>

      {/* MAIN */}
      <section className="contact__content">
        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>
            <FiMessageSquare /> Send us a Message
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input name="name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment / Refund</option>
                <option value="venue">Venue Partnership</option>
                <option value="account">Account Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              rows="4"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="form-submit">
            Send Message
          </button>
        </form>

        {/* FAQ */}
        <aside className="contact-faq">
          <div className="faq-box">
            <h4>
              <FiHelpCircle /> For Players
            </h4>
            <ul>
              <li>How do I book a venue?</li>
              <li>What payment methods are accepted?</li>
              <li>How do I cancel a booking?</li>
              <li>How to find players with similar interests?</li>
            </ul>
          </div>

          <div className="faq-box">
            <h4>
              <FiHelpCircle /> For Venue Partners
            </h4>
            <ul>
              <li>How do I list my venue?</li>
              <li>What are the commission rates?</li>
              <li>How do payouts work?</li>
              <li>What support do you provide?</li>
            </ul>
          </div>

          <div className="faq-urgent">
            <h4>Need Urgent Help?</h4>
            <p>For booking issues or urgent matters, call our support line.</p>
            <strong>+91 9944533100</strong>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Contact;