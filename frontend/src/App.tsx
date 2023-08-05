import React from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import Settings, { CheckboxState } from './components/Settings';
import Title from './components/Title';
import SearchResults from './components/SearchResults';
import { BackendResult } from './types/types';


const App: React.FC = () => {
  const ENDPOINT_URL = "http://localhost:8443";
  const [settings, setSettings] = React.useState<CheckboxState>({
    wikipedia: true,
    ehn: true,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false
  });
  const [searchResults, setSearchResults] = React.useState<BackendResult[]>([]);


  const handleSearch = async (query: string) => {
    const options = Object.entries(settings)
    .filter(([key, value]) => value === true)
    .map(([key]) => `${key}=${(settings as any)[key]}`)
    .join('&');

    try {
      // alert(`${ENDPOINT_URL}/search?q=${query}&${options}`);
      const response = await axios.get<BackendResult[]>(`${ENDPOINT_URL}/search?q=${query}&${options}`);
      setSearchResults(response.data);
      // alert(`Respuesta:\n${JSON.stringify(response.data, null, 2)}`);
      // Pasar la data a nuevo componente / añadir router?
    } catch (error) {
      alert(error);
    }

    // alert(`Searching for ${query} with settings: ${JSON.stringify(settings)}`);
  }

  const handleSettingsChange = (newSettings: CheckboxState) => {
    alert(`Settings changed: ${JSON.stringify(newSettings)}`);
    setSettings(newSettings);
  }

  return (
    <div>
      <Title />
      <Settings onSettingsChange={handleSettingsChange} /> 
      <Search onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  )
}

export default App;

