import React from 'react';
import { useSelector } from 'react-redux';
import ContactForm from '../../components/form/ContactForm';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import { Container, Row, Col } from 'react-bootstrap';
import { Telephone, Envelope, GeoAlt } from 'react-bootstrap-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactPage.less';

export default function ContactPage() {
  const lang = useSelector(state => state.selectedLang);
  const pageContent = useSelector(state => state.contactsPageContent);

  if (!pageContent?.title) return null;

  return (
    <div className="page-content">
      <Header />
      <section className="contacts-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center align-items-center gx-5">
            <Col xs={12} md={6} className="mb-4 mb-md-0">
              <ContactForm className="border rounded shadow-sm p-4 bg-white" />
            </Col>

            <Col xs={12} md={6}>
              <div className="contacts">
                {Array.isArray(pageContent.phones) && pageContent.phones.map((phone, idx) => (
                  <div className="contact d-flex align-items-center mb-3" key={`phone-${idx}`}>
                    <div className="contact-icon-name-section">
                      <Telephone className="me-3 text-primary contact-icon" size={24} />
                      <p className="title mb-1">{phone.title[lang]}</p>
                    </div>
                    <div>
                      <a href={`tel:${phone.value.replace(/\s+/g, '')}`} className="value text-decoration-none">
                        {phone.value}
                      </a>
                    </div>
                  </div>
                ))}

                {Array.isArray(pageContent.emails) && pageContent.emails.map((email, idx) => (
                  <div className="contact d-flex align-items-center mb-3" key={`email-${idx}`}>
                    <div className="contact-icon-name-section">
                      <Envelope className="me-3 text-primary contact-icon" size={24} />
                      <p className="title mb-1">{email.title[lang]}</p>
                    </div>
                    <div>
                      <a href={`mailto:${email.value}`} className="value text-decoration-none">
                        {email.value}
                      </a>
                    </div>
                  </div>
                ))}

                {pageContent.address && (
                  <div className="contact d-flex align-items-center">
                    <div className="contact-icon-name-section">
                      <GeoAlt className="me-3 text-primary contact-icon" size={24} />
                      <p className="title mb-1">{pageContent.address.title[lang]}</p>
                    </div>
                    <div>
                      <address className="value mb-0">{pageContent.address.value[lang]}</address>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='contact-photo'>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2F2pexels-snapwire-618613.jpg?alt=media&token=a6a1397c-d724-4572-8b25-66ff4062c561" 
          alt="Wolfphram" 
          className="contact-photo-img" 
        />
      </section>
      <Footer />
    </div>
  );
}
