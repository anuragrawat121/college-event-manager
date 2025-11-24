import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword({ onBackToLogin }) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">

                {!isSubmitted ? (
                    <>
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h1>
                            <p className="text-slate-500">Enter your email address and we'll send you a link to reset your password.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="admin@college.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                                Send Reset Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Check your mail</h2>
                        <p className="text-slate-500 mb-6">We have sent a password reset link to <span className="font-medium text-slate-900">{email}</span></p>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={onBackToLogin}
                        className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 mx-auto transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
}