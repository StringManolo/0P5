import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './Settings.css';


const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="settings-icon" onClick={toggle}>⚙️</div>
      <nav className={`settings-menu ${isOpen ? 'open' : ''}`}>
        <div>
          <span>Opcion 1</span>
          <input type="checkbox" />
        </div>
        <div>
          <span>Opcion 2</span>
          <input type="checkbox" />
        </div>
        <div>
          <span>Opcion 3</span>
          <input type="checkbox" />
        </div>
        <div>
          <span
            data-tooltip-id="longnames-tooltip"
            data-tooltip-content="OpcionConUnNombreDemasiadoLargo"
            data-tooltip-place="bottom"
          >
            OpcionConUnNombreDemasiadoLargo
          </span>
          <input type="checkbox" />
        </div>
        <div>
          <span>C</span>
          <input type="checkbox" />
        </div>
      </nav>
      <Tooltip id="longnames-tooltip" />
    </>
  );
}

export default SettingsMenu;
