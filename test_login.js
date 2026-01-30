
const API_URL = 'http://localhost:5000';

async function testLogin(email, password) {
    console.log(`Testing login for ${email}...`);
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        if (res.ok) {
            const data = await res.json();
            console.log("✅ Login Successful:", data);
        } else {
            console.error("❌ Login Failed:", res.status, res.statusText);
            const text = await res.text();
            console.error("Response:", text);
        }
    } catch (error) {
        console.error("❌ Connection Error:", error.message);
    }
}

// Test with default credentials
testLogin('admin@college.edu', 'admin123');
testLogin('organizer@college.edu', 'org123');
testLogin('anurag@student.edu', 'student123');
testLogin('anurag@student.edu', 'wrongpass'); // Should fail
