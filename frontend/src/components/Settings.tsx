import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './Settings.css';

export interface CheckboxState {
  wikipedia: boolean;
  ehn: boolean;
  ddg: boolean;
  checkbox4: boolean;
  checkbox5: boolean;
  checkbox6: boolean;
  checkbox7: boolean;
  checkbox8: boolean;
  checkbox9: boolean;
  checkbox10: boolean;
}

interface SettingsProps {
  onSettingsChange: (settings: CheckboxState) => void;
  endpoint: string;
  onChangeEndpoint: (newEndpoint: string) => void;
}

const SettingsMenu: React.FC<SettingsProps> = ({ onSettingsChange, endpoint, onChangeEndpoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    wikipedia: true,
    ehn: true,
    ddg: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkbox9: false,
    checkbox10: false
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

    const updateCheckboxes = {
      ...checkboxes,
      [checkboxKey]: !checkboxes[checkboxKey],
    }

    setCheckboxes(updateCheckboxes);
    onSettingsChange(updateCheckboxes);
  };

  const handleEndpointInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpoint = event.target.value;
    onChangeEndpoint(newEndpoint);
  };

  return (
    <>
      <div className="settings-icon" onClick={toggle}>⚙️</div>
      <nav className={`settings-menu ${isOpen ? 'open' : 'close'}`}>
        <div className="settings-menu-title-wrapper">
          <div className="settings-menu-title">Settings</div>
          {/* Thus wrapper allows me to set font-size inside a flex container. */}
        </div>
        <div className="settings-menu-endpoint">
          <input
            type="text"
            placeholder="endpoint"
            value={endpoint}
            onChange={handleEndpointInputChange}
          />
          <button onClick={() => onChangeEndpoint(endpoint)}>Change Endpoint</button>
        </div>
        <div onClick={toggleCheckbox} data-checkbox="wikipedia">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 1"
            // data-tooltip-place="bottom" 
          >wikipedia.org</span>
          <input type="checkbox" checked={checkboxes.wikipedia} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="ehn">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 2"
            // data-tooltip-place="bottom" 
          >foro.elhacker.net</span>
          <input type="checkbox" checked={checkboxes.ehn} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="ddg">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="Opcion 3"
            // data-tooltip-place="bottom" 
          >duckduckgo.com</span>
          <input type="checkbox" checked={checkboxes.ddg} />
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
        <div onClick={toggleCheckbox} data-checkbox="checkbox6">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="D"
            // data-tooltip-place="bottom" 
          >D</span>
          <input type="checkbox" checked={checkboxes.checkbox6} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox7">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="E"
            // data-tooltip-place="bottom" 
          >E</span>
          <input type="checkbox" checked={checkboxes.checkbox7} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox8">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="F"
            // data-tooltip-place="bottom"
          >F</span>
          <input type="checkbox" checked={checkboxes.checkbox8} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox9">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="G"
            // data-tooltip-place="bottom" 
          >G</span>
          <input type="checkbox" checked={checkboxes.checkbox9} />
        </div>
        <div onClick={toggleCheckbox} data-checkbox="checkbox10">
          <span
            // data-tooltip-id="longnames-tooltip"
            // data-tooltip-content="H"
            // data-tooltip-place="bottom" 
          >H</span>
          <input type="checkbox" checked={checkboxes.checkbox10} />
        </div>
      </nav>
      <Tooltip id="longnames-tooltip" />
    </>
  );
}

export default SettingsMenu;

