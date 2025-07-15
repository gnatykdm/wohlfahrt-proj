import './Header.less';
import logo from '../../assets/favicon.ico';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const lang = useSelector(state => state.selectedLang);
  const generalInfo = useSelector(state => state.generalInfo);
  const contactsInfo = useSelector(state => state.contactsInfo);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Закрыть меню при смене маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  function selectLang(language) {
    if (language !== 'en') {
      document.body.classList.add('cyrillic-font');
    } else {
      document.body.classList.remove('cyrillic-font');
    }
    dispatch({ type: 'switchLang', payload: language });
  }

  if (!generalInfo?.copyright) return null;

  return (
    <header className="page-header">
      <div className="wrapper">
        <div className="content-row">
          <Link to="/" className="logo" aria-label="Homepage">
            <img src={logo} alt="Logo" />
          </Link>

          <nav className="nav hidden-xs visible-inline-lg" aria-label="Primary navigation">
            <ul>
              {['home', 'about', 'services', 'contacts'].map((key) => (
                <li key={key}>
                  <Link
                    to={key === 'home' ? '/' : `/${key}`}
                    className={location.pathname === (key === 'home' ? '/' : `/${key}`) ? 'active' : ''}
                  >
                    {generalInfo.navList[key][lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="action">
            <div className="contact">
              <div className="c-content">
                <div className="lang" role="radiogroup" aria-label="Select language">
                  {['ua', 'en'].map((language) => (
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
            </div>
          </div>

          <div className="action hidden-xs visible-md">
            <div className="contact" aria-label="Contact phone">
              <div className="c-content">
                <p className="c-title">{generalInfo.headerTexts.contactUs[lang]}</p>
                <p className="c-value">{contactsInfo?.phones?.[0]?.value || '-'}</p>
              </div>
            </div>
          </div>

          <div className="mm-trigger hidden-lg visible-xs">
            <button
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
            >
              <span className="fas fa-bars" />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu${isMenuOpen ? ' active' : ''}`} role="dialog" aria-modal="true">
        <button
          className="close-btn"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="fas fa-times" />
        </button>
        <nav className="menu-content" aria-label="Mobile navigation">
          <ul className="list">
            {['home', 'about', 'services', 'faq', 'contacts'].map((key) => (
              <li key={key} onClick={() => setIsMenuOpen(false)}>
                <Link to={key === 'home' ? '/' : `/${key}`}>
                  {generalInfo.navList[key][lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
