import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/HomePage';
import About from './pages/about/AboutPage';
import Services from './pages/services/ServicesPage';
import Faq from './pages/faq/FaqPage';
import Contacts from './pages/contacts/ContactPage'
import NotFound from './pages/404/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
