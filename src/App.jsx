import { useState } from 'react';
// Pages & Components
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { StudentDashboard } from './components/StudentDashboard';
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
  // --- State Management ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State

  // --- Handlers ---
  const handleLogin = (userData) => {
    setUserRole(userData.role);
    setUserName(userData.name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
    setActiveScreen('dashboard');
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
    setSidebarOpen(false); // Close sidebar on mobile when navigating
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 1. Forgot Password Flow
  if (showForgotPassword) {
    return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  }

  // 2. Login Flow
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        onForgotPassword={() => setShowForgotPassword(true)}
      />
    );
  }

  // 3. Router Logic
  const renderContent = () => {
    // --- Student Routes ---
    if (userRole === 'student') {
      switch (activeScreen) {
        case 'dashboard': return <StudentDashboard darkMode={darkMode} />;
        case 'feedback': return <Feedback darkMode={darkMode} />;
        case 'calendar': return <CalendarView darkMode={darkMode} />;

        // Pass userRole so students CANNOT send notifications
        case 'notifications': return <Notifications darkMode={darkMode} userRole={userRole} />;

        case 'settings': return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
        case 'profile': return <Profile darkMode={darkMode} user={{ name: userName, role: userRole }} />;
        default: return <StudentDashboard darkMode={darkMode} />;
      }
    }

    // --- Admin/Organizer Routes ---
    switch (activeScreen) {
      case 'dashboard': return <AdminDashboard darkMode={darkMode} />;
      case 'calendar': return <CalendarView darkMode={darkMode} />;
      case 'events': return <EventManagement darkMode={darkMode} />;
      case 'attendance': return <Attendance darkMode={darkMode} />;
      case 'reports': return <Reports darkMode={darkMode} />;
      case 'feedback': return <Feedback darkMode={darkMode} />;
      case 'users': return <UserManagement darkMode={darkMode} />;
      case 'registrations': return <Registrations darkMode={darkMode} />;

      // Pass userRole so admins CAN send notifications
      case 'notifications': return <Notifications darkMode={darkMode} userRole={userRole} />;

      case 'settings': return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'profile': return <Profile darkMode={darkMode} user={{ name: userName, role: userRole }} />;
      default: return <AdminDashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F7F8FA]'}`}>

      {/* Responsive Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        isOpen={isSidebarOpen} // Pass mobile state
        onClose={() => setSidebarOpen(false)} // Pass close handler
      />

      {/* Main Content Area */}
      {/* md:ml-64 ensures proper spacing on Desktop, w-full handles Mobile */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 w-full">
        <Header
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          userName={userName}
          userRole={userRole}
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)} // Toggle mobile menu
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}