import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Telephone, Person } from 'react-bootstrap-icons';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import './FeedbackModal.less';

export default function FeedbackModal({ visible, onClose }) {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.phonePopupTexts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 

  const validatePhone = (num) => {
    return /^\+?\d{7,15}$/.test(num.replace(/[\s()-]/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError(texts.nameError ? texts.nameError[lang] : (lang === 'en' ? "Name is required" : "Ім’я обов'язкове"));
      setSuccess('');
      return;
    }

    if (!validatePhone(phone)) {
      setError(texts.error[lang]);
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true); 

    try {
      const response = await axios.post('https://flask-app-production-9ac5.up.railway.app/feedback-call', {
        name: name.trim(),
        phone: phone.replace(/[\s()-]/g, ''),
      });

      if (response.status === 200 && response.data.status === 'success') {
        setSuccess(texts.successMessage[lang]);
        setName('');
        setPhone('');
        setTimeout(() => onClose(), 3000);
      } else {
        setError(texts.error[lang]);
      }
    } catch (err) {
      console.error(err);
      setError(texts.error[lang]);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} disabled={loading}>&times;</button>
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
              disabled={loading}
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
              disabled={loading}
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <Spinner
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="spinner-button"
              />
            ) : (
              texts.submitButton[lang]
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
