import React, { useState } from "react";
import { QrCode, Search, CheckCircle, XCircle, ChevronDown } from "lucide-react";

export function Attendance({ darkMode }) {
    const [selectedEvent, setSelectedEvent] = useState("tech-workshop");

    // Mock Data
    const attendanceData = [
        { id: 1, name: "John Doe", rollNo: "CS101", email: "john@college.edu", status: "present", time: "10:05 AM" },
        { id: 2, name: "Jane Smith", rollNo: "CS102", email: "jane@college.edu", status: "present", time: "10:02 AM" },
        { id: 3, name: "Mike Johnson", rollNo: "CS103", email: "mike@college.edu", status: "absent", time: "-" },
        { id: 4, name: "Sarah Williams", rollNo: "CS104", email: "sarah@college.edu", status: "present", time: "10:08 AM" },
        { id: 5, name: "Tom Brown", rollNo: "CS105", email: "tom@college.edu", status: "present", time: "10:15 AM" },
    ];

    const stats = {
        total: 150,
        present: 130,
        absent: 20,
        percentage: 87,
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>
                        Attendance Management
                    </h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Track event attendance and check-ins
                    </p>
                </div>
                <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
                    <QrCode size={18} />
                    Generate QR Code
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Card */}
                <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Registered</p>
                    <h3 className={`text-3xl font-bold mt-2 ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>{stats.total}</h3>
                </div>

                {/* Present Card */}
                <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Present</p>
                    <h3 className="text-3xl font-bold mt-2 text-green-500">{stats.present}</h3>
                </div>

                {/* Absent Card */}
                <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Absent</p>
                    <h3 className="text-3xl font-bold mt-2 text-red-500">{stats.absent}</h3>
                </div>

                {/* Percentage Card */}
                <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Attendance %</p>
                    <h3 className={`text-3xl font-bold mt-2 ${darkMode ? "text-gray-100" : "text-[#111827]"}`}>{stats.percentage}%</h3>
                </div>
            </div>

            {/* Main Table Card */}
            <div className={`rounded-xl border shadow-sm ${darkMode ? "bg-[#1E293B] border-gray-700" : "bg-white border-gray-200"}`}>

                {/* Card Header / Toolbar */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <h3 className={`text-lg font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Attendance Records</h3>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Event Select */}
                        <div className="relative">
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className={`appearance-none w-full md:w-64 px-4 py-2 pr-8 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-[#0F172A] border-gray-600 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-700"
                                    }`}
                            >
                                <option value="tech-workshop">Tech Workshop 2024</option>
                                <option value="career-fair">Career Fair</option>
                                <option value="cultural-fest">Cultural Fest</option>
                            </select>
                            <ChevronDown className={`absolute right-3 top-3 pointer-events-none ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
                        </div>

                        {/* Search Input */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border w-full md:w-auto ${darkMode ? "bg-[#0F172A] border-gray-600" : "bg-gray-50 border-gray-300"
                            }`}>
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                className={`bg-transparent border-none outline-none w-full md:w-48 ${darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Name</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Roll No</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Check-in Time</th>
                                <th className={`p-4 font-medium text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((student) => (
                                <tr key={student.id} className={`border-b last:border-0 ${darkMode ? "border-gray-700 hover:bg-[#0F172A]" : "border-gray-100 hover:bg-gray-50"} transition-colors`}>
                                    <td className={`p-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{student.name}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{student.rollNo}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{student.email}</td>
                                    <td className={`p-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{student.time}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === "present"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                            }`}>
                                            {student.status === "present" ? <CheckCircle size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
                                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}