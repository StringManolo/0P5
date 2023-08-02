import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './Settings.css';

interface CheckboxState {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  checkbox4: boolean;
  checkbox5: boolean;
}

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const toggleCheckbox = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const checkboxKey = event.currentTarget.dataset.checkbox as keyof CheckboxState;
    if (!checkboxKey) {
      return;
    }

    setCheckboxes({
      ...checkboxes,
      [checkboxKey]: !checkboxes[checkboxKey],
    });
  };


  return (
    <>
      <div className="settings-icon" onClick={toggle}>⚙️</div>
      <nav className={`settings-menu ${isOpen ? 'open' : 'close'}`}>
        <div className="settings-menu-title-wrapper">
          <div className="settings-menu-title">Settings</div>
          {/* Thus wrapper allows me to set font-size inside a flex container. */}
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox1">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 1"
            // data-tooltip-place="bottom" 
          >Opcion 1</span>
          <input type="checkbox" checked={checkboxes.checkbox1} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox2">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 2"
            // data-tooltip-place="bottom" 
          >Opcion 2</span>
          <input type="checkbox" checked={checkboxes.checkbox2} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox3">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 3"
            // data-tooltip-place="bottom" 
          >Opcion 3</span>
          <input type="checkbox" checked={checkboxes.checkbox3} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox4">
          <span
            data-tooltip-id="longnames-tooltip"
            data-tooltip-content="OpcionConUnNombreDemasiadoLargo"
            data-tooltip-place="bottom"
          >
            OpcionConUnNombreDemasiadoLargo
          </span>
          <input type="checkbox" checked={checkboxes.checkbox4} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox5">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="C"
            // data-tooltip-place="bottom" 
          >C</span>
          <input type="checkbox" checked={checkboxes.checkbox5} />
        </div>
      </nav>
      <Tooltip id="longnames-tooltip" />
    </>
  );
}

export default SettingsMenu;

