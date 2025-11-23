import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, X, Calendar, MapPin, User } from "lucide-react";

export function EventManagement({ darkMode }) {
    // Mock Data
    const [events, setEvents] = useState([
        { id: 1, title: "Tech Workshop 2024", date: "2024-10-20", venue: "Auditorium A", organizer: "Dr. Smith", status: "upcoming" },
        { id: 2, title: "Career Fair", date: "2024-10-25", venue: "Main Hall", organizer: "Prof. Johnson", status: "upcoming" },
        { id: 3, title: "Cultural Fest", date: "2024-11-02", venue: "Sports Complex", organizer: "Dr. Williams", status: "upcoming" },
        { id: 4, title: "Annual Seminar", date: "2024-09-15", venue: "Conference Room", organizer: "Dr. Brown", status: "completed" },
        { id: 5, title: "Hackathon", date: "2024-11-10", venue: "Computer Lab", organizer: "Prof. Davis", status: "upcoming" },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        venue: "",
        organizer: "",
        description: "",
        status: "upcoming"
    });

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData(event); // Pre-fill form
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            setEvents(events.filter((e) => e.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (editingEvent) {
            // Update existing
            setEvents(events.map(ev => ev.id === editingEvent.id ? { ...formData, id: editingEvent.id } : ev));
        } else {
            // Create new
            setEvents([...events, { ...formData, id: Date.now(), status: 'upcoming' }]);
        }
        setIsDialogOpen(false);
        setEditingEvent(null);
        setFormData({ title: "", date: "", venue: "", organizer: "", description: "", status: "upcoming" });
    };

    const getStatusColor = (status) => {
        return status === "upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>
                        Event Management
                    </h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Create and manage all college events
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingEvent(null);
                        setFormData({ title: "", date: "", venue: "", organizer: "", description: "", status: "upcoming" });
                        setIsDialogOpen(true);
                    }}
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    Add Event
                </button>
            </div>

            {/* Content Card */}
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>

                {/* Card Toolbar */}
                <div className={`p-4 border-b flex items-center justify-between ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <h3 className={`font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>All Events</h3>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className={`bg-transparent border-none outline-none w-48 text-sm ${darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Event Title</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Venue</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Organizer</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Status</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} className={`border-b last:border-0 ${darkMode ? "border-gray-700 hover:bg-[#0F172A]" : "border-gray-100 hover:bg-gray-50"} transition-colors`}>
                                    <td className={`p-4 font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{event.title}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.date}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.venue}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.organizer}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(event)} className={`p-2 rounded-lg hover:bg-gray-100 ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-500"}`}>
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(event.id)} className={`p-2 rounded-lg hover:bg-red-50 ${darkMode ? "text-red-400 hover:bg-red-900/20" : "text-red-500"}`}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Modal Overlay */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}>

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold">{editingEvent ? "Edit Event" : "Create New Event"}</h3>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {editingEvent ? "Update the event details below." : "Fill in the details to create a new event."}
                                </p>
                            </div>
                            <button onClick={() => setIsDialogOpen(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Event Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Venue</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={formData.venue}
                                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                            placeholder="Main Hall"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Organizer</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.organizer}
                                        onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                                        className={`w-full pl-10 pr-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                        placeholder="Organizer Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Description</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-white border-gray-300"}`}
                                    placeholder="Brief description..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsDialogOpen(false)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                                    {editingEvent ? "Update Event" : "Create Event"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}   