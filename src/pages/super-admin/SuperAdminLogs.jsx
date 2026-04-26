import { useState } from 'react';
import { Activity, Search, Building2, User, FileText, Settings, Shield } from 'lucide-react';

const TYPE_ICON = {
  college: Building2, student: User, application: FileText,
  system: Settings, auth: Shield,
};
const TYPE_COLOR = {
  college: 'bg-purple-100 text-purple-600', student: 'bg-blue-100 text-blue-600',
  application: 'bg-warning/10 text-warning', system: 'bg-gray-100 text-gray-600',
  auth: 'bg-success/10 text-success',
};

const LOGS = [
  { id: 1, type: 'college', action: 'College Added', detail: 'ABC Institute of Technology was added to the system', user: 'Super Admin', time: 'Today, 2:10 PM' },
  { id: 2, type: 'application', action: 'Application Approved', detail: 'CG27-003 (Aditya Roy) was approved by Admin', user: 'College Admin', time: 'Today, 1:45 PM' },
  { id: 3, type: 'auth', action: 'Admin Login', detail: 'admin@college.edu signed in successfully', user: 'System', time: 'Today, 1:30 PM' },
  { id: 4, type: 'system', action: 'Phase-2 Activated', detail: 'Phase-II was activated for George College – Batch 2025', user: 'Super Admin', time: 'Today, 11:00 AM' },
  { id: 5, type: 'application', action: 'Application Rejected', detail: 'CG27-004 (Sneha Das) was rejected — incomplete documents', user: 'College Admin', time: 'Today, 10:22 AM' },
  { id: 6, type: 'student', action: 'New Registration', detail: 'Rahul Sharma registered and submitted application CG27-001', user: 'Student', time: 'Yesterday, 4:15 PM' },
  { id: 7, type: 'college', action: 'College Updated', detail: 'Bengal College status changed to Inactive', user: 'Super Admin', time: 'Yesterday, 3:00 PM' },
  { id: 8, type: 'auth', action: 'Student Login', detail: 'rahul.sharma@example.com signed in', user: 'System', time: 'Yesterday, 9:00 AM' },
  { id: 9, type: 'application', action: 'Correction Requested', detail: 'Admin requested correction on CG27-007 (Arjun Mehta)', user: 'College Admin', time: '2 days ago' },
  { id: 10, type: 'system', action: 'Phase-1 Opened', detail: 'Phase-I applications opened for session 2025-26', user: 'Super Admin', time: '3 days ago' },
];

const ALL_TYPES = ['All', 'college', 'application', 'student', 'system', 'auth'];

export function SuperAdminLogs() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = LOGS.filter(l => {
    const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.detail.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || l.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">Activity Logs</h1>
        <p className="text-gray-500 text-sm mt-1">Full audit trail of all system events.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up delay-100">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search logs..." className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-primary w-full" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {ALL_TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-colors ${typeFilter === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">No logs found.</div>
          ) : filtered.map((log, i) => {
            const Icon = TYPE_ICON[log.type] || Activity;
            const colorCls = TYPE_COLOR[log.type] || 'bg-gray-100 text-gray-500';
            return (
              <div key={log.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${colorCls}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-text text-sm">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{log.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{log.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">By <span className="font-medium text-gray-500">{log.user}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
