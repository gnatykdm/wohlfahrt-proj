import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function ContactPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.contactsPageContent);

  const siteName = "Wohlfahrt Logistics";

  const rawTitle =
    lang === 'ua'
      ? `${siteName} • Контакти та служба підтримки`
      : `${siteName} • Contact Information & Support`;

  const maxTitleLength = 65;
  const title =
    rawTitle.length > maxTitleLength
      ? rawTitle.slice(0, maxTitleLength - 3) + '...'
      : rawTitle;

  const description =
    pageContent?.description?.[lang] ||
    (lang === 'ua'
      ? 'Зв’яжіться з Wohlfahrt: телефон, email, адреса та служба підтримки для логістичних рішень.'
      : 'Get in touch with Wohlfahrt: phone, email, address, and support for logistics solutions.');

  const keywords =
    lang === 'ua'
      ? 'контакти, телефон, email, адреса, логістика, підтримка'
      : 'contacts, phone, email, address, logistics, support';

  const canonicalURL = "https://wohlfahrt.com.ua/contacts";

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

      {/* Canonical */}
      <link rel="canonical" href={canonicalURL} />
    </Helmet>
  );
}
