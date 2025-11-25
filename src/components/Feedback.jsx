import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Send, User, Trash2 } from 'lucide-react';

export function Feedback({ darkMode, userRole }) {
    const [selectedRating, setSelectedRating] = useState(0);

    // State for Feedback List
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            event: 'Tech Workshop 2024',
            student: 'John Doe',
            rating: 5,
            comment: 'Excellent workshop! Learned a lot.',
            date: 'Oct 15, 2024',
            helpful: 12,
            reply: 'Thank you, John! Glad you enjoyed it.' // Example of existing reply
        },
        {
            id: 2,
            event: 'Career Fair',
            student: 'Jane Smith',
            rating: 2,
            comment: 'Too crowded, not enough stalls.',
            date: 'Oct 14, 2024',
            helpful: 8,
            reply: ''
        },
    ]);

    // State for Admin Reply Input
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");

    const eventOptions = ['Tech Workshop 2024', 'Career Fair', 'Cultural Fest'];

    // 1. Handle "Helpful" Click
    const handleHelpful = (id) => {
        setFeedbacks(feedbacks.map(f =>
            f.id === id ? { ...f, helpful: f.helpful + 1 } : f
        ));
    };

    // 2. Handle Admin Reply Save
    const submitReply = (id) => {
        setFeedbacks(feedbacks.map(f =>
            f.id === id ? { ...f, reply: replyText } : f
        ));
        setReplyingTo(null);
        setReplyText("");
    };

    // 3. Handle Delete Feedback (Entire Comment)
    const handleDeleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            setFeedbacks(feedbacks.filter(f => f.id !== id));
        }
    };

    // 4. Handle Delete Reply (Remove only Admin response)
    const handleDeleteReply = (id) => {
        if (window.confirm("Remove your reply?")) {
            setFeedbacks(feedbacks.map(f =>
                f.id === id ? { ...f, reply: '' } : f
            ));
        }
    };

    const renderStars = (rating, interactive = false) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={interactive ? 24 : 16}
                        className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'
                            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                        onClick={interactive ? () => setSelectedRating(star) : undefined}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>Event Feedback</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {userRole === 'admin' ? 'Review and reply to student feedback' : 'Share your experience with us'}
                </p>
            </div>

            {/* Submit Form - Hidden for Admin */}
            {userRole !== 'admin' && (
                <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Submit Feedback</h3>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Event</label>
                            <div className="relative">
                                <select className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${darkMode ? 'bg-[#0F172A] border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-800'}`}>
                                    <option value="">Choose an event...</option>
                                    {eventOptions.map((event) => <option key={event} value={event}>{event}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rating</label>
                            {renderStars(selectedRating, true)}
                        </div>

                        <div>
                            <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Feedback</label>
                            <textarea placeholder="Share your experience..." rows={4} className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-[#0F172A] border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`} />
                        </div>

                        <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-4 py-2 rounded-lg transition-colors">
                            Submit Feedback
                        </button>
                    </div>
                </div>
            )}

            {/* Feedback List */}
            <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Reviews</h3>
                </div>

                <div className="p-6 space-y-6">
                    {feedbacks.map((feedback) => (
                        <div key={feedback.id} className={`p-4 rounded-xl border transition-colors ${darkMode ? 'border-gray-700 bg-[#0F172A]' : 'border-gray-200 bg-slate-50'}`}>

                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>{feedback.event}</h4>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>by {feedback.student} • {feedback.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {renderStars(feedback.rating)}

                                    {/* DELETE FEEDBACK BUTTON (Admin Only) */}
                                    {userRole === 'admin' && (
                                        <button
                                            onClick={() => handleDeleteFeedback(feedback.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Feedback"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Review Body */}
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 text-sm`}>
                                {feedback.comment}
                            </p>

                            {/* Admin Reply Section */}
                            {feedback.reply && (
                                <div className={`mb-4 p-3 rounded-lg border-l-4 border-blue-500 relative ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
                                            <User size={12} /> Admin Response
                                        </div>

                                        {/* DELETE REPLY BUTTON (Admin Only) */}
                                        {userRole === 'admin' && (
                                            <button
                                                onClick={() => handleDeleteReply(feedback.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete Reply"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feedback.reply}</p>
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex items-center gap-4 border-t pt-3 border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => handleHelpful(feedback.id)}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                                >
                                    <ThumbsUp size={16} /> Helpful ({feedback.helpful})
                                </button>

                                {/* Reply Button */}
                                {userRole === 'admin' && !feedback.reply && (
                                    <button
                                        onClick={() => setReplyingTo(feedback.id)}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                                    >
                                        <MessageSquare size={16} /> Reply
                                    </button>
                                )}
                            </div>

                            {/* Reply Input Box */}
                            {replyingTo === feedback.id && (
                                <div className="mt-4 flex gap-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Type your response..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className={`flex-1 px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                                    />
                                    <button onClick={() => submitReply(feedback.id)} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                                        <Send size={16} />
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}