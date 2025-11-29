import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 1. Connect/Create Database
const dbPath = path.resolve(__dirname, 'college.db');
const db = new (sqlite3.verbose().Database)(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeTables();
    }
});

// 2. Create Tables
function initializeTables() {
    db.serialize(() => {

        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('admin', 'organizer', 'student')) NOT NULL,
      status TEXT DEFAULT 'active'
    )`);

        // Events Table
        db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      venue TEXT,
      organizer TEXT,
      description TEXT,
      status TEXT DEFAULT 'upcoming'
    )`);

        // Registrations Table
        db.run(`CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      student_name TEXT,
      student_email TEXT,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY(event_id) REFERENCES events(id)
    )`);

        console.log('Tables initialized.');
        seedData();
    });
}

// 3. Seed Initial Data
function seedData() {
    db.get("SELECT count(*) as count FROM users", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding initial data...");

            // Admin User
            db.run(`INSERT INTO users (name, email, password, role) VALUES 
        ('Admin User', 'admin@college.edu', 'admin123', 'admin')`);

            // Organizer
            db.run(`INSERT INTO users (name, email, password, role) VALUES 
        ('Event Organizer', 'organizer@college.edu', 'org123', 'organizer')`);

            // Student
            db.run(`INSERT INTO users (name, email, password, role) VALUES 
        ('Anurag', 'anurag@student.edu', 'student123', 'student')`);

            // Sample Event (Updated to 2025 so it shows on Calendar)
            db.run(`INSERT INTO events (title, date, time, venue, organizer, description, status) VALUES 
        ('Tech Workshop', '2025-11-20', '10:00 AM', 'Auditorium A', 'Event Organizer', 'Learn React', 'upcoming')`);

            console.log("Data seeded.");
        }
    });
}

// --- API ROUTES ---

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({ id: row.id, name: row.name, role: row.role, email: row.email });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Get Events
app.get('/events', (req, res) => {
    db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add Event
app.post('/events', (req, res) => {
    const { title, date, time, venue, organizer, description, status } = req.body;
    const sql = `INSERT INTO events (title, date, time, venue, organizer, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [title, date, time, venue, organizer, description, status], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, ...req.body });
    });
});

// Get Users
app.get('/users', (req, res) => {
    db.all("SELECT id, name, email, role, status FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Register for Event
app.post('/registrations', (req, res) => {
    const { event_id, student_name, student_email, status } = req.body;
    const sql = `INSERT INTO registrations (event_id, student_name, student_email, status) VALUES (?, ?, ?, ?)`;
    db.run(sql, [event_id, student_name, student_email, status], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, ...req.body });
    });
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
