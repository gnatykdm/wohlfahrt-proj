import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Send } from 'react-bootstrap-icons';
import axios from 'axios';
import { Spinner, Alert } from 'react-bootstrap';
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
      setIsMailSended(false);
      setIsMailSendError(false);
      return;
    }

    setIsFormError(false);
    setFormSendInProcess(true);
    setIsMailSendError(false);
    setIsMailSended(false);

    try {
      const response = await axios.post('https://flask-app-production-9ac5.up.railway.app/message', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 && response.data.status === 'success') {
        setIsMailSended(true);
        setForm({ name: '', email: '', phone: '', msg: '' });
      } else {
        throw new Error('Server responded with error');
      }
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
      <div className="contact-info-static">
        <h2>{contactsInfo.title?.[lang] || (lang === 'ua' ? 'Контакти' : 'Contacts')}</h2>
      </div>

      <div className="form">
        <div className={`form-field ${!form.name && isFormError ? 'error' : ''}`}>
          <input
            type="text"
            name="name"
            placeholder={lang === 'ua' ? 'Ім’я' : 'Name'}
            value={form.name}
            onChange={handleInputChange}
            disabled={formSendInProcess}
          />
          <div className="error-label">{lang === 'ua' ? 'Обов’язкове поле' : 'Required field'}</div>
        </div>

        <div className={`form-field ${!form.phone && isFormError ? 'error' : ''}`}>
          <input
            type="text"
            name="phone"
            placeholder={lang === 'ua' ? 'Телефон' : 'Phone'}
            value={form.phone}
            onChange={handleInputChange}
            disabled={formSendInProcess}
          />
          <div className="error-label">{lang === 'ua' ? 'Обов’язкове поле' : 'Required field'}</div>
        </div>

        <div className={`form-field ${!form.email && isFormError ? 'error' : ''}`}>
          <input
            type="email"
            name="email"
            placeholder={lang === 'ua' ? 'Електронна пошта' : 'Email'}
            value={form.email}
            onChange={handleInputChange}
            disabled={formSendInProcess}
          />
          <div className="error-label">{lang === 'ua' ? 'Обов’язкове поле' : 'Required field'}</div>
        </div>

        <div className={`form-field ${!form.msg && isFormError ? 'error' : ''}`}>
          <textarea
            name="msg"
            placeholder={lang === 'ua' ? 'Повідомлення' : 'Message'}
            value={form.msg}
            onChange={handleInputChange}
            disabled={formSendInProcess}
          />
          <div className="error-label">{lang === 'ua' ? 'Обов’язкове поле' : 'Required field'}</div>
        </div>

        <button
          className="btn btn-primary"
          onClick={sendMail}
          disabled={formSendInProcess}
          type="button"
        >
          {formSendInProcess ? (
            <>
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="visually-hidden">{lang === 'ua' ? 'Відправлення...' : 'Sending...'}</span>
            </>
          ) : (
            <>
              <Send style={{ marginRight: 8 }} />
              <span>{lang === 'ua' ? 'Надіслати' : 'Send'}</span>
            </>
          )}
        </button>

        {isMailSended && (
          <Alert variant="success" className="mt-3 mb-0">
            {lang === 'ua'
              ? 'Повідомлення успішно надіслано.'
              : 'Message successfully sent.'}
          </Alert>
        )}

        {isMailSendError && (
          <Alert variant="danger" className="mt-3 mb-0">
            {lang === 'ua'
              ? 'Щось пішло не так. Перезавантажте сторінку і спробуйте ще раз.'
              : 'Something went wrong. Please reload the page and try again.'}
          </Alert>
        )}
      </div>
    </div>
  );
}
