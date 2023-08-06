const sqlite3 = require('sqlite3').verbose();

const DB_FILE_PATH = '../db/test.db';

function createDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_FILE_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
      } else {
        console.log('Database created successfully.');
        resolve(db);
      }
    });
  });
}

function createTable(db) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS test_table (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER
    )
  `;

  return new Promise((resolve, reject) => {
    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
        reject(err);
      } else {
        console.log('Table created successfully.');
        resolve();
      }
    });
  });
}

function insertData(db) {
  const insertQuery = 'INSERT INTO test_table (name, age) VALUES (?, ?)';
  const params = ['John Doe', 30];

  return new Promise((resolve, reject) => {
    db.run(insertQuery, params, (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        reject(err);
      } else {
        console.log('Data inserted successfully.');
        resolve();
      }
    });
  });
}

function queryData(db) {
  const query = 'SELECT * FROM test_table';

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error querying data:', err.message);
        reject(err);
      } else {
        console.log('Query result:', rows);
        resolve();
      }
    });
  });
}

async function main() {
  try {
    const db = await createDatabase();
    await createTable(db);
    await insertData(db);
    await queryData(db);
    db.close();
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();

