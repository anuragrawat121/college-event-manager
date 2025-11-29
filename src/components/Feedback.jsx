import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Send, User, Trash2 } from 'lucide-react';

export function Feedback({ darkMode, userRole }) {
    const [selectedRating, setSelectedRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, event: 'Tech Workshop', student: 'John Doe', rating: 5, comment: 'Excellent!', date: 'Oct 15', helpful: 12, reply: 'Thanks!' },
        { id: 2, event: 'Career Fair', student: 'Jane Smith', rating: 2, comment: 'Crowded.', date: 'Oct 14', helpful: 8, reply: '' },
    ]);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const eventOptions = ['Tech Workshop', 'Career Fair'];

    const handleHelpful = (id) => { setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, helpful: f.helpful + 1 } : f)); };
    const submitReply = (id) => { setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, reply: replyText } : f)); setReplyingTo(null); setReplyText(""); };
    const handleDeleteFeedback = (id) => { if (window.confirm("Delete?")) setFeedbacks(feedbacks.filter(f => f.id !== id)); };
    const handleDeleteReply = (id) => { if (window.confirm("Remove reply?")) setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, reply: '' } : f)); };
    const renderStars = (rating, interactive = false) => { return (<div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} size={interactive ? 24 : 16} className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'} ${interactive ? 'cursor-pointer' : ''}`} onClick={interactive ? () => setSelectedRating(star) : undefined} />))}</div>); };

    return (
        <div className="space-y-6">
            <div><h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Event Feedback</h2></div>
            {userRole !== 'admin' && (<div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><div className="p-6"><h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Submit Feedback</h3><div className="mt-4 space-y-4"><div><label className="block text-sm mb-2">Rating</label>{renderStars(selectedRating, true)}</div><button className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg">Submit</button></div></div></div>)}
            <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}><div className="p-6"><h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Reviews</h3><div className="mt-6 space-y-6">{feedbacks.map((feedback) => (<div key={feedback.id} className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-[#0F172A]' : 'border-gray-200 bg-slate-50'}`}><div className="flex justify-between"><div><h4 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{feedback.event}</h4><p className="text-sm text-gray-500">{feedback.student}</p></div>{renderStars(feedback.rating)}{userRole === 'admin' && <button onClick={() => handleDeleteFeedback(feedback.id)}><Trash2 size={16} className="text-gray-400 hover:text-red-500" /></button>}</div><p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feedback.comment}</p>{feedback.reply && (<div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-500"><p className="text-sm text-gray-600">{feedback.reply}</p>{userRole === 'admin' && <button onClick={() => handleDeleteReply(feedback.id)}><Trash2 size={12} className="text-red-400" /></button>}</div>)}<div className="mt-3 flex gap-4"><button onClick={() => handleHelpful(feedback.id)} className="flex gap-1 items-center text-sm"><ThumbsUp size={16} /> ({feedback.helpful})</button>{userRole === 'admin' && !feedback.reply && <button onClick={() => setReplyingTo(feedback.id)} className="flex gap-1 items-center text-sm"><MessageSquare size={16} /> Reply</button>}</div>{replyingTo === feedback.id && (<div className="mt-2 flex gap-2"><input className="border rounded p-1 flex-1" onChange={(e) => setReplyText(e.target.value)} /><button onClick={() => submitReply(feedback.id)}><Send size={16} /></button></div>)}</div>))}</div></div></div>
        </div>
    );
}