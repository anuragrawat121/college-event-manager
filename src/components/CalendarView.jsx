import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export function CalendarView({ darkMode }) {
    // 1. State for the currently visible month (Defaults to Today)
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Events (We keep these for display)
    const events = [
        { id: 1, title: "Tech Workshop", date: 20, month: 9, type: "technical", color: "bg-blue-500" }, // Oct
        { id: 2, title: "Career Fair", date: 25, month: 9, type: "career", color: "bg-green-500" },     // Oct
        { id: 3, title: "Cultural Fest", date: 2, month: 10, type: "cultural", color: "bg-purple-500" },  // Nov
        { id: 4, title: "Hackathon", date: 10, month: 9, type: "technical", color: "bg-blue-500" },     // Oct
    ];

    // 2. Logic to change months
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // 3. Dynamic Calculations
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0=Sun, 1=Mon...
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentMonthIndex = currentDate.getMonth(); // 0-11

    // Render the grid cells
    const renderCalendarDays = () => {
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className={`h-32 border-b border-r ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50/50'}`}></div>);
        }

        // Actual Days
        for (let day = 1; day <= daysInMonth; day++) {
            // Filter events for THIS day and THIS month
            const dayEvents = events.filter(e => e.date === day && e.month === currentMonthIndex);

            // Check if it's "Today"
            const isToday =
                day === new Date().getDate() &&
                currentMonthIndex === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

            days.push(
                <div key={day} className={`h-32 border-b border-r p-2 transition-colors hover:bg-opacity-50 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                        <span className={`font-semibold text-sm ${isToday ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>
                            {day}
                        </span>
                    </div>

                    {/* Events on this day */}
                    <div className="mt-2 space-y-1">
                        {dayEvents.map((event, idx) => (
                            <div key={idx} className={`px-2 py-1 rounded text-xs font-medium text-white truncate cursor-pointer hover:opacity-80 ${event.color}`}>
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Calendar</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage event schedules and timelines</p>
                </div>

                {/* Month Navigation Controls */}
                <div className={`flex items-center gap-4 p-1 rounded-lg border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <button
                        onClick={prevMonth}
                        className={`p-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <span className={`font-bold px-4 min-w-[140px] text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {monthName}
                    </span>

                    <button
                        onClick={nextMonth}
                        className={`p-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                {/* Days Header */}
                <div className={`grid grid-cols-7 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className={`py-3 text-center text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
}