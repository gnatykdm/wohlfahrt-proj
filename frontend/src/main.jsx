import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';  
import store from './store';
import './styles/index.css';
import './styles/grid.css';
import './styles/style.less';
import './styles/global.less';
import './styles/buttons.less';
import './styles/about.less';
import './styles/advantages.less';
import './styles/partners.less';
import './styles/services.less';
import './styles/contacts.less';
import './styles/faq.less';
import './styles/intro.less';
import './styles/not-found.less';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
