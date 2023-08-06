"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromCache = exports.addToCache = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const currentDir = path_1.default.resolve(__dirname);
const parentDir = path_1.default.dirname(currentDir);
const DB_FILE_PATH = path_1.default.join(parentDir, '../../db/cache.db');
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const db = new sqlite3_1.default.Database(DB_FILE_PATH, (err) => {
                if (err) {
                    console.error('Error opening database:', err);
                    reject(err);
                }
                else {
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
                        }
                        else {
                            resolve(db);
                        }
                    });
                }
            });
        });
    });
}
function addToCache(query, website, result, ttlInSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield initializeDatabase();
            const currentTime = Math.floor(Date.now() / 1000);
            const ttl = currentTime + ttlInSeconds;
            const insertQuery = 'INSERT INTO cache (query, website, result, ttl) VALUES (?, ?, ?, ?)';
            const params = [query, website, JSON.stringify(result), ttl];
            yield new Promise((resolve, reject) => {
                db.run(insertQuery, params, (err) => {
                    if (err) {
                        console.error('Error inserting into cache:', err);
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        catch (error) {
            console.error('Error adding data to cache:', error);
        }
    });
}
exports.addToCache = addToCache;
function getFromCache(query, website, ttlInSeconds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = yield initializeDatabase();
            const currentTime = Math.floor(Date.now() / 1000);
            const result = yield new Promise((resolve, reject) => {
                db.get('SELECT result, ttl FROM cache WHERE query = ? AND website = ?', [query, website], (err, row) => {
                    if (err) {
                        console.error('Error querying cache:', err);
                        reject(err);
                    }
                    else if (row && row.ttl >= currentTime) {
                        const data = JSON.parse(row.result);
                        resolve(data);
                    }
                    else {
                        resolve(null); // El registro no existe o ha expirado
                    }
                });
            });
            if (result) {
                return result; // Devuelve el resultado en caché si es
            }
            else {
                return null; // Need to add the register to cache 
            }
        }
        catch (error) {
            console.error('Error getting data from cache:', error);
            return null;
        }
    });
}
exports.getFromCache = getFromCache;
