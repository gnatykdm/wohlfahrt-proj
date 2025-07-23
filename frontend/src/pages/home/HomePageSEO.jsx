import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function HomePageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const aboutText = useSelector(state => state.homePageContent?.about?.text?.[lang]) || '';

  const siteName = "Wohlfahrt Logistics";

  const rawTitle =
    lang === 'ua'
      ? `${siteName} • Логістичні послуги та митне оформлення`
      : `${siteName} • Logistics, Delivery & Customs Services`;

  const maxTitleLength = 65;
  const bannerTitle =
    rawTitle.length > maxTitleLength
      ? rawTitle.slice(0, maxTitleLength - 3) + '...'
      : rawTitle;

  const description =
    aboutText ||
    (lang === 'ua'
      ? 'Wohlfahrt — український логістичний оператор, що надає повний спектр послуг: складування, доставка, митне оформлення та підтримка по всій Україні та Європі.'
      : 'Wohlfahrt is a Ukrainian logistics operator providing full services: warehousing, delivery, customs clearance, and support across Ukraine and Europe.');


  const keywords =
    lang === 'ua'
      ? 'логістика, доставка, транспорт, склад, митне оформлення, Україна'
      : 'logistics, delivery, transportation, warehousing, customs clearance, Ukraine';

  const canonicalURL = "https://wohlfahrt.com.ua/";

  return (
    <Helmet>
      <title>{bannerTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={bannerTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'ua' ? 'uk_UA' : 'en_US'} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalURL} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={bannerTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalURL} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
}
