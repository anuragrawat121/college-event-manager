import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, X, Filter, Eye, Calendar, MapPin, User } from "lucide-react";

export function EventManagement({ darkMode, userRole, userName, events, setEvents }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [formData, setFormData] = useState({ title: "", date: "", venue: "", organizer: "", description: "", status: "upcoming" });

    const filteredEvents = events.filter((event) => {
        const matchesRole = userRole === 'admin' ? true : event.organizer === userName;
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || event.status === statusFilter;
        return matchesRole && matchesSearch && matchesStatus;
    });

    const handleDelete = (id) => { if (window.confirm("Delete event?")) setEvents(events.filter((e) => e.id !== id)); };
    const handleEdit = (event) => { setSelectedEvent(event); setFormData(event); setIsDialogOpen(true); };
    const handleSave = (e) => {
        e.preventDefault();
        if (selectedEvent) { setEvents(events.map(ev => ev.id === selectedEvent.id ? { ...formData, id: selectedEvent.id } : ev)); }
        else { const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"]; setEvents([...events, { ...formData, id: Date.now(), organizer: userName, status: 'upcoming', color: colors[Math.floor(Math.random() * colors.length)] }]); }
        setIsDialogOpen(false);
    };
    const handleViewDetails = (event) => { setSelectedEvent(event); setIsViewOpen(true); };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div><h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>{userRole === 'admin' ? "Event Management" : "My Assigned Events"}</h2><p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{userRole === 'admin' ? "Create and assign events" : "View details of events assigned to you"}</p></div>
                {userRole === 'admin' && <button onClick={() => { setSelectedEvent(null); setFormData({ title: "", date: "", venue: "", organizer: userName, description: "", status: "upcoming" }); setIsDialogOpen(true); }} className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"><Plus size={18} /> Add Event</button>}
            </div>
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                <div className={`p-4 border-b flex flex-col md:flex-row items-center justify-between gap-4 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-full md:w-72 ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-gray-50 border-gray-200"}`}><Search size={18} className="text-gray-400" /><input type="text" placeholder="Search..." className={`bg-transparent border-none outline-none w-full text-sm ${darkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"}`} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-gray-50 border-gray-200"}`}><Filter size={18} className="text-gray-400" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={`bg-transparent border-none outline-none text-sm cursor-pointer ${darkMode ? "text-white" : "text-gray-800"}`}><option value="all" className={darkMode ? "bg-slate-800" : ""}>All Status</option><option value="upcoming" className={darkMode ? "bg-slate-800" : ""}>Upcoming</option><option value="completed" className={darkMode ? "bg-slate-800" : ""}>Completed</option></select></div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead><tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}><th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Title</th><th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date</th><th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Venue</th><th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Status</th><th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Action</th></tr></thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className={`border-b last:border-0 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                                    <td className={`p-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{event.title}</td><td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.date}</td><td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{event.venue}</td>
                                    <td className="p-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{event.status}</span></td>
                                    <td className="p-4"><div className="flex gap-2">{userRole === 'admin' ? (<><button onClick={() => handleEdit(event)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button><button onClick={() => handleDelete(event.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></>) : (<button onClick={() => handleViewDetails(event)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-2 text-sm transition-colors"><Eye size={14} /> View</button>)}</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Admin Modal */}
            {isDialogOpen && userRole === 'admin' && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"><div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">{selectedEvent ? "Edit Event" : "Add Event"}</h3><button onClick={() => setIsDialogOpen(false)}><X size={20} /></button></div><form onSubmit={handleSave} className="space-y-4"><div><label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Title</label><input className={`w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div><div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Date</label><input type="date" className={`w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} /></div><div><label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Venue</label><input className={`w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} /></div></div><div><label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Organizer</label><input className={`w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} value={formData.organizer} onChange={e => setFormData({ ...formData, organizer: e.target.value })} /></div><div><label className="text-xs font-bold uppercase text-gray-500 mb-1 block">Description</label><textarea className={`w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-600 text-white' : 'bg-white border-gray-300 text-slate-900'}`} rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} /></div><button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">Save Event</button></form></div></div>)}
            {/* Organizer View Modal */}
            {isViewOpen && selectedEvent && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"><div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 relative ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}><button onClick={() => setIsViewOpen(false)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button><h3 className="text-xl font-bold mb-1">{selectedEvent.title}</h3><span className="inline-block px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 mb-6 capitalize">{selectedEvent.status}</span><div className="space-y-4"><p><span className="font-bold text-gray-500 uppercase text-xs block">Date</span> {selectedEvent.date}</p><p><span className="font-bold text-gray-500 uppercase text-xs block">Venue</span> {selectedEvent.venue}</p><p><span className="font-bold text-gray-500 uppercase text-xs block">Organizer</span> {selectedEvent.organizer}</p><div className="pt-4 border-t border-gray-100 dark:border-gray-700"><p className="font-bold text-gray-500 uppercase text-xs block mb-1">Description</p><p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{selectedEvent.description || "No description provided."}</p></div></div></div></div>)}
        </div>
    );
}