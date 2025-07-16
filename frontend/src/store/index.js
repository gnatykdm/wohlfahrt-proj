import { createStore } from 'redux';

const initialState = {
  selectedLang: 'en',
  generalInfo: {
    copyright: {
      en: '© 2025 Wohlfahrt. All rights reserved.',
      ua: '© 2025 Wohlfahrt. Всі права захищено.'
    },
    navList: {
      home: { en: 'Home', ua: 'Головна' },
      about: { en: 'About', ua: 'Про нас' },
      services: { en: 'Services', ua: 'Послуги' },
      contacts: { en: 'Contacts', ua: 'Контакти' },
      faq: { en: 'FAQ', ua: 'Питання' }
    },
    headerTexts: {
      contactUs: { en: 'Contact us', ua: 'Зв\'язатися з нами' }
    },
    footerTitle: {
      en: 'We may not exceed your expectations — but we will definitely meet them',
      ua: 'Може ми не перевершимо ваші очікування – але ми точно їм відповідатимемо'
    },

    banner: {
      title: {
        en: 'Logistics with us is simple and affordable',
        ua: 'Логістика з нами це просто та доступно'
      },
      buttonText: {
        en: 'Contact Us',
        ua: 'Зв\'язатися'
      },
      images: {
        left: '../../src/assets/img/page-banner-left.png',
        right: '../../src/assets/img/page-banner-right.png'
      }
    }
  },
  contactsInfo: {
    title: {
      en: 'Contact information',
      ua: 'Контактна інформація'
    },
    phones: [{
      value: '+380634076931',
      title: {
        en: 'Phone',
        ua: 'Телефон'
      }
    }],
    emails: [{
      value: 'info@wohlfahrt.com.ua',
      title: {
        en: 'Email',
        ua: 'Електронна пошта'
      }
    }],
    address: {
      title: {
        en: 'Address',
        ua: 'Адреса'
      },
      value: {
        en: '04116, Kyiv, Bohdan Havrylyshyn St., 27/29',
        ua: '04116, м. Київ, вул. Богдана Гаврилишина, б. 27/29'
      }
    },
    map: '',
    bottomImage: 'https://placehold.co/1920x400?text=Footer+Image'
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
