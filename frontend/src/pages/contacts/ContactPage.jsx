import React from 'react';
import { useSelector } from 'react-redux';
import ContactForm from '../../components/form/ContactForm';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export default function ContactPage() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.contactsPageContent);

  if (!pageContent?.title) return null;

  return (
    <div className="page-content">
      <Header />
      <div className="contacts-section">
        <div className="wrapper">
          <div className="flex-row-12">
            <div className="flex-col xs-12 md-6">
              <ContactForm className="border" />
            </div>

            <div className="flex-col xs-12 md-6">
              <div className="contacts">
                {Array.isArray(pageContent.phones) && pageContent.phones.map((phone, idx) => (
                  <div className="contact" key={`phone-${idx}`}>
                    <p className="title">{phone.title[lang]}</p>
                    <a href={`tel:${phone.value.replace(/\s+/g, '')}`} className="value">
                      {phone.value}
                    </a>
                  </div>
                ))}

                {Array.isArray(pageContent.emails) && pageContent.emails.map((email, idx) => (
                  <div className="contact" key={`email-${idx}`}>
                    <p className="title">{email.title[lang]}</p>
                    <a href={`mailto:${email.value}`} className="value">
                      {email.value}
                    </a>
                  </div>
                ))}

                {pageContent.address && (
                  <div className="contact">
                    <p className="title">{pageContent.address.title[lang]}</p>
                    <address className="value">{pageContent.address.value[lang]}</address>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
