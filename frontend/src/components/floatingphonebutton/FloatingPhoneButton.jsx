import React from "react";
import { Telephone } from "react-bootstrap-icons";
import './FloatingPhoneButton.less';

const FloatingPhoneButton = () => {
  return (
    <a href="tel:+380634076931" className="floating-phone-btn" aria-label="Call Us">
      <Telephone size={24} />
    </a>
  );
};

export default FloatingPhoneButton;
