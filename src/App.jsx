import { useState, useEffect } from 'react';
// Import the API helper
import { api } from './utils/api';

// Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PlaceholderPage from './pages/PlaceholderPage';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { Attendance } from './components/Attendance';
import { EventManagement } from './components/EventManagement';
import { Reports } from './components/Reports';
import { Feedback } from './components/Feedback';
import { UserManagement } from './components/UserManagement';
import { Registrations } from './components/Registrations';
import { Notifications } from './components/Notifications';
import { Settings } from './components/Settings';
import { CalendarView } from './components/CalendarView';
import { Profile } from './components/Profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- 1. GLOBAL STATE (Starts Empty) ---
  const [globalEvents, setGlobalEvents] = useState([]);
  const [globalRegistrations, setGlobalRegistrations] = useState([]);
  const [globalNotifications, setGlobalNotifications] = useState([]);

  // --- 2. FETCH DATA ON LOAD ---
  useEffect(() => {
    if (isLoggedIn) {
      // Fetch Events from Backend
      api.getEvents()
        .then(data => {
          console.log("Events loaded from DB:", data);
          // Add UI properties if missing (like color)
          const formattedEvents = data.map(e => ({
            ...e,
            color: e.color || 'bg-blue-500'
          }));
          setGlobalEvents(formattedEvents);
        })
        .catch(err => console.error("Failed to load events:", err));

      // In a real app, we'd also fetch registrations here
      // api.getRegistrations().then(setGlobalRegistrations);
    }
  }, [isLoggedIn]); // Re-run when user logs in

  const addNotification = (title, message, type = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, date: 'Just now', read: false };
    setGlobalNotifications([newNotif, ...globalNotifications]);
  };

  const handleLogin = (userData) => {
    setUserRole(userData.role);
    setUserName(userData.name);
    setIsLoggedIn(true);
    setActiveScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    setActiveScreen('dashboard');
    setGlobalEvents([]); // Clear data
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
    setSidebarOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // --- Render Logic ---
  if (showForgotPassword) return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  if (!isLoggedIn) return <Login onLogin={handleLogin} onForgotPassword={() => setShowForgotPassword(true)} />;

  const renderContent = () => {
    const commonProps = { darkMode, userRole, userName };
    const regProps = { registrations: globalRegistrations, setRegistrations: setGlobalRegistrations, addNotification };

    if (userRole === 'student') {
      switch (activeScreen) {
        case 'dashboard': return <StudentDashboard {...commonProps} events={globalEvents} registrations={globalRegistrations} setRegistrations={setGlobalRegistrations} />;
        case 'calendar': return <CalendarView darkMode={darkMode} events={globalEvents} />;
        case 'feedback': return <Feedback darkMode={darkMode} userRole={userRole} />;
        case 'notifications': return <Notifications darkMode={darkMode} userRole={userRole} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
        case 'settings': return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
        case 'profile': return <Profile darkMode={darkMode} user={{ name: userName, role: userRole }} />;
        default: return <StudentDashboard {...commonProps} events={globalEvents} registrations={globalRegistrations} setRegistrations={setGlobalRegistrations} />;
      }
    }

    if (userRole === 'organizer') {
      switch (activeScreen) {
        case 'dashboard': return <OrganizerDashboard {...commonProps} onNavigate={handleNavigate} />;
        case 'events': return <EventManagement {...commonProps} events={globalEvents} setEvents={setGlobalEvents} />;
        case 'attendance': return <Attendance {...commonProps} events={globalEvents} />;
        case 'reports': return <Reports {...commonProps} />;
        case 'calendar': return <CalendarView darkMode={darkMode} events={globalEvents} />;
        case 'registrations': return <Registrations {...commonProps} {...regProps} />;
        case 'notifications': return <Notifications {...commonProps} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
        case 'feedback': return <Feedback {...commonProps} />;
        case 'settings': return <Settings {...commonProps} toggleDarkMode={toggleDarkMode} />;
        case 'profile': return <Profile {...commonProps} user={{ name: userName, role: userRole }} />;
        default: return <OrganizerDashboard {...commonProps} onNavigate={handleNavigate} />;
      }
    }

    switch (activeScreen) {
      case 'dashboard': return <AdminDashboard {...commonProps} />;
      case 'calendar': return <CalendarView darkMode={darkMode} events={globalEvents} />;
      case 'events': return <EventManagement {...commonProps} events={globalEvents} setEvents={setGlobalEvents} />;
      case 'attendance': return <Attendance {...commonProps} events={globalEvents} />;
      case 'reports': return <Reports {...commonProps} />;
      case 'feedback': return <Feedback {...commonProps} />;
      case 'users': return <UserManagement {...commonProps} />;
      case 'registrations': return <Registrations {...commonProps} {...regProps} />;
      case 'notifications': return <Notifications {...commonProps} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
      case 'settings': return <Settings {...commonProps} toggleDarkMode={toggleDarkMode} />;
      case 'profile': return <Profile {...commonProps} user={{ name: userName, role: userRole }} />;
      default: return <AdminDashboard {...commonProps} />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F7F8FA]'}`}>
      <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} userRole={userRole} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 w-full">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} onLogout={handleLogout} onNavigate={handleNavigate} userName={userName} userRole={userRole} onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
}