import { createStore } from 'redux';
import FaqPage from '../pages/faq/FaqPage';

const initialState = {
  selectedLang: 'en',

  generalInfo: {
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
    intro: {
      slides: [
        {
          image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FHome%2Fintro-bg.png?alt=media&token=3c9b8a19-1f27-47b4-84dd-9a5cf3c373e9',
          title: {
            en: 'Delivery you’ll want to repeat for sure',
            ua: 'Доставка, яку ви забажаєте повторити'
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
        ua: 'Wohlfahrt - молода компанія, що швидко розвивається, універсальний український логістичний оператор. Наша компанія надає повний комплекс послуг з управління ланцюжками поставок: складування, перевезення всіма видами транспорту, митне оформлення.'
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

  aboutPageContent: {
    bg: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-photoscom-93398.jpg?alt=media&token=cfd6d59c-2a28-4291-baa0-a42bb3550dbf', // update
    title: {
      en: 'About company',
      ua: 'Про компанію'
    },
    text: {
      en: 'Wolfart LLC is a young fast-growing company, a universal Ukrainian logistics operator.',
      ua: 'Wohlfahrt – молода компанія, що швидко розвивається, універсальний український логістичний оператор.'
    },
    buttonText: {
      en: 'Read more',
      ua: 'Читати більше'
    },
    list: [
      {
        title: {
          en: 'Who we are',
          ua: 'Хто ми'
        },
        text: {
          en: `Our company provides a full range of supply chain management services: warehousing, transportation by all types of transport, customs clearance. Our employees have many years of experience in the field of international transport logistics and warehouse services. The goal we pursue is to exceed all the expectations of our customers and to satisfy their requests with high quality. We are attentive, and we know that there are no trifles in the logistics process.`,
          ua: `Наша компанія надає повний комплекс послуг з управління поставками: складування, перевезення всіма видами транспорту, митне оформлення. Наші співробітники мають багаторічний досвід у сфері міжнародної транспортної логістики та складських послуг. Мета, яку ми переслідуємо – це перевершити всі очікування наших клієнтів та якісно задовольнити їхні запити. Ми уважні і знаємо, що в логістичному процесі дрібниць не буває.`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-pixabay-209251.jpg?alt=media&token=243cd620-26bf-4966-9d92-939058031f0d'
      },
      {
        title: {
          en: 'Experience & Expertise',
          ua: 'Досвід та експертиза'
        },
        text: {
          en: `For years largest retailers highly appreciate our work and trust own logistics to us. Trust your logistics company "Wolfart" and no longer worry about problems with transportation and storage of goods. We will help you improve your well-being !!! (German Wohlfahrt)`,
          ua: `Нам роками довіряють свою логістику та високо оцінюють нашу роботу найбільші рітейлери. Довірте і Ви свою логістику компанії “Wohlfahrt” і більше не турбуйтесь про проблеми з перевезенням та складуванням товару.
               Ми допоможемо покращити Ваш добробут! (Нім. Wohlfahrt)`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-tom-fisk-1427107.jpg?alt=media&token=0119c43c-c6e6-4d18-ab0c-d608028f20e8'
      },
      {
        title: {
          en: 'Ambition backed by professionalism',
          ua: 'Амбіції, підкріплені професіоналізмом'
        },
        text: {
          en: `Our ambitions are backed by a high level of professionalism, an individual approach to each assigned task, as well as the responsibility and efficiency of our employees. We keep up with all the changes, develop and often know what will happen tomorrow, than we help to level the risks for the client.`,
          ua: `Наші амбіції підкріплені високим рівнем професіоналізму, індивідуальним підходом до кожного поставленого завдання, а також відповідальністю та ефективністю співробітників. Ми крокуємо в ногу з усіма змінами, розвиваємося і часто знаємо, що буде завтра, чим допомагаємо нівелювати ризики для клієнта.`
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FAbout%2Fpexels-tom-fisk-3840441.jpg?alt=media&token=16a66f5d-6969-499f-87b5-b86bd8a89146'
      },
    ]
  },
 servicesPageContent: {
  bg: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-pixabay-262353.jpg?alt=media&token=83aa9da0-4ddb-4b69-b90d-56c0209a6cc2', 
  title: { en: 'Services', ua: 'Послуги' },
  text: {
    en: 'Our company provides transport, customs brokerage and warehouse services',
    ua: 'Наша компанія надає транспортні, митно-брокерські та складські послуги'
  },
  buttonText: { en: 'Learn more', ua: 'Дізнатись більше' },
  
  detailedSections: [
    {
      key: 'china',
      title: { en: 'Delivery from China', ua: 'Доставка з Китаю' },
      image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-kai-pilger-1544372.jpg?alt=media&token=97496a07-1a7b-411e-ad3f-24fcbf9f2b31',
      list: [
        { en: 'Product search', ua: 'пошук товару' },
        { en: 'Factory inspection', ua: 'перевірка фабрик' },
        { en: 'Quality control', ua: 'контроль якості' },
        { en: 'Transportation within China', ua: 'транспортування по Китаю' },
        { en: 'Local port operations', ua: 'локальні роботи в порту' },
        { en: 'Document preparation', ua: 'оформлення документів' },
      ]
    },
    {
      key: 'europe',
      title: { en: 'Delivery from Europe', ua: 'Доставка з Європи' },
      image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-tima-miroshnichenko-6169052.jpg?alt=media&token=50f72e76-7211-4a19-a222-eac1ed76f261',
      list: [
        { en: 'Product search', ua: 'пошук товару' },
        { en: 'Communication with manufacturers', ua: 'комунікація з виробниками' },
        { en: 'Expedition across Europe', ua: 'експедиція по Європі' },
        { en: 'Customs brokerage services', ua: 'митно-брокерські послуги' },
        { en: 'Warehousing and cargo consolidation', ua: 'складування і консолідація вантажів' },
      ]
    },
    {
      key: 'otherRegions',
      title: { en: 'Delivery from other regions', ua: 'Доставка з інших регіонів' },
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.AVI88De1n14ssbHZrzvHtAHaEK%3Fpid%3DApi&f=1&ipt=6867d04bcdfe641be1bfbc606e185336b8e4bb7078b00c92a49522e29d4ecc9b&ipo=images',
      list: [
        { en: 'Asia (except China)', ua: 'Азія (крім Китаю)' },
        { en: 'Middle East', ua: 'Близький Схід' },
        { en: 'USA / America', ua: 'США / Америка' },
      ]
    },
    {
      key: 'transportTypes',
      title: { en: 'Types of transport services', ua: 'Типи транспортних послуг' },
      image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-malte-luk-3307415.jpg?alt=media&token=99e65b88-e0a6-4aad-ac04-8c4c418d37a1',
      list: [
        { en: 'Container transportation', ua: 'контейнерні перевезення' },
        { en: 'Air transportation', ua: 'авіа перевезення' },
        { en: 'Road transportation within Europe', ua: 'автоперевезення по Європі' },
        { en: 'Road transportation from Europe to Ukraine', ua: 'автоперевезення з Європи в Україну' },
      ]
    },
    {
      key: 'logistics',
      title: { en: 'Other logistics and related services', ua: 'Інші логістичні та супутні послуги' },
      image: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FServices%2Fpexels-oleg-magni-2058136.jpg?alt=media&token=76b20999-d7b5-4973-ae1f-0681d79b47bc',
      list: [
        { en: 'Brokerage services in Poland and Ukraine', ua: 'брокерські послуги в Польщі та Україні' },
        { en: 'Cargo insurance', ua: 'страхування вантажу' },
        { en: 'Cargo consolidation', ua: 'консолідація вантажу' },
        { en: 'Import optimization', ua: 'оптимізація імпорту' },
        { en: 'Turnkey delivery', ua: 'доставка під ключ' },
      ]
    },
    {
      key: 'regionsInfo',
      title: { en: 'Regions of delivery', ua: 'Регіони доставки' },
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.v6YEADGqxHp6MrU6TygeHQHaEO%3Fpid%3DApi&f=1&ipt=da2bbe6b84a9cbb9513c98f7cd58775ed16c0b6bd93a3dab42998fe225bd1096&ipo=images',
      list: [
        { en: 'Europe', ua: 'Європа' },
        { en: 'Asian countries', ua: 'країни Азії' },
        { en: 'Middle East', ua: 'Близький Схід' },
        { en: 'USA (on demand)', ua: 'США (за потреби підтвердити)' },
      ]
    },
  ]
},

  phonePopupTexts: {
    title: {
      en: 'Leave your phone number',
      ua: 'Залиште свій номер телефону'
    },
    titleModal: {
      en: 'Leave your phone number – we will call you back within 30 seconds!',
      ua: 'Залиште свій номер телефону – ми передзвонимо вам протягом 30 секунд!'
    },
    placeholder: {
      en: '+38 (___) ___-__-__',
      ua: '+38 (___) ___-__-__'
    },
    submitButton: {
      en: 'Send',
      ua: 'Відправити'
    },
    error: {
      en: 'Please enter a valid phone number',
      ua: 'Будь ласка, введіть коректний номер телефону'
    },
    successMessage: {
      en: 'Thank you! We will contact you soon.',
      ua: 'Дякуємо! Ми скоро з вами зв’яжемося.'
    }
  },


   contactsPageContent: {
    title: {
      en: 'Contacts',
      ua: 'Контакти'
    },
    phones: [
      {
        title: { en: 'Phone', ua: 'Телефон' },
        value: '+380634076931'
      }
    ],
    emails: [
      {
        title: { en: 'Email', ua: 'Електронна пошта' },
        value: 'info@wohlfahrt.com.ua'
      }
    ],
    address: {
      title: { en: 'Address', ua: 'Адреса' },
      value: {
        en: '04116, Kyiv, Bohdan Havrylyshyn St., 27/29',
        ua: '04116, м. Київ, вул. Богдана Гаврилишина, б. 27/29'
      }
    }
  },

  faqPageContent: {
    title : {
      en: 'FAQ',
      ua: 'Питання'
    },
    bgImage: 'https://firebasestorage.googleapis.com/v0/b/wohlfahrt-e69c4.appspot.com/o/Pages%2FFAQ%2Fpexels-fauxels-3184639.jpg?alt=media&token=bc5a71a3-4445-41b0-a3fb-cb616f2dc7f6',
    description: {
      en: "Answers to your most common questions.",
      ua: 'Відповіді на найпоширеніші питання.'
    },
    buttonText: {
      en: 'Services',
      ua: 'Послуги'
    },
    section1: {
      title: { en: "How to order a service?", ua: "Як замовити послугу?"},
      content: {
        en: "You can order the service by calling +380672491638, sending us an e-mail corp@wohlfahrt.com.ua or visiting our office in Kyiv.",
        ua: "Послугу Ви можете замовити зателефонувавши за номером +380672491638, повідомленням нам на e-mail corp@wohlfahrt.com.ua або приїхати до нашого офісу в м. Київ."
      }
    },
    section2: {
      title: { en: "How to send a cargo by a transport company?", ua: "Як відправити вантаж транспортною компанією?" },
      content: {
        en: "If you want to hand over the goods yourself to the warehouse, the transportation procedure will be as follows: - the goods that meet the requirements for transportation are accepted at the warehouse by Wolfarth specialists, weighed, marked, additionally packed if necessary - a bill of lading is drawn up. - the cargo is dispatched to the city of receipt according to the schedule of transport between the terminals - upon arrival of the cargo at the Forwarder's terminal in the city of receipt, our managers notify the client, clarify payment options, and, if desired, arrange delivery to the door. If you cannot bring us the goods yourself, we can arrange a pick-up service in the city of dispatch.",
        ua: "Якщо ви хочете здати вантаж на склад самостійно, процедура транспортування буде такою: - вантаж, що відповідає вимогам до перевезень, приймається на складі фахівцями Вольфарт, зважується, маркується, за потребою додатково упаковується - оформлюється транспортна накладна. - провадиться відправка вантажу до міста отримання за графіком курсування транспорту між терміналами - після прибуття вантажу на термінал Експедитора до міста отримання, наші менеджери сповіщають клієнта, уточнюють варіанти оплати, та за бажанням організовують доставку до дверей. Якщо ви не можете привезти нам вантаж самостійно, ми можемо організувати послугу забору вантажу у місті відправлення."
      }
    },
    section3: {
      title: { en: "What is required to complete an application for cargo transportation?", ua: "Що потрібно для оформлення заявки на вантажоперевезення?" },
      content: {
        en: "Before sending the cargo, you need to have the following information to fill out an application for cargo transportation: - the name of the payer, sender and recipient, as well as their addresses (location) and telephone number - information about the cargo and its special properties - approximate weight, number of places and dimensions of the cargo - cost cargo - the estimated date of delivery of the cargo to the Forwarder's warehouse or the date of picking up the cargo from the Sender.",
        ua: "Перед відправкою вантажу Вам для заповнення заявки на вантажоперевезення необхідно мати таку інформацію: - найменування платника, відправника та одержувача, а також їх адреси (місця розташування) та телефони - відомості про вантаж та його особливі властивості - орієнтовна вага, кількість місць та габарити вантажу - вартість вантажу - передбачувана дата здачі вантажу на склад Експедитора або дата забору вантажу від Відправника."
      }
    },
    section4: {
      title: { en: "How do I know the condition of my cargo while it is in transit?", ua: "Як мені дізнатися про стан мого вантажу, коли він у дорозі?" },
      content: {
        en: "Just contact our managers - and they will provide you with the most up-to-date and complete information about the location and condition of your cargo.",
        ua: "Просто зв'яжіться з нашими менеджерами – і вони повідомлять вам найактуальнішу та повну інформацію про місцезнаходження та стан вашого вантажу."
      }
    },
    section5: {
      title: { en: "How do you know that the cargo has been delivered?", ua: "Як дізнатися, що вантаж доставлено?" },
      content: {
        en: "Our managers will contact you when the cargo is ready for delivery.",
        ua: "Наші менеджери зв'яжуться з Вами, коли вантаж буде готовий до видачі."
      }
    },
  },

  deliveryCalcTexts: {
    title: {
      en: 'Delivery calculation in 30 minutes',
      ua: 'Прорахунок доставки за 30 хвилин'
    },
    titleButton: {
      en: 'Calculate',
      ua: 'Прорахувати'
    },
    description: {
      en: 'Enter cargo parameters to get an approximate cost.',
      ua: 'Введіть параметри вантажу, щоб отримати орієнтовну вартість.'
    },
    placeholders: {
      direction: {
        en: 'Direction (Kyiv – Lviv)',
        ua: 'Напрямок (Київ – Львів)'
      },
      weight: {
        en: 'Weight (kg)',
        ua: 'Вага (кг)'
      },
      dimensions: {
        en: 'Dimensions (e.g. 2m x 1.5m x 1m)',
        ua: 'Габарити (напр. 2м x 1.5м x 1м)'
      },
      cargoType: {
        en: 'Select cargo type',
        ua: 'Виберіть тип вантажу'
      }
    },
    cargoTypesOptions: {
      fragile: { en: 'Fragile', ua: 'Крихкий' },
      bulk: { en: 'Bulk', ua: 'Насипний' },
      liquid: { en: 'Liquid', ua: 'Рідкий' },
      other: { en: 'Other', ua: 'Інший' }
    },
    carOptions: {
      separate: { en: 'Separate vehicle', ua: 'Окреме авто' },
      additional: { en: 'Additional loading', ua: 'Довантаження' }
    },
    submitButton: {
      en: 'Send',
      ua: 'Відправити'
    },
    errors: {
      fillAllFields: {
        en: 'Please fill all the fields',
        ua: 'Будь ласка, заповніть усі поля'
      },
      submitError: {
        en: 'An error occurred. Please try later.',
        ua: 'Сталася помилка. Спробуйте пізніше.'
      }
    },
    successMessage: {
      en: 'Thank you! Your calculation has been sent.',
      ua: 'Дякуємо! Ваш прорахунок надіслано.'
    }
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
