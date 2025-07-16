import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Send } from 'react-bootstrap-icons';
import axios from 'axios';
import './ContactForm.less';

export default function ContactForm() {
  const contactsInfo = useSelector(state => state.contactsInfo);
  const lang = useSelector(state => state.selectedLang);

  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' });
  const [isMailSended, setIsMailSended] = useState(false);
  const [isMailSendError, setIsMailSendError] = useState(false);
  const [formSendInProcess, setFormSendInProcess] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const sendMail = async () => {
    const { name, email, phone, msg } = form;
    if (!name || !email || !phone || !msg) {
      setIsFormError(true);
      return;
    }

    setIsFormError(false);
    setFormSendInProcess(true);

    try {
      await axios.post('#', form); // placeholder for your real endpoint
      setIsMailSended(true);
    } catch (err) {
      setIsMailSendError(true);
      console.error(err);
    } finally {
      setFormSendInProcess(false);
    }
  };

  if (!contactsInfo || !contactsInfo.phones || !contactsInfo.emails || !contactsInfo.address) return null;

  return (
    <div className="contact-form">
      {/* Static Contact Info */}
      <div className="contact-info-static">
        <h2>{contactsInfo.title?.[lang] || 'Контакти'}</h2>

        {contactsInfo.phones.map((phone, i) => (
          <p key={`phone-${i}`}>
            <strong>{phone.title[lang]}:</strong> {phone.value}
          </p>
        ))}

        {contactsInfo.emails.map((email, i) => (
          <p key={`email-${i}`}>
            <strong>{email.title[lang]}:</strong> {email.value}
          </p>
        ))}

        <p>
          <strong>{contactsInfo.address.title[lang]}:</strong> {contactsInfo.address.value[lang]}
        </p>
      </div>

      {/* Contact Form */}
      {!isMailSended && !isMailSendError && (
        <div className="form">
          <div className={`form-field ${!form.name && isFormError ? 'error' : ''}`}>
            <input
              type="text"
              name="name"
              placeholder={lang === 'ua' ? 'Ім’я' : 'Name'}
              value={form.name}
              onChange={handleInputChange}
              required
            />
            <div className="error-label">This field is required</div>
          </div>
          <div className={`form-field ${!form.phone && isFormError ? 'error' : ''}`}>
            <input
              type="text"
              name="phone"
              placeholder={lang === 'ua' ? 'Телефон' : 'Phone'}
              value={form.phone}
              onChange={handleInputChange}
              required
            />
            <div className="error-label">This field is required</div>
          </div>
          <div className={`form-field ${!form.email && isFormError ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder={lang === 'ua' ? 'Електронна пошта' : 'Email'}
              value={form.email}
              onChange={handleInputChange}
              required
            />
            <div className="error-label">This field is required</div>
          </div>
          <div className={`form-field ${!form.msg && isFormError ? 'error' : ''}`}>
            <textarea
              name="msg"
              placeholder={lang === 'ua' ? 'Повідомлення' : 'Message'}
              value={form.msg}
              onChange={handleInputChange}
              required
            />
            <div className="error-label">This field is required</div>
          </div>
          <button className={`btn ${formSendInProcess ? 'loading' : ''}`} onClick={sendMail}>
            <div className="loader line-scale-pulse-out">
              <div></div><div></div><div></div><div></div><div></div>
            </div>
            <Send style={{ marginRight: '8px' }} /> 
            <span>{lang === 'ua' ? 'Надіслати' : 'Send'}</span>
          </button>
        </div>
      )}

      {/* Success Message */}
      {isMailSended && (
        <div className="msg">
          <div className="icon"><span className="fas fa-laugh-beam"></span></div>
          <p className="title">
            {lang === 'ua'
              ? 'Повідомлення успішно надіслано.'
              : 'Message successfully sent.'}
          </p>
        </div>
      )}

      {/* Error Message */}
      {isMailSendError && (
        <div className="msg">
          <div className="icon"><span className="fas fa-sad-tear"></span></div>
          <p className="title">
            {lang === 'ua'
              ? 'Щось пішло не так. Перезавантажте сторінку і спробуйте ще раз.'
              : 'Something went wrong. Please reload the page and try again.'}
          </p>
        </div>
      )}
    </div>
  );
}
