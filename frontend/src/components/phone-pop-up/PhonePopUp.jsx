import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TelephoneFill, X } from 'react-bootstrap-icons';
import axios from 'axios';
import './PhonePopUp.less';

export default function PhonePopup() {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.phonePopupTexts);

  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setError('');
    setSuccess('');
    setPhone('');
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!name.trim()) {
      setError(texts.nameError ? texts.nameError[lang] : "Name is required");
      setSuccess('');
      return;
    }
    if (!phoneRegex.test(phone)) {
      setError(texts.error[lang]);
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/feedback-call', { name: name.trim(), phone });
      if (response.status === 200 && response.data.status === 'success') {
        setSuccess(texts.successMessage[lang]);
        setPhone('');
        setName('');
        setTimeout(() => setVisible(false), 3000);
      } else {
        setError(texts.error[lang]);
      }
    } catch (err) {
      setError(texts.error[lang]);
      console.error(err);
    }
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
      <div className="popup-content">
        <button
          className="popup-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        <h2 id="popupTitle" className="popup-title">
          <TelephoneFill className="icon-phone" /> {texts.title[lang]}
        </h2>
        <form onSubmit={handleSubmit} className="popup-form" noValidate>
          <input
            type="text"
            placeholder={texts.namePlaceholder ? texts.namePlaceholder[lang] : (lang === 'ua' ? 'Ім’я' : 'Name')}
            value={name}
            onChange={e => setName(e.target.value)}
            aria-invalid={!!error}
            required
            disabled={success !== ''}
          />
          <input
            type="tel"
            placeholder={texts.placeholder[lang]}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            aria-invalid={!!error}
            aria-describedby="phoneError"
            required
            disabled={success !== ''}
          />
          {error && <div id="phoneError" className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="btn-submit" disabled={success !== ''}>
            {texts.submitButton[lang]}
          </button>
        </form>
      </div>
    </div>
  );
}
