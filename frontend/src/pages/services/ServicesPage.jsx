import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';
import DeliveryCalc from '../../components/deliverycalc/DeliveryCalc';
import FloatingPhoneButton from '../../components/floatingphonebutton/FloatingPhoneButton';
import ServicePageSEO from './ServicePageSEO';

import './ServicePage.less';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ServicesPage() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.servicesPageContent);
  const detailedSections = pageContent?.detailedSections || [];

  const [activeTab, setActiveTab] = useState(
    detailedSections.length > 0 ? detailedSections[0].key : ''
  );
  const [animating, setAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setActiveTab(detailedSections.length > 0 ? detailedSections[0].key : '');
  }, [detailedSections]);

  const onTabClick = (key) => {
    if (key === activeTab) return;
    setAnimating(true);
    setImageLoaded(false); 
    setTimeout(() => {
      setActiveTab(key);
      setAnimating(false);
    }, 300);
  };

  if (!pageContent?.title) return null;

  const heroTitle = pageContent?.title?.[lang] ?? '';
  const heroText = pageContent?.text?.[lang] ?? '';
  const heroBg = pageContent?.bg ?? '';

  const activeSection = detailedSections.find(s => s.key === activeTab);

  return (
    <div className="services-page">
      <Header />
      <ServicePageSEO />
      <main className="page-content">
        {/* Hero Intro */}
        <section
          className="intro-section sub-page d-flex align-items-center justify-content-center text-center text-white"
          style={{ backgroundImage: `url(${heroBg})` }}
          aria-label="Services Intro"
        >
          <div className="intro-overlay">
            <div className="wrapper fade-in">
              <div className="line" />
              {heroTitle && <h1 className="intro-title">{heroTitle}</h1>}
              {heroText && (
                <p
                  className="intro-text lead"
                  dangerouslySetInnerHTML={{ __html: heroText }}
                />
              )}
              <Link
                to="/contacts"
                className="btn btn-outline-light btn-lg px-4 mt-4"
                aria-label={pageContent?.buttonText?.[lang] || 'Contacts'}
              >
                <span className="fas fa-paper-plane me-2" aria-hidden="true" />
                {pageContent?.buttonText?.[lang]}
              </Link>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="services-tabs container my-5" aria-label="Service categories">
          <ul className="nav nav-tabs justify-content-center" role="tablist">
            {detailedSections.map(section => (
              <li className="nav-item" key={section.key} role="presentation">
                <button
                  className={`nav-link ${activeTab === section.key ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === section.key}
                  aria-controls={`tab-${section.key}`}
                  id={`tab-button-${section.key}`}
                  type="button"
                  onClick={() => onTabClick(section.key)}
                >
                  {section.title[lang]}
                </button>
              </li>
            ))}
          </ul>

          {/* Active Tab Content */}
          <div
            className={`tab-content mt-4 shadow-sm rounded bg-white p-4 fade-wrapper ${animating ? 'fade-out' : 'fade-in'}`}
            role="tabpanel"
            aria-labelledby={`tab-button-${activeTab}`}
            tabIndex="0"
          >
            {activeSection ? (
              <div className="tab-pane active">
                <div className="row align-items-center">
                  {activeSection.image && (
                    <div
                      className="col-lg-5 mb-4 mb-lg-0 d-flex align-items-center justify-content-center"
                      style={{ minHeight: '250px' }}
                    >
                      {!imageLoaded && (
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      <img
                        src={activeSection.image}
                        alt={activeSection.title[lang]}
                        className={`img-fluid rounded shadow zoom-in-img ${imageLoaded ? 'fade-in-img' : 'd-none'}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  )}

                  <div className={`col-lg-${activeSection.image ? '7' : '12'}`}>
                    <h3 className="section-title mb-3">{activeSection.title[lang]}</h3>
                    {activeSection.description && (
                      <p
                        className="section-description mb-4"
                        dangerouslySetInnerHTML={{ __html: activeSection.description[lang] }}
                      />
                    )}

                    {activeSection.list && (
                      <ul className="list-unstyled service-list">
                        {activeSection.list.map((item, i) => (
                          <li key={i} className="d-flex align-items-center mb-3">
                            <FaCheckCircle className="check-icon me-3" aria-hidden="true" />
                            <span>{item[lang]}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>Содержимое отсутствует</p>
            )}
          </div>
        </nav>
        <DeliveryCalc />
        <FloatingPhoneButton />
        <PageBanner />
      </main>

      <Footer />
    </div>
  );
}
