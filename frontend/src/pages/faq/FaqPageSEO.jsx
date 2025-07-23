import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function FaqPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.faqPageContent);

  const siteName = "Wohlfahrt Logistics";
  const title =
    lang === 'ua'
      ? `${siteName} • Поширені питання та відповіді`
      : `${siteName} • Frequently Asked Questions (FAQ)`;

  const description =
    pageContent?.description?.[lang] ||
    (lang === 'ua'
      ? 'Відповіді на найпоширеніші питання щодо наших логістичних та митних послуг.'
      : 'Answers to frequently asked questions about our logistics and customs services.');

  const heroBg = pageContent?.bgImage || '';

  const keywords =
    lang === 'ua'
      ? 'питання, відповіді, faq, логістика, допомога'
      : 'faq, questions, answers, logistics, support, help';

  const canonicalURL = "https://wohlfahrt.com.ua/faq";

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
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalURL} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {heroBg && <meta name="twitter:image" content={heroBg} />}
      <meta name="twitter:url" content={canonicalURL} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
}
