import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function AboutPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.aboutPageContent);

  const title = "Wohlfahrt" + (lang === 'ua' ? " • Про Нас" : " • About Us");
  const description = pageContent?.text?.[lang]
    ? pageContent.text[lang].replace(/(<([^>]+)>)/gi, '').slice(0, 160)
    : 'Learn more about our company and services.';
  const heroImage = pageContent?.bg || '';

  const keywords = lang === 'ua'
    ? 'про нас, компанія, послуги, історія'
    : 'about us, company, services, history';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {heroImage && <meta property="og:image" content={heroImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {heroImage && <meta name="twitter:image" content={heroImage} />}

      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
