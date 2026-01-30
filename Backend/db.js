import sqlite3 from 'sqlite3';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;

// Environment Configuration
const isProduction = !!process.env.DATABASE_URL;

let db;
let query;

if (isProduction) {
    // --- POSTGRES (Production/Neon) ---
    console.log("🔌 Connecting to Postgres (Neon)...");
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Required for Neon
    });

    query = async (text, params = []) => {
        const res = await pool.query(text, params);
        return res; // Returns { rows: [], rowCount: 0 }
    };

} else {
    // --- SQLITE (Local Development) ---
    console.log("💾 Connecting to Local SQLite...");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dbPath = path.resolve(__dirname, 'college.db');

    const sqliteDb = new (sqlite3.verbose().Database)(dbPath);

    // Helper to Convert Postgres Syntax ($1, $2) to SQLite Syntax (?, ?)
    const normalizeQuery = (text) => {
        let index = 1;
        return text.replace(/\$\d+/g, () => '?');
    };

    query = (text, params = []) => {
        return new Promise((resolve, reject) => {
            const sql = normalizeQuery(text);

            // Determine query type to behave like Postgres Driver
            if (sql.trim().toUpperCase().startsWith('SELECT') || sql.trim().toUpperCase().includes('RETURNING')) {
                // READ logic
                // Note: SQLite doesn't support RETURNING natively in older versions, 
                // but we will handle INSERTs specifically if needed. 
                // For this simple app, we might need a workaround for "returning id".
                
                sqliteDb.all(sql, params, (err, rows) => {
                    if (err) return reject(err);
                    resolve({ rows: rows || [], rowCount: rows ? rows.length : 0 });
                });
            } else {
                // WRITE logic
                sqliteDb.run(sql, params, function (err) {
                    if (err) return reject(err);
                    // Simulate Postgres response
                    resolve({ rows: [], rowCount: this.changes, lastID: this.lastID });
                });
            }
        });
    };
}

export { query, isProduction };
