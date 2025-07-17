import { createStore } from 'redux';

const initialState = {
  selectedLang: 'en',

  generalInfo: {
    // ... unchanged
    copyright: {
      en: '© 2025 Wohlfahrt. All rights reserved.',
      ua: '© 2025 Wohlfahrt. Всі права захищено.'
    },
    navList: {
      home: { en: 'Home', ua: 'Головна' },
      about: { en: 'About Us', ua: 'Про нас' },
      services: { en: 'Services', ua: 'Послуги' },
      contacts: { en: 'Contacts', ua: 'Контакти' },
      faq: { en: 'FAQ', ua: 'Питання' }
    },
    headerTexts: {
      contactUs: { en: 'Contact us', ua: "Зв'язатися з нами" }
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
        ua: "Зв'язатися"
      },
      images: {
        left: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Banner%2Fpage-banner-left.png?alt=media&token=2a3dd5fc-255d-4414-ae2a-b41fb41e684f',
        right: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Banner%2Fpexels-marcin-jozwiak-3300645.jpg?alt=media&token=0b91f90b-f229-4345-8a12-7cb977e6c65a'
      }
    }
  },

  contactsInfo: {
    // ... unchanged
    title: {
      en: 'Contact information',
      ua: 'Контактна інформація'
    },
    phones: [{
      value: '+380634076931',
      title: { en: 'Phone', ua: 'Телефон' }
    }],
    emails: [{
      value: 'info@wohlfahrt.com.ua',
      title: { en: 'Email', ua: 'Електронна пошта' }
    }],
    address: {
      title: { en: 'Address', ua: 'Адреса' },
      value: {
        en: '04116, Kyiv, Bohdan Havrylyshyn St., 27/29',
        ua: '04116, м. Київ, вул. Богдана Гаврилишина, б. 27/29'
      }
    },
    map: '',
    bottomImage: 'https://placehold.co/1920x400?text=Footer+Image'
  },

  homePageContent: {
    // ... unchanged
    intro: {
      slides: [
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FHome%2Fintro-bg.png?alt=media&token=3c9b8a19-1f27-47b4-84dd-9a5cf3c373e9',
          title: {
            en: 'Delivery you’ll want to repeat for sure',
            ua: 'Доставка, яку ви побажаєте повторити'
          },
          buttonLink: '/contacts',
          buttonText: {
            en: 'Our Services',
            ua: "Наші послуги"
          }
        }
      ]
    },
    about: {
      image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FHome%2Fpexels-chanaka-906494.jpg?alt=media&token=88417a74-c58d-4ef6-a756-e2b932aaa07b',
      title: {
        en: 'About the company',
        ua: 'Про компанію'
      },
      text: {
        en: 'Wohlfahrt LLC is a young, rapidly developing, universal Ukrainian logistics operator. Our company provides a full range of supply chain management services: warehousing, transportation by all types of transport, customs clearance.',
        ua: 'ТОВ Вольфарт - молода компанія, що швидко розвивається, універсальний український логістичний оператор. Наша компанія надає повний комплекс послуг з управління ланцюжками поставок: складування, перевезення всіма видами транспорту, митне оформлення.'
      },
      buttonText: {
        en: 'Learn More',
        ua: 'Дізнатися більше'
      }
    },
    services: {
      title: { en: 'Services', ua: 'Послуги' },
      buttonText: {
        en: 'Learn more about our services',
        ua: 'Дізнатись більше про наші послуги'
      }
    },
    advantages: {
      title: { en: 'Advantages', ua: 'Переваги' },
      list: [
        { en: 'We provide transport according to your needs', ua: 'Забезпечуємо транспорт згідно з Вашими потребами' },
        { en: 'Reasonable and cost-effective pricing', ua: 'Аргументована та вигідна вартість' },
        { en: 'Reliable transportation, we insure liability and cargo', ua: 'Надійність перевезення, ми страхуємо відповідальність та вантаж' },
        { en: 'Regular updates on delivery status', ua: 'Регулярне інформування про статус доставки вантажу' },
        { en: 'Assistance with documentation and permits', ua: 'Допомога з документальним супроводом, отриманням дозволів' },
        { en: 'Working with us, the client optimizes a range of operational costs', ua: 'Працюючи з нами, клієнт оптимізує низку операційних витрат' }
      ]
    },
    partners: {
      title: { en: 'Our Partners', ua: 'Наші партнери' },
      list: [
        { logoImage: 'https://placehold.co/200x100?text=Partner+1' },
        { logoImage: 'https://placehold.co/200x100?text=Partner+2' },
        { logoImage: 'https://placehold.co/200x100?text=Partner+3' }
      ]
    }
  },

  servicesPageContent: {
    // ... unchanged
    list: [
      {
        images: { left: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-kai-pilger-1544372.jpg?alt=media&token=97496a07-1a7b-411e-ad3f-24fcbf9f2b31' },
        title: { en: 'Transport Services', ua: 'Транспортні' },
        list: [
          { en: 'Transportation within Ukraine', ua: 'Перевезення по Україні' },
          { en: 'International transportation', ua: 'Міжнародні перевезення' },
          { en: 'Cargo insurance', ua: 'Страхування вантажу' },
          { en: 'Legal support', ua: 'Юридичне супроводження' }
        ]
      },
      {
        images: { left: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-oleg-magni-2058136.jpg?alt=media&token=76b20999-d7b5-4973-ae1f-0681d79b47bc' },
        title: { en: 'Customs Brokerage Services', ua: 'Митно-брокерські' },
        list: [
          { en: 'Customs brokerage services', ua: 'Митно-брокерське оформлення' },
          { en: 'Cargo documentation', ua: 'Оформлення документів на вантаж' }
        ]
      },
      {
        images: { left: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-tiger-lily-4481258.jpg?alt=media&token=d88e7112-5b01-431c-bcff-799069d4d4f8' },
        title: { en: 'Warehouse Services', ua: 'Складські' },
        list: [
          { en: 'Loading and unloading operations (wide range)', ua: 'Вантажно-розвантажувальні роботи (широкий спектр)' },
          { en: 'Piece-by-piece and quality cargo acceptance', ua: 'Прийом вантажів штучно та якісно' },
          { en: 'Cargo sorting and selection', ua: 'Сортування та відбір вантажів' },
          { en: 'Cargo storage', ua: 'Зберігання вантажів' },
          { en: 'Cargo stitching', ua: 'Стікування вантажів' }
        ]
      }
    ]
  },

  /* NEW: About Page content for React port */
  aboutPageContent: {
    bg: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-photoscom-93398.jpg?alt=media&token=cfd6d59c-2a28-4291-baa0-a42bb3550dbf', // update
    title: {
      en: 'About company',
      ua: 'Про компанію'
    },
    text: {
      en: 'Wolfart LLC is a young fast-growing company, a universal Ukrainian logistics operator.',
      ua: 'ТОВ Вольфарт — молода компанія, що швидко розвивається, універсальний український логістичний оператор.'
    },
    buttonText: {
      en: 'Read more',
      ua: 'Читати більше'
    },
    list: [
      {
        // Intro / Mission
        title: {
          en: 'Who we are',
          ua: 'Хто ми'
        },
        text: {
          en: `Wolfart LLC is a young fast-growing company, a universal Ukrainian logistics operator.<br/><br/>
               Our company provides a full range of supply chain management services: warehousing, transportation by all types of transport, customs clearance.`,
          ua: `ТОВ Вольфарт — молода, швидкозростаюча компанія, універсальний український логістичний оператор.<br/><br/>
               Наша компанія надає повний комплекс послуг: складування, перевезення всіма видами транспорту, митне оформлення.`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-pixabay-209251.jpg?alt=media&token=243cd620-26bf-4966-9d92-939058031f0d'
      },
      {
        // Expertise
        title: {
          en: 'Experience & Expertise',
          ua: 'Досвід та експертиза'
        },
        text: {
          en: `Our employees have many years of experience in international transport logistics and warehouse services.<br/><br/>
               We are attentive — there are no little things in logistics.`,
          ua: `Наші співробітники мають багаторічний досвід у міжнародній транспортній логістиці та складських послугах.<br/><br/>
               Ми уважні — у логістичному процесі немає дрібниць.`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-tom-fisk-1427107.jpg?alt=media&token=0119c43c-c6e6-4d18-ab0c-d608028f20e8'
      },
      {
        // Values
        title: {
          en: 'Ambition backed by professionalism',
          ua: 'Амбіції, підкріплені професіоналізмом'
        },
        text: {
          en: `Our ambitions are backed by professionalism, tailored solutions, responsibility, and efficiency.<br/><br/>
               We stay ahead of changes and help clients reduce risk.`,
          ua: `Наші амбіції підкріплені професіоналізмом, індивідуальним підходом, відповідальністю та оперативністю.<br/><br/>
               Ми випереджаємо зміни й допомагаємо клієнтам зменшувати ризики.`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-tom-fisk-3840441.jpg?alt=media&token=16a66f5d-6969-499f-87b5-b86bd8a89146'
      }
    ]
  }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'switchLang':
      return { ...state, selectedLang: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);
export default store;
