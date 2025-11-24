import React, { useState } from 'react';
import { Bell, Send, Trash2, Check, AlertCircle, Info } from 'lucide-react';

// 1. Accept 'userRole' as a prop
export function Notifications({ darkMode, userRole }) {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Event Cancelled', message: 'The Outdoor Sports meet is cancelled due to rain.', type: 'alert', date: '2 mins ago', read: false },
        { id: 2, title: 'Venue Update', message: 'Tech Workshop moved to Auditorium B.', type: 'info', date: '1 hour ago', read: true },
        { id: 3, title: 'Welcome!', message: 'Welcome to the new College Event Portal.', type: 'success', date: '1 day ago', read: true },
    ]);

    const [newNotif, setNewNotif] = useState({ title: '', message: '', type: 'info' });

    const handleSend = (e) => {
        e.preventDefault();
        const notif = {
            id: Date.now(),
            ...newNotif,
            date: 'Just now',
            read: false
        };
        setNotifications([notif, ...notifications]);
        setNewNotif({ title: '', message: '', type: 'info' });
    };

    const handleDelete = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Check if user is allowed to send (Admin/Organizer only)
    const canSend = userRole === 'admin' || userRole === 'organizer';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Notifications</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {canSend ? 'Manage system alerts and announcements' : 'View latest college updates'}
                    </p>
                </div>
                <button onClick={markAllRead} className={`text-sm px-3 py-1.5 rounded-lg border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                    Mark all as read
                </button>
            </div>

            <div className={`grid grid-cols-1 ${canSend ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6`}>

                {/* 2. Only show this form if canSend is true */}
                {canSend && (
                    <div className={`lg:col-span-1 rounded-xl border p-6 h-fit ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                        <h3 className={`font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                            <Send size={18} /> Send Announcement
                        </h3>
                        <form onSubmit={handleSend} className="space-y-4">
                            {/* Form Inputs (Same as before) */}
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Title</label>
                                <input
                                    type="text" required value={newNotif.title}
                                    onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    placeholder="e.g. Exam Schedule"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Type</label>
                                <select
                                    value={newNotif.type} onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                >
                                    <option value="info">Information</option>
                                    <option value="alert">Alert / Urgent</option>
                                    <option value="success">Success</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block text-gray-500">Message</label>
                                <textarea
                                    required rows="3" value={newNotif.message}
                                    onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-white" : "bg-white border-gray-300"}`}
                                    placeholder="Type your message here..."
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                                Send Notification
                            </button>
                        </form>
                    </div>
                )}

                {/* List Area - Spans full width if student, else 2 cols */}
                <div className={`${canSend ? 'lg:col-span-2' : 'lg:col-span-1'} space-y-4`}>
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'} ${!notif.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                            <div className={`p-2 rounded-full shrink-0 ${notif.type === 'alert' ? 'bg-red-100 text-red-600' :
                                    notif.type === 'success' ? 'bg-green-100 text-green-600' :
                                        'bg-blue-100 text-blue-600'
                                }`}>
                                {notif.type === 'alert' ? <AlertCircle size={20} /> : <Bell size={20} />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{notif.title}</h4>
                                    <span className="text-xs text-gray-500">{notif.date}</span>
                                </div>
                                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{notif.message}</p>
                            </div>
                            {/* Only Admins can delete */}
                            {canSend && (
                                <button onClick={() => handleDelete(notif.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}