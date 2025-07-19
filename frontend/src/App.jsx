import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'; 
import React from 'react';
import './styles/App.css';

import Home from './pages/home/HomePage';
import About from './pages/about/AboutPage';
import Services from './pages/services/ServicesPage';
import Faq from './pages/faq/FaqPage';
import Contacts from './pages/contacts/ContactPage';
import NotFound from './pages/404/NotFoundPage';
import PhonePopup from './components/phone-pop-up/PhonePopUp';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Wohlfahrt</title>
        <meta charSet='UTF-8' />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PhonePopup />
    </Router>
  );
}

export default function Root() {
  return (
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
