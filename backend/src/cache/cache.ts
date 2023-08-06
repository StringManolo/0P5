import sqlite3 from 'sqlite3';
import path from 'path';

const currentDir = path.resolve(__dirname);
const parentDir = path.dirname(currentDir);
const DB_FILE_PATH = path.join(parentDir, '../../db/cache.db');


interface CacheRow {
  result: string;
  ttl: number;
}

async function initializeDatabase() {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database(DB_FILE_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        db.run(`
          CREATE TABLE IF NOT EXISTS cache (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            query TEXT,
            website TEXT,
            result JSON,
            ttl INTEGER,
            UNIQUE(query, website)
          )
        `, (createTableErr) => {
          if (createTableErr) {
            console.error('Error creating table:', createTableErr);
            reject(createTableErr);
          } else {
            resolve(db);
          }
        });
      }
    });
  });
}


export async function addToCache(query: string, website: string, result: any, ttlInSeconds: number) {
  try {
    const db = await initializeDatabase();
    const currentTime = Math.floor(Date.now() / 1000);
    const ttl = currentTime + ttlInSeconds;

    const insertQuery = 'INSERT INTO cache (query, website, result, ttl) VALUES (?, ?, ?, ?)';
    const params = [query, website, JSON.stringify(result), ttl];

    await new Promise<void>((resolve, reject) => {
      db.run(insertQuery, params, (err) => {
        if (err) {
          console.error('Error inserting into cache:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error adding data to cache:', error);
  }
}


export async function getFromCache(query: string, website: string, ttlInSeconds: number) {
  try {
    const db = await initializeDatabase();
    const currentTime = Math.floor(Date.now() / 1000);

    const result = await new Promise<any>((resolve, reject) => {
      db.get<CacheRow>('SELECT result, ttl FROM cache WHERE query = ? AND website = ?', [query, website], (err, row) => {
        if (err) {
          console.error('Error querying cache:', err);
          reject(err);
        } else if (row && row.ttl >= currentTime) {
          const data = JSON.parse(row.result);
          resolve(data);
        } else {
          resolve(null); // El registro no existe o ha expirado
        }
      });
    });

    if (result) {
      return result; // Devuelve el resultado en caché si es
    } else {
      return null; // Need to add the register to cache 
    }
  } catch (error) {
    console.error('Error getting data from cache:', error);
    return null;
  }
}

