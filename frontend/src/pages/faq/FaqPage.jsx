import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import FloatingPhoneButton from '../../components/floatingphonebutton/FloatingPhoneButton';
import PageBanner from '../../components/banner/PageBanner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './FaqPage.less';

import { ChevronDown, ChevronUp, QuestionCircle } from 'react-bootstrap-icons';

export default function FaqPage() {
  const lang = useSelector((state) => state.selectedLang);
  const pageContent = useSelector((state) => state.faqPageContent);

  const [openIndex, setOpenIndex] = useState(null);

  // Intersection Observer для появления интро-секции и FAQ секций
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
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
    fadeElements.forEach(el => observer.observe(el));
    return () => fadeElements.forEach(el => observer.unobserve(el));
  }, []);

  if (!pageContent?.title) return null;

  const heroTitle = pageContent?.title?.[lang] ?? '';
  const heroText = pageContent?.description?.[lang] ?? '';
  const heroBg = pageContent?.bgImage ?? '';

  const faqSections = Object.keys(pageContent)
    .filter(k => k.startsWith('section'))
    .map(k => pageContent[k]);

  const toggleSection = (i) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <div className="faq-page">
      <Header />

      <div className="page-content">
        {/* Intro Section */}
        <div
          className="intro-section sub-page text-center text-white d-flex align-items-center justify-content-center"
          role="region"
          aria-label="FAQ Intro"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="intro-overlay">
            <div className="wrapper fade-in">
              <div className="line" />
              {heroTitle && <h1 className="intro-title">{heroTitle}</h1>}
              {heroText && (
                <p className="intro-text lead" dangerouslySetInnerHTML={{ __html: heroText }} />
              )}
              <div className="actions mt-4">
                <Link
                  to="/services"
                  className="btn btn-outline-light btn-lg px-4"
                  aria-label={pageContent?.buttonText?.[lang] || 'Services'}
                >
                  <span className="fas fa-cogs me-2" aria-hidden="true" />
                  <span>{pageContent?.buttonText?.[lang] || 'Services'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
{/* FAQ Accordion */}
<div className="faqv2-container py-5">
  <div className="container">
    {faqSections.map((faq, index) => {
      const isOpen = openIndex === index;
      return (
        <div
          key={index}
          className={`faqv2-section mb-4 rounded shadow-sm ${isOpen ? 'open' : ''}`}
        >
          <button
            type="button"
            className="faqv2-question btn w-100 text-start d-flex justify-content-between align-items-center"
            onClick={() => toggleSection(index)}
            aria-expanded={isOpen}
            aria-controls={`faqv2-answer-${index}`}
          >
            <span className="d-flex align-items-center">
              <QuestionCircle
                className="text-primary me-2"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              />
              {faq.title[lang]}
            </span>
            {isOpen ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
          </button>

          {isOpen && (
            <div
              id={`faqv2-answer-${index}`}
              className="faqv2-answer-wrapper show p-3 bg-white"
              role="region"
              aria-hidden={!isOpen}
            >
              <p
                className="faqv2-answer-text mb-0"
                dangerouslySetInnerHTML={{ __html: faq.content[lang] }}
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>


        <FloatingPhoneButton />
        <PageBanner />
      </div>

      <Footer />
    </div>
  );
}
