import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Send } from 'react-bootstrap-icons';
import './PageBanner.less';

export default function PageBanner() {
  const generalInfo = useSelector((state) => state.generalInfo);
  const lang = useSelector((state) => state.selectedLang);

  if (!generalInfo?.banner) return null;

  return (
    <div className="page-banner">
      <div
        className="bg-left"
        style={{ backgroundImage: `url(${generalInfo.banner.images.left})` }}
      ></div>
      <div
        className="bg-right"
        style={{ backgroundImage: `url(${generalInfo.banner.images.right})` }}
      ></div>
      <div className="overlay"></div>
      <div className="wrapper">
        <div className="banner">
          <h2 className="title animate-fade-in">
            {generalInfo.banner.title[lang]}
          </h2>
          <div className="actions">
            <Link to="/contacts">
              <button
                className="btn-text"
                aria-label={generalInfo.banner.buttonText[lang]}
              >
                <Send className="icon" />
                {generalInfo.banner.buttonText[lang]}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
