import { createStore } from 'redux';

const initialState = {
  selectedLang: 'en',
  generalInfo: {
    copyright: '© 2025 Wohlfahrt. All rights reserved.',
    navList: {
      home: { en: 'Home', ua: 'Головна' },
      about: { en: 'About', ua: 'Про нас' },
      services: { en: 'Services', ua: 'Послуги' },
      contacts: { en: 'Contacts', ua: 'Контакти' },
      faq: { en: 'FAQ', ua: 'Питання' }
    },
    headerTexts: {
      contactUs: { en: 'Contact us', ua: 'Зв\'язатися з нами' }
    }
  },
  contactsInfo: {
    phones: [{ value: '+123456789' }]
  }
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case 'switchLang':
      return { ...state, selectedLang: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
