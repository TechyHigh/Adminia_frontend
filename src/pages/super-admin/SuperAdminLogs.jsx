import { useState, useMemo } from 'react';
import { Activity, Search, Building2, User, FileText, Settings, Shield, Calendar, Clock, Filter, XCircle } from 'lucide-react';

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
  { id: 1, type: 'college', action: 'College Added', detail: 'ABC Institute of Technology was added to the system', user: 'Super Admin', timestamp: '2026-05-02T14:10:00' },
  { id: 2, type: 'application', action: 'Application Approved', detail: 'CG27-003 (Aditya Roy) was approved by Admin', user: 'College Admin', timestamp: '2026-05-02T13:45:00' },
  { id: 3, type: 'auth', action: 'Admin Login', detail: 'admin@college.edu signed in successfully', user: 'System', timestamp: '2026-05-02T13:30:00' },
  { id: 4, type: 'system', action: 'Phase-2 Activated', detail: 'Phase-II was activated for George College – Batch 2025', user: 'Super Admin', timestamp: '2026-05-02T11:00:00' },
  { id: 5, type: 'application', action: 'Application Rejected', detail: 'CG27-004 (Sneha Das) was rejected — incomplete documents', user: 'College Admin', timestamp: '2026-05-02T10:22:00' },
  { id: 6, type: 'student', action: 'New Registration', detail: 'Rahul Sharma registered and submitted application CG27-001', user: 'Student', timestamp: '2026-05-01T16:15:00' },
  { id: 7, type: 'college', action: 'College Updated', detail: 'Bengal College status changed to Inactive', user: 'Super Admin', timestamp: '2026-05-01T15:00:00' },
  { id: 8, type: 'auth', action: 'Student Login', detail: 'rahul.sharma@example.com signed in', user: 'System', timestamp: '2026-05-01T09:00:00' },
  { id: 9, type: 'application', action: 'Correction Requested', detail: 'Admin requested correction on CG27-007 (Arjun Mehta)', user: 'College Admin', timestamp: '2026-04-30T14:00:00' },
  { id: 10, type: 'system', action: 'Phase-1 Opened', detail: 'Phase-I applications opened for session 2025-26', user: 'Super Admin', timestamp: '2026-04-29T10:00:00' },
];

const ALL_TYPES = ['All', 'college', 'application', 'student', 'system', 'auth'];

const formatTimestamp = (ts) => {
  const date = new Date(ts);
  const now = new Date('2026-05-02T15:00:00'); // Use system date for comparison
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (diffDays === 0) return `Today, ${timeStr}`;
  if (diffDays === 1) return `Yesterday, ${timeStr}`;
  if (diffDays < 7) return `${diffDays} days ago, ${timeStr}`;
  return date.toLocaleDateString() + ', ' + timeStr;
};

export function SuperAdminLogs() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return LOGS.filter(l => {
      const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) ||
        l.detail.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || l.type === typeFilter;

      // Date & Time Filter Logic
      const logDate = new Date(l.timestamp);
      const logDateTime = logDate.getTime();

      let matchDate = true;
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (logDateTime < start.getTime()) matchDate = false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (logDateTime > end.getTime()) matchDate = false;
      }

      let matchTime = true;
      if (startTime || endTime) {
        const logTimeStr = l.timestamp.split('T')[1].substring(0, 5); // "HH:mm"
        if (startTime && logTimeStr < startTime) matchTime = false;
        if (endTime && logTimeStr > endTime) matchTime = false;
      }

      return matchSearch && matchType && matchDate && matchTime;
    });
  }, [search, typeFilter, startDate, endDate, startTime, endTime]);

  const hasActiveFilters = startDate || endDate || startTime || endTime || typeFilter !== 'All' || search;

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Activity Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Full audit trail of all system events.</p>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors">
            <XCircle className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm animate-fade-in-up delay-100">
        <div className="p-4 border-b border-border space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search action or details..." className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-primary w-full" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${showFilters ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}>
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Date & Time Filters'}
              </button>

              <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {ALL_TYPES.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap capitalize transition-colors ${typeFilter === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50/50 rounded-xl border border-border animate-scale-in">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Start Date
                </label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> End Date
                </label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Start Time
                </label>
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3" /> End Time
                </label>
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
                  className="w-full px-3 py-1.5 border border-border rounded-lg text-sm outline-none focus:border-primary" />
              </div>
            </div>
          )}
        </div>

        <div className="divide-y divide-border overflow-hidden rounded-b-2xl">
          {filtered.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50/30">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">No activity logs found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search terms</p>
            </div>
          ) : filtered.map((log, i) => {
            const Icon = TYPE_ICON[log.type] || Activity;
            const colorCls = TYPE_COLOR[log.type] || 'bg-gray-100 text-gray-500';
            return (
              <div key={log.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/80 transition-colors animate-fade-in group" style={{ animationDelay: `${i * 30}ms` }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm transition-transform group-hover:scale-105 ${colorCls}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-text text-sm group-hover:text-primary transition-colors">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{log.detail}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] font-medium text-gray-400 block">{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Initiated by</span>
                    <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{log.user}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
