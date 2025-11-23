import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

export function Feedback({ darkMode }) {
    const [selectedRating, setSelectedRating] = useState(0);

    // Mock Data
    const feedbackData = [
        {
            id: 1,
            event: 'Tech Workshop 2024',
            student: 'John Doe',
            rating: 5,
            comment: 'Excellent workshop! Learned a lot about new technologies.',
            date: 'Oct 15, 2024',
            helpful: 12,
        },
        {
            id: 2,
            event: 'Career Fair',
            student: 'Jane Smith',
            rating: 4,
            comment: 'Great event with many companies participating. Would love more time for networking.',
            date: 'Oct 14, 2024',
            helpful: 8,
        },
        {
            id: 3,
            event: 'Cultural Fest',
            student: 'Mike Johnson',
            rating: 5,
            comment: 'Amazing performances and well-organized event. Looking forward to next year!',
            date: 'Oct 12, 2024',
            helpful: 15,
        },
        {
            id: 4,
            event: 'Annual Seminar',
            student: 'Sarah Williams',
            rating: 3,
            comment: 'Good content but the venue was too crowded. Better seating arrangement needed.',
            date: 'Oct 10, 2024',
            helpful: 5,
        },
    ];

    const eventOptions = [
        'Tech Workshop 2024',
        'Career Fair',
        'Cultural Fest',
        'Annual Seminar',
    ];

    const renderStars = (rating, interactive = false) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={interactive ? 24 : 16}
                        className={`${star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : darkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-300'
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
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Share your thoughts and view feedback</p>
            </div>

            {/* Submit Feedback Form */}
            <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Submit Feedback</h3>
                </div>

                <div className="p-6 space-y-4">
                    {/* Event Select */}
                    <div>
                        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Select Event
                        </label>
                        <div className="relative">
                            <select
                                className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${darkMode
                                        ? 'bg-[#0F172A] border-gray-700 text-gray-200'
                                        : 'bg-white border-gray-300 text-gray-800'
                                    }`}
                            >
                                <option value="">Choose an event...</option>
                                {eventOptions.map((event) => (
                                    <option key={event} value={event}>
                                        {event}
                                    </option>
                                ))}
                            </select>
                            {/* Arrow Icon */}
                            <div className="absolute right-3 top-3 pointer-events-none">
                                <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Rating Stars */}
                    <div>
                        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Rating
                        </label>
                        {renderStars(selectedRating, true)}
                    </div>

                    {/* Text Area */}
                    <div>
                        <label className={`text-sm font-medium mb-2 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Your Feedback
                        </label>
                        <textarea
                            placeholder="Share your experience and suggestions..."
                            rows={4}
                            className={`w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                                    ? 'bg-[#0F172A] border-gray-700 text-gray-200 placeholder-gray-500'
                                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                                }`}
                        />
                    </div>

                    <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-4 py-2 rounded-lg transition-colors">
                        Submit Feedback
                    </button>
                </div>
            </div>

            {/* Recent Feedback List */}
            <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-[#1E293B] border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Feedback</h3>
                </div>

                <div className="p-6 space-y-4">
                    {feedbackData.map((feedback) => (
                        <div
                            key={feedback.id}
                            className={`p-4 rounded-xl border transition-colors ${darkMode ? 'border-gray-700 bg-[#0F172A]' : 'border-gray-200 bg-white'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className={`font-bold ${darkMode ? 'text-gray-100' : 'text-[#111827]'}`}>
                                        {feedback.event}
                                    </h4>
                                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        by {feedback.student} • {feedback.date}
                                    </p>
                                </div>
                                {renderStars(feedback.rating)}
                            </div>

                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 text-sm`}>
                                {feedback.comment}
                            </p>

                            <div className="flex items-center gap-2">
                                <button className={`flex items-center gap-2 text-sm font-medium px-2 py-1 rounded transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                                    }`}>
                                    <ThumbsUp size={16} />
                                    Helpful ({feedback.helpful})
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}