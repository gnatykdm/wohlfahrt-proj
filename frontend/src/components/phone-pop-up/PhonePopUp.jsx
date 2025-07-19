import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TelephoneFill, X } from 'react-bootstrap-icons';
import './PhonePopUp.less';

export default function PhonePopup() {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.phonePopupTexts);

  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setVisible(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      setError(texts.error[lang]);
      return;
    }
    setError('');
    alert(texts.successMessage[lang]);
    setVisible(false);
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
            type="tel"
            placeholder={texts.placeholder[lang]}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            aria-invalid={!!error}
            aria-describedby="phoneError"
            required
          />
          {error && <div id="phoneError" className="error-message">{error}</div>}
          <button type="submit" className="btn-submit">
            {texts.submitButton[lang]}
          </button>
        </form>
      </div>
    </div>
  );
}
