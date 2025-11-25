import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export function CalendarView({ darkMode, events }) { // <--- Accept 'events' prop
    const [currentDate, setCurrentDate] = useState(new Date());

    // Navigation Logic
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Render Cells
    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className={`h-32 border-b border-r ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50/50'}`}></div>);

        for (let day = 1; day <= daysInMonth; day++) {
            // *** DYNAMIC DATE MATCHING LOGIC ***
            // Event date string is "YYYY-MM-DD"
            // We construct the current cell's date string to compare
            const cellDateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            const dayEvents = events.filter(e => e.date === cellDateStr);

            const isToday = new Date().toDateString() === new Date(currentYear, currentMonthIndex, day).toDateString();

            days.push(
                <div key={day} className={`h-32 border-b border-r p-2 transition-colors hover:bg-opacity-50 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                        <span className={`font-semibold text-sm ${isToday ? 'bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full' : (darkMode ? 'text-gray-300' : 'text-gray-700')}`}>{day}</span>
                    </div>
                    <div className="mt-2 space-y-1">
                        {dayEvents.map((event, idx) => (
                            <div key={idx} className={`px-2 py-1 rounded text-xs font-medium text-white truncate cursor-pointer hover:opacity-80 ${event.color || 'bg-blue-500'}`}>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Calendar</h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage event schedules and timelines</p>
                </div>
                <div className={`flex items-center gap-4 p-1 rounded-lg border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <button onClick={prevMonth} className={`p-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}><ChevronLeft size={20} /></button>
                    <span className={`font-bold px-4 min-w-[140px] text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{monthName}</span>
                    <button onClick={nextMonth} className={`p-2 rounded-md transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}><ChevronRight size={20} /></button>
                </div>
            </div>
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`grid grid-cols-7 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className={`py-3 text-center text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7">{renderCalendarDays()}</div>
            </div>
        </div>
    );
}