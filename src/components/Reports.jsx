import React, { useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, TrendingUp, Users, Calendar, ChevronDown } from 'lucide-react';

export function Reports({ darkMode, userRole }) {
  const [selectedYear, setSelectedYear] = useState("2024");
  const isOrganizer = userRole === 'organizer';
  const eventCategoryData = [{ name: 'Technical', value: 35 }, { name: 'Cultural', value: 25 }, { name: 'Sports', value: 20 }, { name: 'Career', value: 15 }, { name: 'Other', value: 5 }];
  const monthlyData = [{ month: 'Jan', events: 4, students: 320 }, { month: 'Feb', events: 6, students: 480 }, { month: 'Mar', events: 8, students: 640 }, { month: 'Apr', events: 5, students: 400 }, { month: 'May', events: 7, students: 560 }, { month: 'Jun', events: 9, students: 720 }];
  const attendanceData = [{ event: 'Tech Workshop', attendance: 87 }, { event: 'Career Fair', attendance: 92 }, { event: 'Cultural Fest', attendance: 78 }, { event: 'Hackathon', attendance: 95 }, { event: 'Seminar', attendance: 85 }];
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const handleExport = () => { const headers = "Event,Attendance %\n"; const rows = attendanceData.map(d => `${d.event},${d.attendance}`).join("\n"); const csvContent = "data:text/csv;charset=utf-8," + headers + rows; const encodedUri = encodeURI(csvContent); const link = document.createElement("a"); link.setAttribute("href", encodedUri); link.setAttribute("download", "report.csv"); document.body.appendChild(link); link.click(); document.body.removeChild(link); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{isOrganizer ? 'Attendance Reports' : 'Analytics & Reports'}</h2><p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isOrganizer ? 'Track student participation' : 'View detailed statistics'}</p></div><div className="flex gap-3"><div className="relative"><select className={`appearance-none w-32 px-4 py-2 pr-8 rounded-lg border outline-none ${darkMode ? 'bg-[#0F172A] border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'}`}><option value="2024">2024</option><option value="2023">2023</option></select><ChevronDown className={`absolute right-3 top-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} /></div><button onClick={handleExport} className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2"><Download size={18} /> Export</button></div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {!isOrganizer && (<div className={`rounded-xl border shadow-sm p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Event Categories</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={eventCategoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">{eventCategoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>)}
        <div className={`rounded-xl border shadow-sm p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Attendance</h3><ResponsiveContainer width="100%" height={300}><RechartsBarChart data={attendanceData} layout="vertical"><XAxis type="number" /><YAxis dataKey="event" type="category" width={100} /><Tooltip /><Bar dataKey="attendance" fill="#3B82F6" /></RechartsBarChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}