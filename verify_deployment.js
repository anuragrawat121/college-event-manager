
const API_URL = 'https://college-event-manager-1-9pj6.onrender.com';

async function testBackend() {
    console.log(`Testing Backend at: ${API_URL}`);
    try {
        const res = await fetch(`${API_URL}/events`);
        if (res.ok) {
            const data = await res.json();
            console.log("✅ Backend is Online!");
            console.log(`Found ${data.length} events.`);
        } else {
            console.error(`❌ Backend Error: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        console.error("❌ Connection Failed:", error.message);
    }
}

testBackend();
