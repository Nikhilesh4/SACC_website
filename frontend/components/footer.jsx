import React from 'react';
import '@styles/footer.scss';

const Bottom = () => {
  return (
    <section id="sacc">
      <h1>About SACC</h1>
      <p>
        Student Alumni Connect Cell (SACC) is a student-run organization that aims to foster connections between students, alumni, and the Institute. SACC provides mentorship, organizes events, and offers resources to help students and alumni engage with their alma mater and fellow alumni.
      </p>

      <h2>Follow Us On Social Media</h2>

      <div className="social">
        <a href="https://www.instagram.com/alumnicell_iiith/" target="_blank">
          <img src="./assets/images/insta.png" alt="Instagram" className="social-icon" />
        </a>
        <a href="https://www.facebook.com/iiith.alumnicell" target="_blank">
          <img src="./assets/images/fb.png" alt="Facebook" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/company/alumni-cell-iiit-h/" target="_blank">
          <img src="./assets/images/linkedin.png" alt="LinkedIn" className="social-icon" />
        </a>
      </div>
    </section>
  );
}

export default Bottom;