import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export function StudentDashboard({ darkMode }) {
    // Mock Data
    const upcomingEvents = [
        {
            id: 1,
            title: 'Tech Workshop 2024',
            date: 'October 20, 2024',
            time: '10:00 AM - 2:00 PM',
            venue: 'Auditorium A',
            category: 'Technical',
            seats: 150,
            registered: 120,
        },
        {
            id: 2,
            title: 'Career Fair',
            date: 'October 25, 2024',
            time: '9:00 AM - 5:00 PM',
            venue: 'Main Hall',
            category: 'Career',
            seats: 300,
            registered: 280,
        },
        {
            id: 3,
            title: 'Cultural Fest',
            date: 'November 2, 2024',
            time: '11:00 AM - 6:00 PM',
            venue: 'Sports Complex',
            category: 'Cultural',
            seats: 500,
            registered: 450,
        },
    ];

    const myEvents = [
        {
            id: 1,
            title: 'Annual Seminar',
            date: 'September 15, 2024',
            status: 'Attended',
        },
        {
            id: 2,
            title: 'Tech Workshop 2024',
            date: 'October 20, 2024',
            status: 'Registered',
        },
    ];

    // Helpers for colors
    const getCategoryColor = (category) => {
        const colors = {
            Technical: 'bg-blue-500',
            Career: 'bg-green-500',
            Cultural: 'bg-purple-500',
        };
        return colors[category] || 'bg-gray-500';
    };

    const getStatusColor = (status) => {
        return status === 'Attended' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div>
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>
                    Upcoming Events
                </h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Browse and register for campus activities
                </p>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                    <div
                        key={event.id}
                        className={`rounded-xl border overflow-hidden transition-shadow hover:shadow-md ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'
                            }`}
                    >
                        {/* Colored Top Bar */}
                        <div className={`h-2 ${getCategoryColor(event.category)}`}></div>

                        <div className="p-6 space-y-4">
                            {/* Title & Category */}
                            <div className="flex items-start justify-between mb-2">
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>
                                    {event.title}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getCategoryColor(event.category)}`}>
                                    {event.category}
                                </span>
                            </div>

                            {/* Event Details */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-gray-400" />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users size={16} className="text-gray-400" />
                                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {event.registered} / {event.seats} registered
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <div
                                    className="bg-[#3B82F6] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(event.registered / event.seats) * 100}%` }}
                                ></div>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-2 rounded-lg transition-colors shadow-sm">
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* My Events Section */}
            <div className={`rounded-xl border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    My Registered Events
                </h3>

                <div className="space-y-3">
                    {myEvents.map((event) => (
                        <div
                            key={event.id}
                            className={`flex items-center justify-between p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-[#0F172A]' : 'border-gray-100 bg-slate-50'
                                }`}
                        >
                            <div>
                                <h4 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{event.title}</h4>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{event.date}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status)}`}>
                                {event.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}