import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import PageBanner from '../../components/banner/PageBanner';

import './AboutPage.less';

export default function AboutPage() {
  const lang = useSelector((state) => state.selectedLang);
  const pageContent = useSelector((state) => state.aboutPageContent);

  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  if (!pageContent?.title) {
    return null;
  }

  const heroTitle = pageContent?.title?.[lang] ?? '';
  const heroText = pageContent?.text?.[lang] ?? '';
  const heroBg = pageContent?.bg ?? '';

  const sections = Array.isArray(pageContent?.list) ? pageContent.list : [];

  return (
    <div className="about-page">
      <Header />

      <div className="page-content">
        <div className="intro-section sub-page" role="region" aria-label="About Intro">
          <div className="bg" style={{ backgroundImage: `url(${heroBg})` }} />
          <div className="content">
            <div className="wrapper">
              <div className="line" />
              <h1 className="intro-title">{heroTitle}</h1>
              {heroText && (
                <p
                  className="intro-text"
                  dangerouslySetInnerHTML={{ __html: heroText }}
                />
              )}
              <div className="actions">
                <Link
                  to="/services"
                  className="btn light"
                  aria-label={pageContent?.buttonText?.[lang] || 'Services'}
                >
                  <span className="fas fa-truck-loading" aria-hidden="true" />
                  <span>{pageContent?.buttonText?.[lang] || 'Services'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="about-page-content">
          <div className="section-list">
            {sections.map((section, index) => {
              const secTitle = section?.title?.[lang];
              const secText = section?.text?.[lang] || '';
              const secImage = section?.image;

              const isVertical = index % 2 === 1;

              return (
                <div
                  key={index}
                  className={`section ${isVertical ? 'section-vertical' : 'section-horizontal'}`}
                >
                  <div className="wrapper">
                    {isVertical ? (
                      <>
                        <div className="banner">
                          {secImage && (
                            <img src={secImage} alt={secTitle || 'Section image'} />
                          )}
                        </div>
                        <div className="info">
                          {secTitle && <h3 className="title">{secTitle}</h3>}
                          <p className="text" dangerouslySetInnerHTML={{ __html: secText }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="info">
                          {secTitle && <h3 className="title">{secTitle}</h3>}
                          <p className="text" dangerouslySetInnerHTML={{ __html: secText }} />
                        </div>
                        <div className="banner">
                          {secImage && (
                            <img src={secImage} alt={secTitle || 'Section image'} />
                          )}
                        </div>
                      </>
                    )}
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
