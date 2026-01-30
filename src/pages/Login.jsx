import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { api } from "../utils/api";

export default function Login({ onLogin, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await api.login(email, password);
      onLogin(user);
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || "Login failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#3B82F6] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-slate-900 text-2xl font-bold mb-2">
            College Event Manager
          </h1>
          <p className="text-slate-500">
            Sign in to continue to your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2.5 rounded-lg transition-colors mt-2 shadow-md ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={onForgotPassword}
            className="text-[#3B82F6] text-sm font-medium hover:underline bg-transparent border-none cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
            Demo Credentials
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
              <span className="font-medium text-xs text-slate-500">Admin</span>
              <div className="text-right">
                <div className="font-mono text-xs">admin@college.edu</div>
                <div className="font-mono text-xs text-slate-400">admin123</div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
              <span className="font-medium text-xs text-slate-500">
                Organizer
              </span>
              <div className="text-right">
                <div className="font-mono text-xs">organizer@college.edu</div>
                <div className="font-mono text-xs text-slate-400">org123</div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
              <span className="font-medium text-xs text-slate-500">
                Student
              </span>
              <div className="text-right">
                <div className="font-mono text-xs">anurag@student.edu</div>
                <div className="font-mono text-xs text-slate-400">
                  student123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
