import React, { useState } from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <div className="search-container">
      <div className="search-fakeoutline">
        <input type="text" value={query} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}

export default Search;
