import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { query } from './db.js';

const app = express();
// Allow Render to set the port, or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*' // Allow all for now, or specify Vercel domain later
}));
app.use(bodyParser.json());

// Note: Table initialization is now handled by `migrate_neon.js` (for prod) 
// or manually. For local sqlite, we assume tables exist or we can init them if needed.
// But keeping it simple for migration plan.

// --- API ROUTES ---

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            res.json({ id: row.id, name: row.name, role: row.role, email: row.email });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Events
app.get('/events', async (req, res) => {
    try {
        const result = await query("SELECT * FROM events");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Event
app.post('/events', async (req, res) => {
    const { title, date, time, venue, organizer, description, status } = req.body;
    try {
        // Use RETURNING * for Postgres compatibility to get ID
        const result = await query(
            `INSERT INTO events (title, date, time, venue, organizer, description, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [title, date, time, venue, organizer, description, status]
        );
        // Handle response based on what the adapter returns
        const newId = result.rows.length > 0 ? result.rows[0].id : result.lastID;
        res.json({ id: newId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Users
app.get('/users', async (req, res) => {
    try {
        const result = await query("SELECT id, name, email, role, status FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Registrations (with Event Titles)
app.get('/registrations', async (req, res) => {
    const sql = `
        SELECT r.id, r.student_name as student, r.student_email as email, r.status, e.title as event, e.organizer 
        FROM registrations r 
        LEFT JOIN events e ON r.event_id = e.id
    `;
    try {
        const result = await query(sql);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register for Event
app.post('/registrations', async (req, res) => {
    const { event_id, student_name, student_email, status } = req.body;
    try {
        const result = await query(
            `INSERT INTO registrations (event_id, student_name, student_email, status) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [event_id, student_name, student_email, status]
        );
         const newId = result.rows.length > 0 ? result.rows[0].id : result.lastID;
        res.json({ id: newId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
