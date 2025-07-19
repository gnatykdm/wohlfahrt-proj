import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GeoAlt, BoxSeam, ArrowRightCircle, Truck, ArrowDown } from 'react-bootstrap-icons';
import './DeliveryCalc.less';

export default function DeliveryCalc() {
  const lang = useSelector(state => state.selectedLang);
  const texts = useSelector(state => state.deliveryCalcTexts);

  const [modalVisible, setModalVisible] = useState(false);
  const [direction, setDirection] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [isSeparateCar, setIsSeparateCar] = useState('separate');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!direction || !weight || !dimensions || !cargoType) {
      setError(texts.errors.fillAllFields[lang]);
      setSuccess('');
      return;
    }
    setError('');
    try {
      // TODO: відправка даних

      setSuccess(texts.successMessage[lang]);
      setDirection('');
      setWeight('');
      setDimensions('');
      setCargoType('');
      setIsSeparateCar('separate');
    } catch {
      setError(texts.errors.submitError[lang]);
      setSuccess('');
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
        <button
          className="btn btn-primary"
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={modalVisible}
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
          <div
            className="feedback-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
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
                />
              </label>
              <label>
                <BoxSeam className="icon" />
                <input
                  type="text"
                  placeholder={texts.placeholders.dimensions[lang]}
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  required
                />
              </label>
              <label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  required
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
                <ArrowDown /> 
              </label>
              <fieldset className="car-option">
                <legend>{texts.carOptions.separate[lang]} / {texts.carOptions.additional[lang]}</legend>
                <label>
                  <input
                    type="radio"
                    name="carOption"
                    value="separate"
                    checked={isSeparateCar === 'separate'}
                    onChange={(e) => setIsSeparateCar(e.target.value)}
                  />
                  <span className="custom-radio" />
                  {texts.carOptions.separate[lang]}
                </label>
                <label>
                  <input
                    type="radio"
                    name="carOption"
                    value="additional"
                    checked={isSeparateCar === 'additional'}
                    onChange={(e) => setIsSeparateCar(e.target.value)}
                  />
                  <span className="custom-radio" />
                  {texts.carOptions.additional[lang]}
                </label>
              </fieldset>
              {error && <div className="form-error">{error}</div>}
              {success && <div className="form-success">{success}</div>}
              <button type="submit" className="submit-btn">
                {texts.submitButton[lang]}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
