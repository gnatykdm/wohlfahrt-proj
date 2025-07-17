import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';

import './ServicePage.less';

export default function ServicesPage() {
  const lang = useSelector((state) => state.selectedLang);
  const pageContent = useSelector((state) => state.servicesPageContent);

  if (!pageContent?.title) {
    return null;
  }

  return (
    <div className="page-content">
      <Header />
      <div className="intro-section sub-page">
        <div
          className="bg"
          style={{ backgroundImage: `url(${pageContent.bg})` }}
          aria-hidden="true"
        />
        <div className="content">
          <div className="wrapper">
            <div className="line" />
            <h1 className="intro-title">{pageContent.title[lang]}</h1>
            <p className="intro-text">{pageContent.text[lang]}</p>
            <div className="actions">
              <Link to="/contacts" className="btn light" aria-label={pageContent.buttonText?.[lang] || 'Contacts'}>
                <span className="fas fa-paper-plane" aria-hidden="true" />
                <span>{pageContent.buttonText?.[lang]}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    <div className="services-list">
    {Array.isArray(pageContent.list) &&
        pageContent.list.map((service, index) => (
        <div className="service-item" key={index}>
            <div className="wrapper">
            <div className="info">
                <h3 className="title">{service.title?.[lang]}</h3>
                <p className="text">{service.text?.[lang]}</p>
                {Array.isArray(service.list) && (
                <ul className="list">
                    {service.list.map((item, j) => (
                    <li key={j}>{item?.[lang]}</li>
                    ))}
                </ul>
                )}
            </div>
            <div className="banner" aria-label={`${service.title?.[lang]} images`}>
                {service.images?.left && (
                <img src={service.images.left} alt={`${service.title?.[lang]} left`} />
                )}
                {service.images?.right && (
                <img src={service.images.right} alt={`${service.title?.[lang]} right`} />
                )}
            </div>
            </div>
        </div>
        ))}
    </div>

    <PageBanner />
    <Footer />
    </div>
  );
}
