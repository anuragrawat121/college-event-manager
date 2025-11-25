import { useState } from 'react';
// Pages & Components
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
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
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // --- 1. GLOBAL EVENT STATE ---
  const [globalEvents, setGlobalEvents] = useState([
    { id: 1, title: "Tech Workshop", date: "2024-10-20", venue: "Auditorium A", organizer: "Event Organizer", status: "upcoming", color: "bg-blue-500" },
    { id: 2, title: "Career Fair", date: "2024-10-25", venue: "Main Hall", organizer: "Prof. Johnson", status: "upcoming", color: "bg-green-500" },
    { id: 3, title: "Cultural Fest", date: "2024-11-02", venue: "Sports Complex", organizer: "Event Organizer", status: "upcoming", color: "bg-purple-500" },
    { id: 4, title: "Annual Seminar", date: "2024-09-15", venue: "Conf Room", organizer: "Dr. Brown", status: "completed", color: "bg-orange-500" },
  ]);

  const [globalNotifications, setGlobalNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Welcome to the new College Event Portal.', type: 'success', date: '1 day ago', read: true },
  ]);

  // --- 2. GLOBAL REGISTRATIONS ---
  const [globalRegistrations, setGlobalRegistrations] = useState([
    { id: 1, student: 'John Doe', event: 'Tech Workshop 2024', organizer: 'Event Organizer', date: '2024-10-15', status: 'pending', email: 'john@student.edu' },
    { id: 2, student: 'Jane Smith', event: 'Career Fair', organizer: 'Prof. Johnson', date: '2024-10-14', status: 'approved', email: 'jane@student.edu' },
    { id: 3, student: 'Mike Ross', event: 'Tech Workshop 2024', organizer: 'Event Organizer', date: '2024-10-15', status: 'rejected', email: 'mike@student.edu' },
    { id: 4, student: 'Sarah Connor', event: 'Cultural Fest', organizer: 'Event Organizer', date: '2024-10-12', status: 'approved', email: 'sarah@student.edu' },
    { id: 5, student: 'Bruce Wayne', event: 'Hackathon', organizer: 'Prof. Davis', date: '2024-11-01', status: 'pending', email: 'bruce@student.edu' },
  ]);

  const addNotification = (title, message, type = 'info') => {
    const newNotif = { id: Date.now(), title, message, type, date: 'Just now', read: false };
    setGlobalNotifications([newNotif, ...globalNotifications]);
  };

  const handleLogin = (userData) => { setUserRole(userData.role); setUserName(userData.name); setIsLoggedIn(true); };
  const handleLogout = () => { setIsLoggedIn(false); setUserRole(''); setUserName(''); setActiveScreen('dashboard'); };
  const handleNavigate = (screen) => { setActiveScreen(screen); setSidebarOpen(false); };
  const toggleDarkMode = () => { setDarkMode(!darkMode); };

  if (showForgotPassword) return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  if (!isLoggedIn) return <Login onLogin={handleLogin} onForgotPassword={() => setShowForgotPassword(true)} />;

  const renderContent = () => {
    const commonProps = { darkMode, userRole, userName };
    const regProps = { registrations: globalRegistrations, setRegistrations: setGlobalRegistrations, addNotification };

    if (userRole === 'student') {
      switch (activeScreen) {
        case 'dashboard': return <StudentDashboard darkMode={darkMode} userName={userName} events={globalEvents} registrations={globalRegistrations} setRegistrations={setGlobalRegistrations} />;
        case 'calendar': return <CalendarView darkMode={darkMode} events={globalEvents} />;
        case 'feedback': return <Feedback darkMode={darkMode} userRole={userRole} />;
        case 'notifications': return <Notifications darkMode={darkMode} userRole={userRole} notifications={globalNotifications} setNotifications={setGlobalNotifications} addNotification={addNotification} />;
        case 'settings': return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
        case 'profile': return <Profile darkMode={darkMode} user={{ name: userName, role: userRole }} />;
        default: return <StudentDashboard darkMode={darkMode} />;
      }
    }

    if (userRole === 'organizer') {
      switch (activeScreen) {
        case 'dashboard': return <OrganizerDashboard {...commonProps} onNavigate={handleNavigate} />;
        case 'events': return <EventManagement {...commonProps} events={globalEvents} setEvents={setGlobalEvents} />;
        case 'attendance': return <Attendance {...commonProps} events={globalEvents} />;
        case 'reports': return <Reports {...commonProps} />;
        case 'calendar': return <CalendarView {...commonProps} events={globalEvents} />;
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
      case 'calendar': return <CalendarView {...commonProps} events={globalEvents} />;
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