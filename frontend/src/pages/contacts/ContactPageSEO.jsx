import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function ContactPageSEO() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.contactsPageContent);

  const title = "Wohlfahrt" + (lang === 'ua' ? " • Контакти" : " • Contacts");
  const description = pageContent?.description?.[lang] || 'Contact us page';
  const heroImage = pageContent?.heroImage || '';

  const keywords = lang === 'ua'
    ? 'контакти, телефон, email, адреса, підтримка'
    : 'contacts, phone, email, address, support';

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

      {/* Canonical */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
