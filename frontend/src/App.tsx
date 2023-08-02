import React from 'react';
import './App.css';
import Search from './components/Search';
import Settings from './components/Settings';
import Title from './components/Title';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    alert(`Searching for ${query}`);
  }

  return (
    <div>
      <Title />
      <Settings /> 
      <Search onSearch={handleSearch}/>
    </div>
  )
}

export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/