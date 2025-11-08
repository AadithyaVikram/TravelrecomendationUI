import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faYoutube, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import './style.css';
 
const Footer = () => {
  return (
    <footer data-testid="footer">
      <div className="footer-container">
        {/* div1: "Explore" column and its contents */}
        <div className="footer-div1">
          <div className="footer-column footer-column1">
            <h2 className="footer-heading footer-heading--main">Explore</h2>
            <p>for explorers everywhere.</p>
 
            <h3 className="footer-heading footer-heading--sub">Follow us</h3>
            <div className="social-media">
              <a href="#" className="facebook" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="instagram" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="twitter" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="youtube" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="#" className="pinterest" aria-label="Pinterest"><FontAwesomeIcon icon={faPinterestP} /></a>
            </div>
 
            <p className="sub-text">Subscribe to explore newsletters and promotions. <a href="#">Read our privacy policy</a>.</p>
          </div>
        </div>
 
        {/* div2: Container for "TOP countries" and "TOP states" */}
        <div className="footer-div2">
          {/* country-div: "TOP countries" */}
          <div className="footer-column country-div">
            <h3 className="footer-heading footer-heading--sub">TOP COUNTRIES</h3>
            <ul className="country-list">
              <li>United States</li>
              <li>Canada</li>
              <li>United Kingdom</li>
              <li>Australia</li>
              <li>Germany</li>
              {/* Add more countries as needed */}
            </ul>
          </div>
 
          {/* state-div: "TOP states" */}
          <div className="footer-column state-div">
            <h3 className="footer-heading footer-heading--sub">TOP STATES</h3>
            <ul className="state-list">
              <li>California</li>
              <li>New York</li>
              <li>Texas</li>
              <li>Florida</li>
              <li>Washington</li>
              {/* Add more states as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;