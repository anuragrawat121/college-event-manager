
import { query } from './Backend/db.js';

async function checkData() {
    console.log("Checking Users...");
    const users = await query("SELECT * FROM users WHERE role = 'organizer'");
    console.table(users.rows || users);

    console.log("\nChecking Events...");
    const events = await query("SELECT * FROM events");
    console.table(events.rows || events);

    console.log("\nChecking Registrations view data...");
    // Simulate the query used in server.js
    const sql = `
        SELECT r.id, r.student_name, r.status, e.title as event, e.organizer 
        FROM registrations r 
        LEFT JOIN events e ON r.event_id = e.id
    `;
    const regs = await query(sql);
    console.table(regs.rows || regs);
}

checkData();
