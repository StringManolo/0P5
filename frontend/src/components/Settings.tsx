import React, { useState } from 'react';
import './Settings.css';

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="settings-icon" onClick={toggle}>⚙️</div>
      <nav className={`settings-menu ${isOpen ? 'open' : ''}`}>Opcion 1 [checkbox]</nav>
    </>
  );
}

export default SettingsMenu;
