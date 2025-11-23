import React from 'react';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react';

export default function DashboardHome({ user }) {
    // Simple stats data
    const stats = [
        { label: 'Total Events', value: '12', icon: Calendar, color: 'bg-blue-500' },
        { label: 'Registrations', value: '85', icon: Users, color: 'bg-purple-500' },
        { label: 'Attended', value: '4', icon: CheckCircle, color: 'bg-green-500' },
        { label: 'Upcoming', value: '3', icon: Clock, color: 'bg-orange-500' },
    ];

    return (
        <div className="p-8">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Hello, {user.name} 👋</h1>
                <p className="text-slate-500 mt-1">Welcome to your {user.role} dashboard.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                            <div className={`p-4 rounded-xl ${stat.color} bg-opacity-10`}>
                                <Icon className={`w-8 h-8 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}