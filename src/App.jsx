import { useState } from 'react';
// Pages & Components
import Login from './pages/login'; // Ensure Capital 'L' if filename is Login.jsx
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { Attendance } from './components/Attendance';
import { EventManagement } from './components/Eventmanagement'; // <--- FIXED IMPORT (Capital 'M')
import { Reports } from './components/Reports'; // Ensure Reports is imported
import { Feedback } from './components/Feedback'; // Ensure Feedback is imported
import PlaceholderPage from './pages/PlaceholderPage';
import { UserManagement } from './components/UserManagement';
import { Registrations } from './components/Registrations';
import { Notifications } from './components/Notifications';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // Handle Login
  const handleLogin = (userData) => {
    setUserRole(userData.role);
    setUserName(userData.name);
    setIsLoggedIn(true);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 1. Show Login if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // 2. Decide which content to show
  const renderContent = () => {
    // --- Student Logic ---
    if (userRole === 'student') {
      switch (activeScreen) {
        case 'dashboard':
          return <StudentDashboard darkMode={darkMode} />;
        case 'feedback':
          return <Feedback darkMode={darkMode} />;
        default:
          return <StudentDashboard darkMode={darkMode} />;
      }
    }

    // --- Admin/Organizer Logic ---
    switch (activeScreen) {
      case 'dashboard':
        return <AdminDashboard darkMode={darkMode} />;
      case 'events':
        return <EventManagement darkMode={darkMode} />;
      case 'attendance':
        return <Attendance darkMode={darkMode} />;
      case 'reports':
        return <Reports darkMode={darkMode} />;
      case 'feedback':
        return <Feedback darkMode={darkMode} />;
      case 'users':
        return <UserManagement darkMode={darkMode} />;
      case 'registrations':
        return <Registrations darkMode={darkMode} />;

      case 'notifications':
        return <Notifications darkMode={darkMode} />;

      default:
        return <AdminDashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F7F8FA]'}`}>

      {/* Left Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
      />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          userName={userName}
          userRole={userRole}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}