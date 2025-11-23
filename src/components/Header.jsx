import React from 'react';
import { Moon, Sun, LogOut, User as UserIcon, Bell } from 'lucide-react';

export default function Header({ darkMode, onToggleDarkMode, onLogout, userName, userRole }) {
  return (
    <header className={`h-16 px-8 flex items-center justify-between border-b transition-colors duration-200 ${
      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      
      {/* Left: Title or Breadcrumb */}
      <h2 className="text-lg font-semibold capitalize tracking-wide">
        {userRole} Portal
      </h2>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={onToggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications (Visual only) */}
        <button className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}>
          <Bell size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200/20">
          <div className="text-right hidden md:block">
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              {userName}
            </p>
            <p className="text-xs text-slate-500 capitalize">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <UserIcon size={20} />
          </div>
        </div>

      </div>
    </header>
  );
}