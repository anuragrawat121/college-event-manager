import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';

export function CalendarView({ darkMode, events }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className={`h-32 border-b border-r ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50/50'}`}></div>);
        for (let day = 1; day <= daysInMonth; day++) {
            const cellDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === cellDateStr);
            days.push(<div key={day} className={`h-32 border-b border-r p-2 hover:bg-opacity-50 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-100 hover:bg-gray-50'}`}><span className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day}</span><div className="mt-2 space-y-1">{dayEvents.map((event, idx) => (<div key={idx} className={`px-2 py-1 rounded text-xs text-white truncate ${event.color || 'bg-blue-500'}`}>{event.title}</div>))}</div></div>);
        }
        return days;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center"><div><h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Calendar</h2></div><div className={`flex items-center gap-4 p-1 rounded-lg border ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><button onClick={prevMonth}><ChevronLeft /></button><span>{monthName}</span><button onClick={nextMonth}><ChevronRight /></button></div></div>
            <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><div className="grid grid-cols-7 border-b">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="py-3 text-center">{d}</div>)}</div><div className="grid grid-cols-7">{renderCalendarDays()}</div></div>
        </div>
    );
}