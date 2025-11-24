import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';

export default function Header({ darkMode, onToggleDarkMode, onLogout, onNavigate, userName, userRole }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`h-16 px-8 flex items-center justify-between border-b transition-colors duration-200 relative z-20 ${
      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      
      {/* Left: Page Title */}
      <h2 className="text-lg font-semibold capitalize tracking-wide">
        {userRole} Portal
      </h2>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={onToggleDarkMode}
          className={`p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className={`p-2 rounded-full transition-colors relative ${
            darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}>
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-3 pl-4 border-l transition-all ${
              darkMode ? 'border-slate-700 hover:opacity-80' : 'border-slate-200 hover:opacity-80'
            }`}
          >
            <div className="text-right hidden md:block">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {userName}
              </p>
              <p className="text-xs text-slate-500 capitalize">{userRole}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <span className="font-bold">{userName.charAt(0)}</span>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className={`absolute right-0 mt-3 w-56 rounded-xl shadow-2xl border py-2 ${
              darkMode ? 'bg-[#1E293B] border-gray-700 text-white' : 'bg-white border-gray-100 text-slate-800'
            }`}>
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-1">
                <p className="text-sm font-medium">Signed in as</p>
                <p className="text-sm font-bold truncate">{userName}</p>
              </div>

              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  onNavigate('settings'); // Navigate to Settings
                }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
              >
                <User size={16} /> My Profile
              </button>
              
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  onNavigate('settings');
                }}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
              >
                <Settings size={16} /> Settings
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}