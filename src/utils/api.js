const API_URL = 'http://localhost:5000';

export const api = {
    // 1. Get all events from Database
    getEvents: async () => {
        try {
            const res = await fetch(`${API_URL}/events`);
            return await res.json();
        } catch (error) {
            console.error("API Error:", error);
            return []; // Return empty array on error so app doesn't crash
        }
    },

    // 2. Add a new event to Database
    addEvent: async (eventData) => {
        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });
        return res.json();
    },

    // 3. Get all users (for Admin User Management)
    getUsers: async () => {
        const res = await fetch(`${API_URL}/users`);
        return res.json();
    },

    // 4. Login Check
    login: async (email, password) => {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    // 5. Register Student for Event
    registerForEvent: async (registrationData) => {
        const res = await fetch(`${API_URL}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registrationData),
        });
        return res.json();
    }
};