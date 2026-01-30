import pg from 'pg';

const { Pool } = pg;

// This script is for initializing the NEON (Postgres) Database
// It should be run manually once: node Backend/migrate_neon.js

if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL environment variable is mising.");
    console.log("Usage: set DATABASE_URL=... && node Backend/migrate_neon.js");
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    console.log("🚀 Starting Migration to Neon...");
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Users Table
        console.log("Creating users table...");
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT CHECK(role IN ('admin', 'organizer', 'student')) NOT NULL,
                status TEXT DEFAULT 'active'
            );
        `);

        // 2. Events Table
        console.log("Creating events table...");
        await client.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT,
                venue TEXT,
                organizer TEXT,
                description TEXT,
                status TEXT DEFAULT 'upcoming'
            );
        `);

        // 3. Registrations Table
        console.log("Creating registrations table...");
        await client.query(`
            CREATE TABLE IF NOT EXISTS registrations (
                id SERIAL PRIMARY KEY,
                event_id INTEGER REFERENCES events(id),
                student_name TEXT,
                student_email TEXT,
                status TEXT DEFAULT 'pending'
            );
        `);

        // 4. Seed Data (Only if empty)
        const checkUsers = await client.query("SELECT count(*) FROM users");
        if (parseInt(checkUsers.rows[0].count) === 0) {
            console.log("🌱 Seeding initial data...");
            
            await client.query(`
                INSERT INTO users (name, email, password, role) VALUES 
                ('Admin User', 'admin@college.edu', 'admin123', 'admin'),
                ('Event Organizer', 'organizer@college.edu', 'org123', 'organizer'),
                ('Student User', 'anurag@student.edu', 'student123', 'student');
            `);

            await client.query(`
                INSERT INTO events (title, date, time, venue, organizer, description, status) VALUES 
                ('Tech Workshop', '2025-11-20', '10:00 AM', 'Auditorium A', 'Event Organizer', 'Learn React', 'upcoming');
            `);
        } else {
             console.log("Data already exists, skipping seed.");
        }

        await client.query('COMMIT');
        console.log("✅ Migration & Seeding Complete!");
    } catch (e) {
        await client.query('ROLLBACK');
        console.error("❌ Migration Failed:", e);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
