import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './NotFoundPage.less';
import NotFoundImage from '../../assets/img/404.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 • Page Not Found | Wohlfahrt</title>
        <meta
          name="description"
          content="К сожалению, страница, которую вы ищете, не найдена. Вернитесь назад или на главную страницу."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://wohlfahrt.com.ua/" />
      </Helmet>

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
    </>
  );
};

export default NotFoundPage;
