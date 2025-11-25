import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound({ onNavigate }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="text-red-500" />
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-2">Page Not Found</h1>
                <p className="text-slate-500 mb-8">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>

                <button
                    onClick={() => window.location.href = '/'} // Force reload to home
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
                >
                    <Home size={20} />
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}