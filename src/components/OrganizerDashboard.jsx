import React from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle } from 'lucide-react';

export function OrganizerDashboard({ darkMode, userName, onNavigate, events }) {
    // Show all events to the organizer
    const myAssignedEvents = events;

    return (
        <div className="space-y-6">
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Welcome back, {userName}</h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>You have <strong>{myAssignedEvents.length}</strong> events assigned to you.</p>
            </div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>My Responsibilities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {myAssignedEvents.length > 0 ? (
                    myAssignedEvents.map((event) => (
                        <div key={event.id} className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                            <div className={`h-1.5 ${event.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>{event.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <Calendar size={14} /> {event.date}
                                            <span className="mx-1">•</span>
                                            <Clock size={14} /> {event.time || 'TBD'}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{event.status}</span>
                                </div>
                                <div className="flex items-center justify-between mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400" /><span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{event.venue}</span></div>
                                    <div className="flex items-center gap-2"><Users size={16} className="text-gray-400" /><span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>View List</span></div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button onClick={() => onNavigate('registrations')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition-colors">View Student List</button>
                                    {(event.status === 'active' || event.status === 'upcoming') && (<button onClick={() => onNavigate('attendance')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"><CheckCircle size={16} /> Mark Attendance</button>)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No events assigned to you yet.</p>
                )}
            </div>
        </div>
    );
}