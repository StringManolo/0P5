import React from 'react';
import DOMPurify from 'dompurify';
import './SearchResults.css';
import { BackendResult } from '../types/types';

interface SearchResultsProps {
  results: BackendResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const groupResultsByDomain = (results: BackendResult[]): { [key: string]: BackendResult[] } => {
    const groupedResults: { [key: string]: BackendResult[] } = {};

    results.forEach(result => {
      const domain = extractDomain(result.url);
      if (!groupedResults[domain]) {
        groupedResults[domain] = [];
      }
      groupedResults[domain].push(result);
    });

    return groupedResults;
  };

  const extractDomain = (url: string): string => {
    const match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/?\n]+)/);
    return match ? match[1] : 'Unknown';
  };

  const groupedResults = groupResultsByDomain(results);


  return (
    <div className="search-results">
      {Object.entries(groupedResults).map(([domain, resultGroup], groupIndex) => (
        <div className="group" key={groupIndex}>
          {resultGroup.length > 0 && (
            <>
              <h2 className="domain">{domain}</h2>
              <ul className="result-list">
                {resultGroup.map((result, index) => (
                  <li key={index}>
                    <a className="link" href={result.url}>{DOMPurify.sanitize(result.title)}</a>
                    <p className="description">{DOMPurify.sanitize(result.description)}</p>
                    <p className="author">Author: {DOMPurify.sanitize(result.author)}</p>
                    <p className="date">Date: {DOMPurify.sanitize(result.date)}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );

};

export default SearchResults;

