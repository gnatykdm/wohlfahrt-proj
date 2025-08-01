import React, { useState } from "react";
import { Telephone } from "react-bootstrap-icons";

import FeedbackModal from "../../components/feedbackmodal/FeedBackModal";

import './FloatingPhoneButton.less';

const FloatingPhoneButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
    localStorage.setItem('deliveryCalcModal', 'open');
  };

  const handleClose = () => {
    setModalVisible(false);
    localStorage.setItem('deliveryCalcModal', 'closed');
  };

  return (
    <>
      <button 
        type="button" 
        className="floating-phone-btn" 
        aria-label="Contact Us"
        onClick={handleClick}
      >
        <Telephone size={24} />
      </button>

      <FeedbackModal visible={modalVisible} onClose={handleClose} />
    </>
  );
};

export default FloatingPhoneButton;
