import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle, X, QrCode, Download, Clock as ClockIcon } from 'lucide-react';

// 1. Receive 'events', 'registrations', 'setRegistrations' from App.jsx
export function StudentDashboard({ darkMode, userName, events, registrations, setRegistrations }) {

  const [confirmingEvent, setConfirmingEvent] = useState(null);
  const [ticketEvent, setTicketEvent] = useState(null);

  // 2. Filter "My Events" from the GLOBAL registrations list
  // This ensures that if an Admin/Organizer updates the status, the Student sees it here immediately.
  const myEventsList = registrations.filter(r => r.student === userName);

  // 3. Helper to check status of a specific event
  const getRegistrationStatus = (eventId) => {
    const reg = registrations.find(r => r.eventId === eventId && r.student === userName);
    return reg ? reg.status : null;
  };

  const handleConfirmRegister = () => {
    if (!confirmingEvent) return;

    // Create new registration entry
    const newReg = {
      id: Date.now(),
      student: userName,
      eventId: confirmingEvent.id,
      event: confirmingEvent.title,
      date: confirmingEvent.date,
      time: confirmingEvent.time,
      venue: confirmingEvent.venue,
      organizer: confirmingEvent.organizer,
      status: 'pending', // Start as Pending
      email: `${userName.toLowerCase()}@student.edu`
    };

    // Update GLOBAL state
    setRegistrations([...registrations, newReg]);

    setConfirmingEvent(null);
    alert("Registration Request Sent! Waiting for Organizer approval.");
  };

  const getCategoryColor = (category) => {
    const colors = { Technical: 'bg-blue-500', Career: 'bg-green-500', Cultural: 'bg-purple-500' };
    return colors[category] || 'bg-gray-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'attended': return 'bg-green-100 text-green-700';
      case 'registered': case 'approved': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div>
        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Upcoming Events</h2>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Browse and register for campus activities</p>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const status = getRegistrationStatus(event.id);
          const isRegistered = status === 'registered' || status === 'approved';
          const isPending = status === 'pending';

          return (
            <div key={event.id} className={`rounded-xl border overflow-hidden transition-all hover:shadow-lg ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`h-2 ${getCategoryColor('Technical')}`}></div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>{event.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold text-white bg-blue-500`}>Event</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><Calendar size={16} className="text-gray-400" /><span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.date}</span></div>
                  <div className="flex items-center gap-3"><Clock size={16} className="text-gray-400" /><span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.time || 'TBD'}</span></div>
                  <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-400" /><span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{event.venue}</span></div>
                  <div className="flex items-center gap-3"><Users size={16} className="text-gray-400" /><span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Limited Seats</span></div>
                </div>

                {/* Buttons based on status */}
                {isRegistered ? (
                  <button disabled className="w-full bg-green-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 cursor-default opacity-90">
                    <CheckCircle size={18} /> Registered
                  </button>
                ) : isPending ? (
                  <button disabled className="w-full bg-yellow-100 text-yellow-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 cursor-default opacity-90">
                    <ClockIcon size={18} /> Pending Approval
                  </button>
                ) : (
                  <button onClick={() => setConfirmingEvent(event)} className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-2 rounded-lg transition-colors shadow-sm">
                    Register Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* My Events Section */}
      <div className={`rounded-xl border p-6 ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Registered Events</h3>
        <div className="space-y-3">
          {myEventsList.length > 0 ? myEventsList.map((reg) => (
            <div key={reg.id} className={`flex items-center justify-between p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-[#0F172A]' : 'border-gray-100 bg-slate-50'}`}>
              <div>
                <h4 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{reg.event}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{reg.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(reg.status)}`}>{reg.status}</span>

                {/* Only show Ticket if Registered */}
                {(reg.status === 'registered' || reg.status === 'approved' || reg.status === 'attended') && (
                  <button onClick={() => setTicketEvent(reg)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-blue-500" title="View Ticket">
                    <QrCode size={20} />
                  </button>
                )}

                {/* Show Pending Clock */}
                {reg.status === 'pending' && (
                  <div className="p-2 text-yellow-500" title="Waiting for Approval"><ClockIcon size={20} /></div>
                )}
              </div>
            </div>
          )) : (
            <p className="text-gray-500 italic">You haven't registered for any events yet.</p>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-sm rounded-2xl shadow-2xl p-6 ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-slate-900"}`}>
            <h3 className="text-xl font-bold mb-4">Confirm Registration</h3>
            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Register for <strong>{confirmingEvent.title}</strong>?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmingEvent(null)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 transition-colors">Cancel</button>
              <button onClick={handleConfirmRegister} className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {ticketEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setTicketEvent(null)} className="absolute top-4 right-4 p-1 bg-black/10 hover:bg-black/20 rounded-full transition z-10"><X size={20} className="text-black" /></button>
            <div className="bg-blue-600 p-6 text-center text-white">
              <h3 className="text-lg font-bold opacity-90">EVENT PASS</h3>
              <h2 className="text-2xl font-bold mt-1">{ticketEvent.event}</h2>
            </div>
            <div className="p-6 flex flex-col items-center text-slate-800">
              <div className="text-center mb-6 space-y-1">
                <p className="font-semibold text-lg">{ticketEvent.date}</p>
                <p className="text-slate-500">Valid Entry Ticket</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-300 mb-6">
                <QrCode size={120} className="text-slate-900" />
              </div>
              <p className="text-xs text-slate-400 text-center mb-6">Scan at venue entrance.<br />Ref: #{ticketEvent.id}</p>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                <Download size={18} /> Download Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}