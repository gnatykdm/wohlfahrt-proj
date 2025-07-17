import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from '../../components/footer/Footer';
import { motion } from 'framer-motion';
import PageBanner from '../../components/banner/PageBanner';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.less';

import {
  Truck,
  CashStack,
  ShieldCheck,
  InfoCircle,
  PersonBadge,
  EmojiSmile,
  Send
} from 'react-bootstrap-icons';



const HomePage = () => {
  const lang = useSelector((state) => state.selectedLang);
  const pageContent = useSelector((state) => state.homePageContent);
  const servicePageContent = useSelector((state) => state.servicesPageContent);

  const sliderSettings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',   
    accessibility: false,
  };

  if (!pageContent?.intro || !servicePageContent?.list) {
    return null;
  }

  return (
    <div className="home">
      <Header />
      <div className="page-content">
        {/* Intro Section */}
        <section className="intro-section" aria-label="Introduction Slider">
          {pageContent.intro.slides.length > 1 ? (
            <Slider {...sliderSettings}>
              {pageContent.intro.slides.map((slide, index) => (
                <div key={`slide-${index}`} className="slide">
                  <div
                    className="bg"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${slide.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      filter: 'brightness(0.9)',
                      transition: 'transform 8s ease-in-out',
                    }}
                    aria-hidden="true"
                  />
                  <div className="content">
                    <div className="wrapper">
                      <div className="line"></div>
                      <h1 className="intro-title">{slide.title[lang]}</h1>
                      <div className="actions">
                        <a
                          href={slide.buttonLink}
                          className="btn light"
                          aria-label={slide.buttonText[lang]}
                        >
                          <Send style={{ marginRight: '5px' }} />
                          {slide.buttonText[lang]}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="slide">
              <div
                className="bg"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${pageContent.intro.slides[0].image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
                aria-hidden="true"
              />
              <div className="content">
                <div className="wrapper">
                  <div className="line"></div>
                  <h1 className="intro-title">{pageContent.intro.slides[0].title[lang]}</h1>
                  <div className="actions">
                    <a
                      href={pageContent.intro.slides[0].buttonLink}
                      className="btn light"
                      aria-label={pageContent.intro.slides[0].buttonText[lang]}
                    >
                      {pageContent.intro.slides[0].buttonText[lang]}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* About Section */}
        <div className="about-section">
            <div className="wrapper">
                <div className="banner">
                <img src={pageContent.about.image} alt="About" />
                </div>
                <div className="info">
                <h2 className="title">{pageContent.about.title[lang]}</h2>
                <div className="line"></div>
                <p className="text">{pageContent.about.text[lang]}</p>
                <a href="/about" className="btn">Read more</a>
                </div>
            </div>
        </div>

       {/* Services Section */}
        <div className="services-section py-12 bg-gray-100">
        <div className="wrapper max-w-7xl mx-auto px-4">
            <div className="section-title text-center">
            <h2 className="title text-3xl font-bold">
                {pageContent.services.title[lang]}
            </h2>
            <div className="line h-1 w-16 bg-gray-300 mx-auto mt-2"></div>
            </div>

            <div className="services-cards-container">
            {servicePageContent.list.slice(0, 3).map((service, index) => (
                <div key={index} className="service-card">
                <img
                    src={service.images.left}
                    alt={service.title[lang]}
                    className="image"
                />
                <div className="card-content">
                    <h4 className="title">{service.title[lang]}</h4>
                    <div className="line"></div>
                    <ul>
                    {service.list.map((item, idx) => (
                        <li key={idx}>{item[lang]}</li>
                    ))}
                    </ul>
                </div>
                </div>
            ))}
            </div>

            <div className="more-link text-right mt-6">
                <center>
                    <Link
                        to="/services"
                        className="inline-flex items-center text-blue-600 hover:underline"
                    >
                        {pageContent.services.buttonText[lang]}
                        <span className="bi bi-arrow-right ml-2" style={{ marginLeft: '10px', marginTop: '2px' }}></span>
                    </Link>
                </center>
            </div>
        </div>
        </div>

        {/* Advantages Section */}
        <div className="advantages-section">
            <div className="wrapper">
                {/* Section Title */}
                <div className="section-title">
                <h2 className="title">{pageContent.advantages.title[lang]}</h2>
                <div className="line"></div>
                </div>

                {/* Cards */}
                <div className="advantages-cards-row">
                {pageContent.advantages.list.map((advantage, index) => {
                    const icons = [
                    Truck,
                    CashStack,
                    ShieldCheck,
                    InfoCircle,
                    PersonBadge,
                    EmojiSmile
                    ];
                    const IconCmp = icons[index % icons.length];

                    return (
                    <div key={index} className="advantages-card">
                        <div className="icon">
                        <IconCmp size={30} />
                        </div>
                        <p className="text">{advantage[lang]}</p>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>


        {/* Page Banner */}
        <PageBanner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;