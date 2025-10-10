'use client';

import { useState, useEffect } from 'react';
import { getSubscribers, getSubscriberCount } from '@/lib/supabase';
import { Subscriber } from '@/lib/supabase';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Epiphany123') {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get subscriber count
      const countResult = await getSubscriberCount();
      if (countResult.success) {
        setCount(countResult.count ?? 0);
      }
      
      // Get all subscribers
      const subscribersResult = await getSubscribers();
      if (subscribersResult.success) {
        setSubscribers(subscribersResult.data || []);
      } else {
        setError(subscribersResult.error || 'Failed to load subscribers');
      }
    } catch {
      setError('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Email', 'Date Joined', 'Status', 'User Agent', 'IP Address'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.created_at).toLocaleDateString(),
        sub.status,
        sub.user_agent || '',
        sub.ip_address || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epiphany-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">E</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"The Seasons", serif' }}>
              Epiphany Admin
            </h1>
            <p className="text-gray-600">Enter password to access dashboard</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center py-3 px-4 rounded-xl">
                {passwordError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading subscriber data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">E</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: '"The Seasons", serif' }}>
                Epiphany Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-600 text-lg">Manage your waitlist subscribers</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Subscribers</h3>
                <p className="text-4xl font-bold text-blue-600">{count}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Subscribers</h3>
                <p className="text-4xl font-bold text-green-600">
                  {subscribers.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Today&apos;s Signups</h3>
                <p className="text-4xl font-bold text-purple-600">
                  {subscribers.filter(s => {
                    const today = new Date().toDateString();
                    return new Date(s.created_at).toDateString() === today;
                  }).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={exportCSV}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>📊</span>
            Export CSV
          </button>
          <button
            onClick={loadData}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>🔄</span>
            Refresh Data
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Subscribers Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <span>📋</span>
              Recent Subscribers
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User Agent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(subscriber.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        subscriber.status === 'active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {subscriber.status === 'active' ? '✅ Active' : '❌ Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {subscriber.user_agent || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
