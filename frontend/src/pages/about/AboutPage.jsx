import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutPage.less';

export default function AboutPage() {
  const lang = useSelector((state) => state.selectedLang);
  const pageContent = useSelector((state) => state.aboutPageContent);

  // Анимация появления секций
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
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
    sections.forEach(sec => observer.observe(sec));
    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);

  // Если нет текстов вообще — ничего не рендерим
  if (!pageContent?.text) return null;

  const heroTitle =
    pageContent?.title?.[lang] ??
    pageContent?.buttonText?.[lang] ??
    ''; // безопасный fallback
  const heroText = pageContent?.text?.[lang] ?? '';
  const heroBg = pageContent?.bg ?? '';
  const sections = Array.isArray(pageContent?.list) ? pageContent.list : [];

  return (
    <div className="about-page">
      <Header />

      <div className="page-content">
        {/* Intro */}
        <div
          className="intro-section sub-page text-center text-white d-flex align-items-center justify-content-center"
          role="region"
          aria-label="About Intro"
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
                  to="/services"
                  className="btn btn-outline-light btn-lg px-4"
                  aria-label={pageContent?.buttonText?.[lang] || 'Services'}
                >
                  <span className="fas fa-truck-loading me-2" aria-hidden="true" />
                  <span>{pageContent?.buttonText?.[lang] || 'Services'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="about-page-content py-5">
          <div className="container">
            {sections.map((section, index) => {
              const secTitle = section?.title?.[lang]; // может не быть — ок
              const secText = section?.text?.[lang] || '';
              const secImage = section?.image;
              const reverse = index % 2 === 0 ? 'flex-row-reverse' : '';

              return (
                <div key={index} className="section mb-5">
                  <div className={`row align-items-center g-4 ${reverse}`}>
                    {/* Image */}
                    <div className="col-md-6 text-center">
                      {secImage && (
                        <img
                          src={secImage}
                          alt={secTitle || 'Section image'}
                          className="img-fluid rounded shadow-sm zoom-in-img"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="col-md-6 fade-up-delayed">
                      {secTitle && (
                        <h3 className="h2 fw-bold mb-3">{secTitle}</h3>
                      )}
                      <p
                        className="text-muted"
                        dangerouslySetInnerHTML={{ __html: secText }}
                      />
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
