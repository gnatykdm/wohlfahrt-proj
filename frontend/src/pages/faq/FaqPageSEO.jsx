import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function FaqPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.faqPageContent);

  const title = "Wohlfahrt" + (lang === 'ua' ? " • Питання" : " • FAQ");
  const description = pageContent?.description?.[lang] || 'Frequently Asked Questions';
  const heroBg = pageContent?.bgImage || '';

  const keywords = lang === 'ua'
    ? 'питання, відповіді, faq, підтримка, допомога'
    : 'questions, answers, faq, support, help';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {heroBg && <meta property="og:image" content={heroBg} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {heroBg && <meta name="twitter:image" content={heroBg} />}

      {/* Canonical */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
