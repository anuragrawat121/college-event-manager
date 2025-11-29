import React from 'react';

export default function PlaceholderPage({ title, darkMode }) {
    return (
        <div className={`p-8 rounded-2xl border border-dashed flex flex-col items-center justify-center h-96 ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-300 bg-slate-50'}`}>
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{title}</h2>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>This module is under development.</p>
        </div>
    );
}