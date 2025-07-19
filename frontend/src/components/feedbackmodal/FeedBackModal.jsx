import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Telephone, Person } from 'react-bootstrap-icons';
import './FeedbackModal.less';

export default function FeedbackModal({ visible, onClose }) {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.phonePopupTexts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePhone = (num) => {
    return /^\+?\d{7,15}$/.test(num.replace(/[\s()-]/g, ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError(texts.error[lang]);
      setSuccess('');
      return;
    }
    setError('');
    setSuccess(texts.successMessage[lang]);
    setName('');
    setPhone('');
  };

  if (!visible) return null;

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{texts.titleModal[lang]}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            <Person className="icon" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Your Name' : 'Ваше ім’я'}
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <Telephone className="icon" />
            <input
              type="tel"
              placeholder={texts.placeholder[lang]}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <button type="submit" className="submit-btn">{texts.submitButton[lang]}</button>
        </form>
      </div>
    </div>
  );
}
