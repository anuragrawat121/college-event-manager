import { useState } from 'react';

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
  // --- Authentication State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  // --- UI State ---
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- GLOBAL DATA (Shared State) ---
  // 1. Events List
  const [globalEvents, setGlobalEvents] = useState([
    { id: 1, title: "Tech Workshop", date: "2025-11-20", venue: "Auditorium A", organizer: "Event Organizer", status: "upcoming", color: "bg-blue-500", time: "10:00 AM" },
    { id: 2, title: "Career Fair", date: "2025-11-25", venue: "Main Hall", organizer: "Prof. Johnson", status: "upcoming", color: "bg-green-500", time: "11:00 AM" },
    { id: 3, title: "Cultural Fest", date: "2025-12-02", venue: "Sports Complex", organizer: "Event Organizer", status: "upcoming", color: "bg-purple-500", time: "06:00 PM" },
    { id: 4, title: "Annual Seminar", date: "2025-09-15", venue: "Conf Room", organizer: "Dr. Brown", status: "completed", color: "bg-orange-500", time: "09:00 AM" },
  ]);

  // 2. Registrations List
  const [globalRegistrations, setGlobalRegistrations] = useState([
    { id: 101, student: 'John Doe', eventId: 1, event: 'Tech Workshop', organizer: 'Event Organizer', date: '2025-11-20', status: 'pending', email: 'john@student.edu' },
    { id: 102, student: 'Jane Smith', eventId: 2, event: 'Career Fair', organizer: 'Prof. Johnson', date: '2025-11-25', status: 'approved', email: 'jane@student.edu' },
    { id: 103, student: 'Mike Ross', eventId: 1, event: 'Tech Workshop', organizer: 'Event Organizer', date: '2025-11-20', status: 'rejected', email: 'mike@student.edu' },
  ]);

  // 3. Notifications List
  const [globalNotifications, setGlobalNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Welcome to the new College Event Portal.', type: 'success', date: '1 day ago', read: true },
  ]);

  // Helper to add notifications from anywhere
  const addNotification = (title, message, type = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, date: 'Just now', read: false };
    setGlobalNotifications([newNotif, ...globalNotifications]);
  };

  // --- Handlers ---
  const handleLogin = (userData) => {
    setUserRole(userData.role);
    setUserName(userData.name);
    setIsLoggedIn(true);
    setActiveScreen('dashboard'); // Reset to dashboard on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
    setSidebarOpen(false); // Close mobile sidebar on click
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // --- RENDER LOGIC ---

  // 1. Forgot Password Screen
  if (showForgotPassword) {
    return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  }

  // 2. Login Screen
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        onForgotPassword={() => setShowForgotPassword(true)}
      />
    );
  }

  // 3. Main Content (Based on Role)
  const renderContent = () => {
    const commonProps = { darkMode, userRole, userName };

    // Package props for Registration screens
    const regProps = {
      registrations: globalRegistrations,
      setRegistrations: setGlobalRegistrations,
      addNotification
    };

    // --- STUDENT VIEW ---
    if (userRole === 'student') {
      switch (activeScreen) {
        case 'dashboard':
          return <StudentDashboard {...commonProps} events={globalEvents} registrations={globalRegistrations} setRegistrations={setGlobalRegistrations} />;
        case 'calendar':
          return <CalendarView darkMode={darkMode} events={globalEvents} />;
        case 'feedback':
          return <Feedback darkMode={darkMode} userRole={userRole} />;
        case 'notifications':
          return <Notifications darkMode={darkMode} userRole={userRole} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
        case 'settings':
          return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
        case 'profile':
          return <Profile darkMode={darkMode} user={{ name: userName, role: userRole }} />;
        default:
          return <StudentDashboard {...commonProps} events={globalEvents} registrations={globalRegistrations} setRegistrations={setGlobalRegistrations} />;
      }
    }

    // --- ORGANIZER VIEW ---
    if (userRole === 'organizer') {
      switch (activeScreen) {
        case 'dashboard':
          return <OrganizerDashboard {...commonProps} onNavigate={handleNavigate} />;
        case 'events':
          return <EventManagement {...commonProps} events={globalEvents} setEvents={setGlobalEvents} />;
        case 'attendance':
          return <Attendance {...commonProps} events={globalEvents} />;
        case 'reports':
          return <Reports {...commonProps} userRole={userRole} />;
        case 'calendar':
          return <CalendarView darkMode={darkMode} events={globalEvents} />;
        case 'registrations':
          return <Registrations {...commonProps} {...regProps} />;
        case 'notifications':
          return <Notifications {...commonProps} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
        case 'feedback':
          return <Feedback {...commonProps} />;
        case 'settings':
          return <Settings {...commonProps} toggleDarkMode={toggleDarkMode} />;
        case 'profile':
          return <Profile {...commonProps} user={{ name: userName, role: userRole }} />;
        default:
          return <OrganizerDashboard {...commonProps} onNavigate={handleNavigate} />;
      }
    }

    // --- ADMIN VIEW (Default) ---
    switch (activeScreen) {
      case 'dashboard':
        return <AdminDashboard {...commonProps} />;
      case 'calendar':
        return <CalendarView darkMode={darkMode} events={globalEvents} />;
      case 'events':
        return <EventManagement {...commonProps} events={globalEvents} setEvents={setGlobalEvents} />;
      case 'attendance':
        return <Attendance {...commonProps} events={globalEvents} />;
      case 'reports':
        return <Reports {...commonProps} userRole={userRole} />;
      case 'feedback':
        return <Feedback {...commonProps} userRole={userRole} />;
      case 'users':
        return <UserManagement {...commonProps} />;
      case 'registrations':
        return <Registrations {...commonProps} {...regProps} />;
      case 'notifications':
        return <Notifications {...commonProps} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
      case 'settings':
        return <Settings {...commonProps} toggleDarkMode={toggleDarkMode} />;
      case 'profile':
        return <Profile {...commonProps} user={{ name: userName, role: userRole }} />;
      default:
        return <AdminDashboard {...commonProps} />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F7F8FA]'}`}>

      {/* Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 w-full">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          userName={userName}
          userRole={userRole}
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 