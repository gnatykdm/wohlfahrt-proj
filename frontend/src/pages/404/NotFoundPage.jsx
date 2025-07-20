import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.less';
import NotFoundImage from '../../assets/img/404.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page-content">
      <div className="notfound-section">
        <div className="notfound-wrapper">
          <img className="notfound-image" src={NotFoundImage} alt="Page Not Found" />
          <h1 className="notfound-title">Ooops! Page Not Found</h1>
          <p className="notfound-subtitle">Sorry, the page you are looking for does not exist.</p>
          <button className="notfound-btn-primary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
