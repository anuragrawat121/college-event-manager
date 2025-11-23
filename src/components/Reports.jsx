import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, TrendingUp, Users, Calendar, ChevronDown } from 'lucide-react';

export function Reports({ darkMode }) {
  // Mock Data
  const eventCategoryData = [
    { name: 'Technical', value: 35 },
    { name: 'Cultural', value: 25 },
    { name: 'Sports', value: 20 },
    { name: 'Career', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const monthlyData = [
    { month: 'Jan', events: 4, students: 320 },
    { month: 'Feb', events: 6, students: 480 },
    { month: 'Mar', events: 8, students: 640 },
    { month: 'Apr', events: 5, students: 400 },
    { month: 'May', events: 7, students: 560 },
    { month: 'Jun', events: 9, students: 720 },
  ];

  const attendanceData = [
    { event: 'Tech Workshop', attendance: 87 },
    { event: 'Career Fair', attendance: 92 },
    { event: 'Cultural Fest', attendance: 78 },
    { event: 'Hackathon', attendance: 95 },
    { event: 'Seminar', attendance: 85 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Analytics & Reports</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View detailed statistics and insights</p>
        </div>
        
        <div className="flex gap-3">
          {/* Custom Select */}
          <div className="relative">
            <select 
              className={`appearance-none w-32 px-4 py-2 pr-8 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                darkMode ? 'bg-[#0F172A] border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <ChevronDown className={`absolute right-3 top-3 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
          </div>

          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Events', value: '48', change: '+12% from last year', icon: Calendar, color: 'bg-blue-500' },
          { label: 'Total Participants', value: '3,120', change: '+18% from last year', icon: Users, color: 'bg-green-500' },
          { label: 'Avg Attendance', value: '87%', change: '+3% from last year', icon: TrendingUp, color: 'bg-purple-500' },
          { label: 'Satisfaction', value: '4.5', change: '+0.3 from last year', icon: TrendingUp, color: 'bg-orange-500' },
        ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                    <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{stat.value}</h3>
                    <p className="text-green-500 text-sm mt-1 font-medium">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            );
        })}
      </div>

      {/* Middle Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className={`rounded-xl border shadow-sm p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Event Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={eventCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {eventCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1E293B' : '#FFFFFF', 
                  border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontal Bar Chart */}
        <div className={`rounded-xl border shadow-sm p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Attendance Rate by Event</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={attendanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
              <XAxis type="number" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <YAxis dataKey="event" type="category" stroke={darkMode ? '#9CA3AF' : '#6B7280'} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1E293B' : '#FFFFFF', 
                  border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="attendance" fill="#3B82F6" radius={[0, 8, 8, 0]} name="Attendance %" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Line Chart */}
      <div className={`rounded-xl border shadow-sm p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="month" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
            <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#1E293B' : '#FFFFFF', 
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="events" stroke="#3B82F6" strokeWidth={3} name="Events" />
            <Line type="monotone" dataKey="students" stroke="#10B981" strokeWidth={3} name="Students" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}