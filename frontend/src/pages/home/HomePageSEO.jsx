import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function HomePageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const bannerImages = useSelector(state => state.generalInfo?.banner?.images) || {};
  const aboutText = useSelector(state => state.homePageContent?.about?.text?.[lang]) || '';

  const bannerTitle = "Wohlfahrt" + (lang === 'ua' ? " • Головна" : " • Home");

  const keywords = lang === 'ua'
    ? 'логістика, доставка, транспорт, склад, митне оформлення, Україна'
    : 'logistics, delivery, transportation, warehousing, customs clearance, Ukraine';

  return (
    <Helmet>
      <title>{bannerTitle}</title>
      <meta name="description" content={aboutText} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={bannerTitle} />
      <meta property="og:description" content={aboutText} />
      <meta property="og:image" content={bannerImages.right || ''} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={bannerTitle} />
      <meta name="twitter:description" content={aboutText} />
      <meta name="twitter:image" content={bannerImages.right || ''} />

      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
