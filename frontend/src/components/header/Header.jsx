import './Header.less';
import logo from '../../assets/img/logo-light.svg';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-bootstrap-icons'; 
import { Telegram, Instagram, TwitterX } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons'; 

export default function Header() {
  const lang = useSelector(state => state.selectedLang);
  const generalInfo = useSelector(state => state.generalInfo);
  const contactsInfo = useSelector(state => state.contactsInfo);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const selectLang = (language) => {
    document.body.classList.toggle('cyrillic-font', language !== 'en');
    dispatch({ type: 'switchLang', payload: language });
  };

  if (!generalInfo?.navList) return null;

  const navItems = ['home', 'about', 'services', 'contacts'];
  const mobileNavItems = ['home', 'about', 'services', 'faq', 'contacts'];

  return (
    <header className="page-header">
      <div className="wrapper">
        <div className="content-row">
          <div className="left">
            <Link to="/" className="logo" aria-label="Homepage">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="center">
            <nav className="nav hidden-xs visible-inline-lg" aria-label="Primary navigation">
              <ul>
                {navItems.map(key => (
                  <li key={key}>
                    <Link
                      to={key === 'home' ? '/' : `/${key}`}
                      className={location.pathname === (key === 'home' ? '/' : `/${key}`) ? 'active' : ''}
                    >
                      {generalInfo.navList[key]?.[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="right">
            <div className="right-content">
              <div className="lang" role="radiogroup" aria-label="Select language">
                {['ua', 'en'].map(language => (
                  <button
                    key={language}
                    className={`item${lang === language ? ' selected' : ''}`}
                    onClick={() => selectLang(language)}
                    role="radio"
                    aria-checked={lang === language}
                    tabIndex={lang === language ? 0 : -1}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            <div className="contact" aria-label="Contact phone">
              <div className="c-content">
                <p className="c-title">{generalInfo.headerTexts.contactUs?.[lang]}</p>
                <p className="c-value">{contactsInfo?.phones?.[0]?.value || '-'}</p>
              </div>
            </div>

            <div className="mm-trigger">
              <button
                aria-label="Open menu"
                onClick={() => setIsMenuOpen(true)}
                aria-expanded={isMenuOpen}
              >
                <span className="fas fa-bars" /> <List />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className={`mobile-menu${isMenuOpen ? ' active' : ''}`} role="dialog" aria-modal="true">
        <button className="close-btn" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
          <span className="fas fa-times" /> <X />
        </button>
        <nav className="menu-content" aria-label="Mobile navigation">
          <ul className="list">
            {mobileNavItems.map(key => (
              <li key={key} onClick={() => setIsMenuOpen(false)}>
                <Link to={key === 'home' ? '/' : `/${key}`}>
                  {generalInfo.navList[key]?.[lang]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-footer">
            <div className="footer-contact">
              <p className="footer-title">{generalInfo?.headerTexts?.contactUs?.[lang]}</p>
              <p className="footer-phone">{contactsInfo?.phones?.[0]?.value || '-'}</p>
            </div>

            <div className="footer-lang">
              {['ua', 'en'].map(language => (
                <button
                  key={language}
                  className={`item${lang === language ? ' selected' : ''}`}
                  onClick={() => selectLang(language)}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>

            {/* 
            <div className="footer-socials">
              <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Telegram /> 
              </a>
              <a href="https://x.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <TwitterX />
              </a>
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
            </div>
            */}
            <div className="footer-credentials">
              <center>
                <p>{generalInfo?.copyright?.[lang]}</p>
              </center>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
