import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TelephoneFill, X } from 'react-bootstrap-icons';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import './PhonePopUp.less';

export default function PhonePopup() {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.phonePopupTexts);

  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 
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
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError(texts.error[lang]);
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true); 

    try {
      const response = await axios.post('/api/phone-number', { number: phone });
      if (response.status === 200 && response.data.status === 'success') {
        setSuccess(texts.successMessage[lang]);
        setError('');
        setPhone('');
        setTimeout(() => setVisible(false), 3000);
      } else {
        setError(texts.error[lang]);
        setSuccess('');
      }
    } catch (err) {
      setError(texts.error[lang]);
      setSuccess('');
      console.error(err);
    } finally {
      setLoading(false); 
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
          disabled={loading}
        >
          <X size={24} />
        </button>
        <h2 id="popupTitle" className="popup-title">
          <TelephoneFill className="icon-phone" /> {texts.title[lang]}
        </h2>
        <form onSubmit={handleSubmit} className="popup-form" noValidate>
          <input
            type="tel"
            placeholder={texts.placeholder[lang]}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            aria-invalid={!!error}
            aria-describedby="phoneError"
            required
            disabled={loading || !!success}
          />
          {error && <div id="phoneError" className="error-message" style={{ color: 'red' }}>{error}</div>}
          {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}
          <button type="submit" className="btn-submit" disabled={loading || !!success}>
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
