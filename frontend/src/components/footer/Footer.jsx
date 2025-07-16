import React from 'react';
import './Footer.less';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/logo-light.svg';
import { Telephone, Envelope, GeoAlt } from 'react-bootstrap-icons';

export default function Footer({ isSmallFooter }) {
  const lang = useSelector(state => state.selectedLang);
  const generalInfo = useSelector(state => state.generalInfo);
  const contactsInfo = useSelector(state => state.contactsInfo);

  if (!generalInfo?.copyright || !contactsInfo?.title) return null;

  const navItems = ['home', 'about', 'services', 'faq', 'contacts'];

  return (
    <div className={`page-footer${isSmallFooter ? ' small' : ''}`}>
      {!isSmallFooter && (
        <div className="f-content hidden-xs visible-md">
          <div className="wrapper">
            <div className="content-row">
              <div className="info">
                <h2 className="title">{generalInfo.footerTitle?.[lang]}</h2>
              </div>
              <div className="contacts">
                <div className="contact">
                  <p className="title">
                    <Telephone className="icon" style={{ marginRight: '8px' }} />
                    {contactsInfo.phones?.[0]?.title?.[lang]}
                  </p>
                  <a href={`tel:${contactsInfo.phones?.[0]?.value}`} className="value">
                    {contactsInfo.phones?.[0]?.value}
                  </a>
                </div>
                <div className="contact">
                  <p className="title">
                        <Envelope className="icon" style={{ marginRight: '8px' }} />
                        {contactsInfo.emails?.[0]?.title?.[lang]}
                  </p>
                  <a href={`mailto:${contactsInfo.emails?.[0]?.value}`} className="value">
                    {contactsInfo.emails?.[0]?.value}
                  </a>
                </div>
                <div className="contact">
                  <p className="title">
                    <GeoAlt className="icon" style={{ marginRight: '8px' }} />
                    {contactsInfo.address?.title?.[lang]}
                  </p>
                  <span className="value">
                    {contactsInfo.address?.value?.[lang]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSmallFooter && contactsInfo.map?.length > 0 ? (
        <div
          className="map"
          dangerouslySetInnerHTML={{ __html: contactsInfo.map }}
        ></div>
      ) : isSmallFooter && contactsInfo.bottomImage && (
        <div
          className="footer-banner"
          style={{ backgroundImage: `url(${contactsInfo.bottomImage})` }}
        ></div>
      )}

      <div className="f-nav">
        <div className="wrapper">
          <div className="content-row">
            <Link to="/" className="logo hidden-xs visible-sm">
              <img src={logo} alt="Logo" />
            </Link>
            <div className="menu">
              <nav className="nav hidden-xs visible-md">
                <ul>
                  {navItems.map(key => (
                    <li key={key}>
                      <Link to={key === 'home' ? '/' : `/${key}`}>
                        {generalInfo.navList?.[key]?.[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="copyright">
              <span>{generalInfo?.copyright?.[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
