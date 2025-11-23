import React from 'react';
import { Calendar, Users, TrendingUp, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function AdminDashboard({ darkMode }) {
    // Stats Data
    const stats = [
        { title: 'Total Events', value: '48', icon: Calendar, change: '+12%', color: 'bg-blue-500' },
        { title: 'Upcoming Events', value: '12', icon: TrendingUp, change: '+5%', color: 'bg-green-500' },
        { title: 'Total Students', value: '1,234', icon: Users, change: '+18%', color: 'bg-purple-500' },
        { title: 'Attendance %', value: '87%', icon: BarChart, change: '+3%', color: 'bg-orange-500' },
    ];

    // Chart Data
    const eventData = [
        { month: 'Jan', events: 4, attendance: 320 },
        { month: 'Feb', events: 6, attendance: 480 },
        { month: 'Mar', events: 8, attendance: 640 },
        { month: 'Apr', events: 5, attendance: 400 },
        { month: 'May', events: 7, attendance: 560 },
        { month: 'Jun', events: 9, attendance: 720 },
    ];

    const upcomingEvents = [
        { title: 'Tech Workshop 2024', date: 'Oct 20, 2024', venue: 'Auditorium A', attendees: 150 },
        { title: 'Career Fair', date: 'Oct 25, 2024', venue: 'Main Hall', attendees: 300 },
        { title: 'Cultural Fest', date: 'Nov 02, 2024', venue: 'Sports Complex', attendees: 500 },
        { title: 'Hackathon', date: 'Nov 10, 2024', venue: 'Computer Lab', attendees: 80 },
    ];

    return (
        <div className="space-y-6">
            {/* 1. Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className={`rounded-xl shadow-sm border p-6 transition-colors ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
                                    <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{stat.value}</h3>
                                    <p className="text-green-500 text-sm mt-1 font-medium">{stat.change} from last month</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-xl shadow-lg shadow-gray-400/20`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className={`rounded-xl shadow-sm border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Event Participation</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={eventData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                            <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : '#FFFFFF', borderRadius: '8px', borderColor: darkMode ? '#374151' : '#E5E7EB', color: darkMode ? '#fff' : '#000' }} />
                            <Legend />
                            <Bar dataKey="events" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Events" />
                            <Bar dataKey="attendance" fill="#10B981" radius={[4, 4, 0, 0]} name="Attendees" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className={`rounded-xl shadow-sm border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-100'}`}>
                    <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Attendance Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={eventData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                            <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1E293B' : '#FFFFFF', borderRadius: '8px', borderColor: darkMode ? '#374151' : '#E5E7EB', color: darkMode ? '#fff' : '#000' }} />
                            <Legend />
                            <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Active Students" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. Upcoming Events Table */}
            <div className={`rounded-xl shadow-sm border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Upcoming Events</h3>
                <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${darkMode ? 'border-gray-700 hover:bg-[#0F172A]' : 'border-gray-100 hover:bg-slate-50'}`}>
                            <div>
                                <h4 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{event.title}</h4>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {event.date} • {event.venue}
                                </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                {event.attendees} Registered
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}