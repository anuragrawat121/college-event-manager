import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Bell, User, LogOut, Settings, ChevronDown, CheckCircle, AlertCircle, Info, Menu } from 'lucide-react';

export default function Header({ darkMode, onToggleDarkMode, onLogout, onNavigate, userName, userRole, onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // State for Red Dot badge
  const [hasUnread, setHasUnread] = useState(true);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Ensure userName is a string to prevent crashes
  const safeUserName = userName || "User";
  const userInitial = safeUserName.charAt(0).toUpperCase();

  const recentNotifications = [
    { id: 1, title: 'Event Cancelled', time: '2 mins ago', type: 'alert' },
    { id: 2, title: 'New Registration', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'System Update', time: '5 hours ago', type: 'info' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotifIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertCircle size={16} className="text-red-500" />;
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <header className={`h-16 px-4 md:px-8 flex items-center justify-between border-b transition-colors duration-200 relative z-20 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>

      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-3 md:gap-0">
        <button onClick={onMenuClick} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden text-slate-500 dark:text-slate-400">
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold capitalize tracking-wide">{userRole} Portal</h2>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={onToggleDarkMode} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'}`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setIsNotifOpen(!isNotifOpen); setHasUnread(false); }}
            className={`p-2 rounded-full transition-colors relative ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'} ${isNotifOpen ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
          >
            <Bell size={20} />
            {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>}
          </button>

          {isNotifOpen && (
            <div className={`absolute right-0 mt-3 w-80 rounded-xl shadow-2xl border py-2 overflow-hidden z-50 ${darkMode ? 'bg-[#1E293B] border-gray-700 text-white' : 'bg-white border-gray-100 text-slate-800'}`}>
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-sm">Notifications</h3><span className="text-xs text-blue-500 font-medium">3 New</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {recentNotifications.map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer`}>
                    <div className={`p-1.5 rounded-full shrink-0 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>{getNotifIcon(notif.type)}</div>
                    <div><p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{notif.title}</p><p className="text-xs text-gray-500 mt-0.5">{notif.time}</p></div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setIsNotifOpen(false); onNavigate('notifications'); }} className="w-full text-center py-2.5 text-sm text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium">View all</button>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-1 md:ml-2" ref={profileRef}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center gap-3 pl-2 md:pl-4 md:border-l transition-all ${darkMode ? 'border-slate-700 hover:opacity-80' : 'border-slate-200 hover:opacity-80'}`}>
            <div className="text-right hidden md:block"><p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>{safeUserName}</p><p className="text-xs text-slate-500 capitalize">{userRole}</p></div>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg"><span className="font-bold">{userInitial}</span></div>
            <ChevronDown size={16} className={`hidden md:block text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className={`absolute right-0 mt-3 w-56 rounded-xl shadow-2xl border py-2 z-50 ${darkMode ? 'bg-[#1E293B] border-gray-700 text-white' : 'bg-white border-gray-100 text-slate-800'}`}>
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-1 md:hidden"><p className="text-sm font-medium">Signed in as</p><p className="text-sm font-bold truncate">{safeUserName}</p></div>

              <button onClick={() => { setIsProfileOpen(false); onNavigate('profile'); }} className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"><User size={16} /> My Profile</button>
              <button onClick={() => { setIsProfileOpen(false); onNavigate('settings'); }} className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"><Settings size={16} /> Settings</button>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <button onClick={onLogout} className="w-full text-left px-4 py-2.5 flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"><LogOut size={16} /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}