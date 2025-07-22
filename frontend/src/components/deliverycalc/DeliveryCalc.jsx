import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  GeoAlt,
  BoxSeam,
  ArrowRightCircle,
  Truck,
  ArrowDown,
  Telephone,
} from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';
import './DeliveryCalc.less';

export default function DeliveryCalc() {
  const lang = useSelector((state) => state.selectedLang);
  const texts = useSelector((state) => state.deliveryCalcTexts);

  const [modalVisible, setModalVisible] = useState(false);
  const [direction, setDirection] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carOption, setCarOption] = useState('separate');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!texts || !texts.title || !texts.title[lang]) {
    return null;
  }

  const openModal = () => {
    setModalVisible(true);
    localStorage.setItem('deliveryCalcModal', 'open');
  };

  const closeModal = () => {
    setModalVisible(false);
    setError('');
    setSuccess('');
    setLoading(false);
    localStorage.setItem('deliveryCalcModal', 'closed');
  };

  const validatePhone = (phone) => /^\+?\d{7,15}$/.test(phone.replace(/[\s()-]/g, ''));

  const validateDimensions = (dim) => {
    const val = parseFloat(dim);
    return !isNaN(val) && val > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!direction || !weight || !dimensions || !cargoType || !phoneNumber) {
      setError(texts.errors.fillAllFields[lang]);
      setSuccess('');
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError(texts.errors.invalidPhone?.[lang] || 'Invalid phone number');
      setSuccess('');
      return;
    }

    if (!validateDimensions(dimensions)) {
      setError(
        texts.errors.invalidDimensions?.[lang] ||
          'Enter the volume in cubic meters, for example: 5'
      );
      setSuccess('');
      return;
    }

    setError('');
    setLoading(true);

    const payload = {
      direction,
      weight: parseFloat(weight),
      dimension: parseFloat(dimensions),
      cargo_type: cargoType,
      car_option: carOption,
      phone_number: phoneNumber,
    };

    try {
      const response = await fetch('api/calc-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        setSuccess(texts.successMessage[lang]);
        setDirection('');
        setWeight('');
        setDimensions('');
        setCargoType('');
        setPhoneNumber('');
        setCarOption('separate');
      } else {
        setError(texts.errors.submitError[lang]);
      }
    } catch (err) {
      setError(`${texts.errors.submitError[lang]} (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="delivery-calc-block">
        <div className="text-block">
          <Truck className="icon" />
          <div>
            <h3>{texts.title[lang]}</h3>
            <p>{texts.description[lang]}</p>
          </div>
        </div>
        <div className="spacer" />
        <button
          className="btn btn-primary"
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={modalVisible}
          disabled={loading}
        >
          {texts.titleButton[lang]} <ArrowRightCircle className="btn-icon" />
        </button>
      </div>

      {modalVisible && (
        <div
          className="feedback-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
              disabled={loading}
            >
              &times;
            </button>
            <h2 id="modalTitle">{texts.title[lang]}</h2>
            <form onSubmit={handleSubmit} noValidate>
              <label>
                <GeoAlt className="icon" />
                <input
                  type="text"
                  placeholder={texts.placeholders.direction[lang]}
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
              <label>
                <BoxSeam className="icon" />
                <input
                  type="number"
                  placeholder={texts.placeholders.weight[lang]}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  min="0"
                  step="any"
                  disabled={loading}
                />
              </label>
              <label>
                <BoxSeam className="icon" />
                <input
                  type="number"
                  placeholder={texts.placeholders.dimensions[lang] + ' (cub.m)'}
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  required
                  min="0"
                  step="any"
                  disabled={loading}
                />
              </label>
              <label>
                <Telephone className="icon" />
                <input
                  type="tel"
                  placeholder={texts.placeholders.phoneNumber?.[lang] || 'Phone number'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
              <label className="custom-select-wrapper">
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    {texts.placeholders.cargoType[lang]}
                  </option>
                  {Object.entries(texts.cargoTypesOptions).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val[lang]}
                    </option>
                  ))}
                </select>
                <ArrowDown className="select-arrow" />
              </label>

              <fieldset className="car-option">
                <legend className="option-title">
                  {texts.carOptions.separate[lang]} / {texts.carOptions.additional[lang]}
                </legend>
                <div className="radio-group">
                  <label className="custom-radio-label">
                    <input
                      type="radio"
                      name="carOption"
                      value="separate"
                      checked={carOption === 'separate'}
                      onChange={(e) => setCarOption(e.target.value)}
                      disabled={loading}
                    />
                    <span className="custom-radio" />
                    {texts.carOptions.separate[lang]}
                  </label>
                  <label className="custom-radio-label">
                    <input
                      type="radio"
                      name="carOption"
                      value="additional"
                      checked={carOption === 'additional'}
                      onChange={(e) => setCarOption(e.target.value)}
                      disabled={loading}
                    />
                    <span className="custom-radio" />
                    {texts.carOptions.additional[lang]}
                  </label>
                </div>
              </fieldset>

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
      )}
    </>
  );
}
