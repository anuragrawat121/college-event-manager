
import { query } from './Backend/db.js';

async function checkData() {
    console.log("--- DEBUG DATA CHECK ---");

    // 1. Check Organizer User
    const users = await query("SELECT id, name, email, role FROM users WHERE role = 'organizer'");
    console.log("Organizer Users:", JSON.stringify(users.rows || users, null, 2));

    // 2. Check Events
    const events = await query("SELECT id, title, organizer FROM events");
    console.log("Events:", JSON.stringify(events.rows || events, null, 2));

    // 3. Check Registrations
    const regs = await query("SELECT * FROM registrations");
    console.log("Registrations (Raw):", JSON.stringify(regs.rows || regs, null, 2));

    // 4. Check Joined View (what frontend gets)
    const sql = `
        SELECT r.id, r.student_name, r.status, e.title as event, e.organizer 
        FROM registrations r 
        LEFT JOIN events e ON r.event_id = e.id
    `;
    const joined = await query(sql);
    console.log("Registrations (Joined View):", JSON.stringify(joined.rows || joined, null, 2));
}

checkData();
