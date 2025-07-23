import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function AboutPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.aboutPageContent);

  const siteName = "Wohlfahrt Logistics";

  const rawTitle =
    lang === 'ua'
      ? `${siteName} • Про нас та наші логістичні послуги`
      : `${siteName} • About Us & Our Logistics Services`;

  const maxTitleLength = 65;
  const title =
    rawTitle.length > maxTitleLength
      ? rawTitle.slice(0, maxTitleLength - 3) + '...'
      : rawTitle;

  const description = pageContent?.text?.[lang]
    ? pageContent.text[lang].replace(/(<([^>]+)>)/gi, '').slice(0, 160)
    : (lang === 'ua'
        ? 'Дізнайтесь більше про компанію Wohlfahrt — наші логістичні рішення, історію та команду.'
        : 'Learn more about Wohlfahrt — our logistics solutions, company history, and team.');


  const keywords =
    lang === 'ua'
      ? 'про нас, компанія, логістика, послуги, історія'
      : 'about us, company, logistics, services, history';

  const canonicalURL = "https://wohlfahrt.com.ua/about";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'en_US'} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalURL} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalURL} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
}
