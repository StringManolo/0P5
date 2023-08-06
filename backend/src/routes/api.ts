import { Request, Response } from 'express';
import { getFromCache, addToCache } from '../cache/cache'; //sqlite3
import foro_elhacker_net from '../../data_sources/foro_elhacker_net';
import scrapeWikipedia from '../../data_sources/wikipedia'; 

interface SearchResult {
  author: string;
  description: string;
  url: string;
  title: string;
  date: string;
}

export function APIDocumentation(request: Request, response: Response) {
  response.status(200).json({
    message: 'API Documentation',
    version: '1.0.0',
    routes: {
      '/': 'API Documentation',
      '/search/:query': 'Search the query'
    },
    links: {
      'api': 'http://localhost:8443/api',
      'search': 'http://localhost:8443/search/:query'
    },
  });
}

export async function Search (request: Request, response: Response) {
  // const searchPattern = request?.params?.q;            // uses /search/xss
  const searchPattern = request?.query?.q                 // uses /search?q=xss
  let searchString = '';
  if (!searchPattern) {
    response.status(401).send({ error: "Missing search argument" });
    return;
  } else {
    searchString = searchPattern.toString();
  }

  let ehnSearchResults: SearchResult[] = [];
  let wikipediaSearchResults: SearchResult[] = [];


  if (request?.query?.ehn) {
    try {
      const ehnCache = await getFromCache(searchString, 'ehn', 60 * 60 * 24 * 7); // 1 week
      if (ehnCache) {
        ehnSearchResults = ehnCache;
        console.log(`ehn results extracted from cache`);
      } else {
        ehnSearchResults = await foro_elhacker_net(searchString) ?? [];
        if (ehnSearchResults.length > 0) {
          await addToCache(searchString, 'ehn', ehnSearchResults, 60 * 60 * 24 * 7); 
        }
      }
    } catch (error) {
      ehnSearchResults = [];
    }
  }

  if (request?.query?.wikipedia) {
    try {
      const wikipediaCache = await getFromCache(searchString, 'wikipedia', 60 * 60 * 24 * 7); // 1 week
      if (wikipediaCache) {
        wikipediaSearchResults = wikipediaCache;
        console.log(`wikipedia results extracted from cache`);
      } else {
        wikipediaSearchResults = await scrapeWikipedia(searchString) ?? [];
        if (wikipediaSearchResults.length > 0) {
          await addToCache(searchString, 'wikipedia', wikipediaSearchResults, 60 * 60 * 24 * 7); 
        }
      }
    } catch (error) {
      wikipediaSearchResults = [];
    }
  }

  const results: SearchResult[] = ehnSearchResults.concat(wikipediaSearchResults);
  response.status(200).json(results);
  return;
}


