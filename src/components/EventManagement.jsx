import React, { useState, useMemo } from "react";
import { Plus, Edit, Trash2, Search, X, Filter, Lock, Eye } from "lucide-react"; // Added Eye icon

export function EventManagement({ darkMode, userRole, userName }) {
    const [events, setEvents] = useState([
        { id: 1, title: "Tech Workshop 2024", date: "2024-10-20", venue: "Auditorium A", organizer: "Event Organizer", status: "upcoming" },
        { id: 2, title: "Career Fair", date: "2024-10-25", venue: "Main Hall", organizer: "Prof. Johnson", status: "upcoming" },
        { id: 3, title: "Cultural Fest", date: "2024-11-02", venue: "Sports Complex", organizer: "Event Organizer", status: "upcoming" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({ title: "", date: "", venue: "", organizer: "", description: "", status: "upcoming" });

    // 1. Filter: Organizers only see THEIR events. Admins see ALL.
    const filteredEvents = events.filter((event) => {
        const matchesRole = userRole === 'admin' ? true : event.organizer === userName;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesRole && matchesSearch;
    });

    // Admin-Only Actions
    const handleDelete = (id) => {
        if (window.confirm("Delete event?")) setEvents(events.filter((e) => e.id !== id));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Save logic...
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>
                        {userRole === 'admin' ? "Event Management" : "My Assigned Events"}
                    </h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {userRole === 'admin' ? "Create and assign events" : "View details of your events"}
                    </p>
                </div>

                {/* 2. HIDE ADD BUTTON FOR ORGANIZER */}
                {userRole === 'admin' && (
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
                    >
                        <Plus size={18} /> Add Event
                    </button>
                )}
            </div>

            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                {/* Search Bar (Visible to both) */}
                <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-full md:w-72 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full text-sm" onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Title</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Venue</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className={`border-b last:border-0 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                                    <td className={`p-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{event.title}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.date}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.venue}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {/* 3. ADMIN sees Edit/Delete. ORGANIZER sees View Only. */}
                                            {userRole === 'admin' ? (
                                                <>
                                                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button>
                                                    <button onClick={() => handleDelete(event.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                                </>
                                            ) : (
                                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-sm">
                                                    <Eye size={16} /> View Details
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Code (Only accessible if Admin triggers it) */}
            {isDialogOpen && userRole === 'admin' && (
                // ... (Keep your existing Modal code here, strictly for Admins)
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl mb-4">Admin Event Creation</h2>
                        <p>Admin form goes here...</p>
                        <button onClick={() => setIsDialogOpen(false)} className="mt-4 text-red-500">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}