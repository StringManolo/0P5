import React from 'react';
import { BackendResult } from '../types/types';

interface SearchResultsProps {
  results: BackendResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <a href={result.url}>{result.title}</a>
            <p>{result.description}</p>
            <p>Author: {result.author}</p>
            <p>Date: {result.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
