
import { query } from './Backend/db.js';

async function seedRegistration() {
    console.log("🌱 Seeding Test Registration...");
    
    // 1. Get Event ID 1
    const events = await query("SELECT * FROM events WHERE title = 'Tech Workshop'");
    if (events.rows.length === 0) {
        console.error("❌ Event 'Tech Workshop' not found!");
        return;
    }
    const eventId = events.rows[0].id;

    // 2. Create Registration
    try {
        await query(
            "INSERT INTO registrations (event_id, student_name, student_email, status) VALUES ($1, $2, $3, $4)",
            [eventId, 'Test Student', 'test@student.edu', 'pending']
        );
        console.log("✅ Test Registration Created!");
    } catch (err) {
        console.error("❌ Failed to create registration:", err);
    }
}

seedRegistration();
