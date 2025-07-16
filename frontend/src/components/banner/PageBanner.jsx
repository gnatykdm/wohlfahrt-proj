import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './PageBanner.less';

export default function PageBanner() {
  const generalInfo = useSelector(state => state.generalInfo);
  const lang = useSelector(state => state.selectedLang);

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
      <div className="wrapper">
        <div className="banner">
          <h2 className="title">{generalInfo.banner.title[lang]}</h2>
          <div className="actions">
            <Link to="/contacts" className="btn light">
              <span className="fas fa-paper-plane"></span>
              <span>{generalInfo.banner.buttonText[lang]}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
