import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicePage.less';

export default function ServicesPage() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.servicesPageContent);

  useEffect(() => {
    const items = document.querySelectorAll('.service-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  if (!pageContent?.title) return null;

  const heroTitle = pageContent?.title?.[lang] ?? '';
  const heroText = pageContent?.text?.[lang] ?? '';
  const heroBg = pageContent?.bg ?? '';
  const services = Array.isArray(pageContent?.list) ? pageContent.list : [];

  return (
    <div className="services-page">
      <Header />

      <div className="page-content">
        {/* Intro */}
        <div
          className="intro-section sub-page text-center text-white d-flex align-items-center justify-content-center"
          role="region"
          aria-label="Services Intro"
          style={{ backgroundImage: `url(${heroBg})` }}
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
              <div className="actions mt-4">
                <Link
                  to="/contacts"
                  className="btn btn-outline-light btn-lg px-4"
                  aria-label={pageContent?.buttonText?.[lang] || 'Contacts'}
                >
                  <span className="fas fa-paper-plane me-2" aria-hidden="true" />
                  <span>{pageContent?.buttonText?.[lang]}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services Sections */}
        <div className="services-page-content py-5">
          <div className="container">
            {services.map((service, index) => {
              const secTitle = service?.title?.[lang];
              const secText = service?.text?.[lang] || '';
              const reverseClass = index % 2 === 0 ? 'flex-row-reverse' : '';
              const leftImage = service.images?.left;
              const rightImage = service.images?.right;

              return (
                <div
                  key={index}
                  className={`service-section section mb-5`}
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  <div className={`row align-items-center g-4 ${reverseClass}`}>
                    {/* Images */}
                    <div className="col-md-6 text-center">
                      {leftImage && (
                        <img
                          src={leftImage}
                          alt={`${secTitle} left`}
                          className="img-fluid rounded shadow-sm zoom-in-img mb-3"
                        />
                      )}
                      {rightImage && (
                        <img
                          src={rightImage}
                          alt={`${secTitle} right`}
                          className="img-fluid rounded shadow-sm zoom-in-img"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="col-md-6 fade-up-delayed">
                      {secTitle && <h3 className="h2 fw-bold mb-3">{secTitle}</h3>}
                      <p
                        className="text-muted service-text"
                        dangerouslySetInnerHTML={{ __html: secText }}
                      />
                      {Array.isArray(service.list) && (
                        <ul className="mt-3 service-list">
                          {service.list.map((item, i) => (
                            <li key={i} className="text-muted">
                              {item?.[lang]}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <PageBanner />
      </div>

      <Footer />
    </div>
  );
}
