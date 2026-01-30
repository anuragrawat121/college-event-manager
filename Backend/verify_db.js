import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'college.db');

const db = new (sqlite3.verbose().Database)(dbPath);

console.log("Checking database...");

db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Users found:", rows.length);
        console.log(JSON.stringify(rows, null, 2));
    }
    db.close();
});
