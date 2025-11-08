import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { FcGlobe } from "react-icons/fc";
import { MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="Navbar" data-testid="navbar">
      <div className="navbar-left">
        <h1
          className="navbar-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Explore <FcGlobe className="globe-icon" />
        </h1>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <div className={`search-bar-container ${isMenuOpen ? 'active' : ''}`}>
      <input
            type="text"
            className="search-bar"
            placeholder="Search destinations..."
          />
          <span className="search-icon" data-testid="search-icon">
            <ImSearch />
          </span>

      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/countries">Discover</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/profile" className="profile-icon">
            <MdManageAccounts />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
