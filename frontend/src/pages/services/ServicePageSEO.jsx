import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function ServicesPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.servicesPageContent);

  const siteName = "Wohlfahrt Logistics";
  const title =
    lang === 'ua'
      ? `${siteName} • Послуги та логістичні рішення в Україні`
      : `${siteName} • Services & Supply Chain Solutions`;

  const description =
    pageContent?.text?.[lang] ||
    (lang === 'ua'
      ? 'Огляд наших послуг: доставка, митне оформлення, логістика по Україні та Європі.'
      : 'Overview of our services: delivery, customs clearance, and supply chain solutions in Europe and Ukraine.');

  const heroBg = pageContent?.bg || '';

  const keywords =
    lang === 'ua'
      ? 'логістика, доставка, митне оформлення, послуги Wohlfahrt'
      : 'logistics, delivery, customs clearance, Wohlfahrt services';

  const canonicalBase = "https://wohlfahrt.com.ua/services";

  return (
    <Helmet>
      {/* Basic SEO */}
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
      <meta property="og:url" content={canonicalBase} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {heroBg && <meta name="twitter:image" content={heroBg} />}
      <meta name="twitter:url" content={canonicalBase} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalBase} />
    </Helmet>
  );
}
