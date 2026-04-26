import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Link } from 'react-router-dom';

const APPLICATIONS = [
  { id: 'CG27-001', name: 'Rahul Sharma', college: 'George College', course: 'BCA', date: 'Oct 24, 2025', status: 'Approved' },
  { id: 'CG27-002', name: 'Priya Singh', college: 'George College', course: 'BBA', date: 'Oct 23, 2025', status: 'Under Review' },
  { id: 'CG27-003', name: 'Aditya Roy', college: 'ABC Institute', course: 'B.SC(MLT)', date: 'Oct 22, 2025', status: 'Approved' },
  { id: 'CG27-004', name: 'Sneha Das', college: 'George College', course: 'BBA (HM)', date: 'Oct 21, 2025', status: 'Rejected' },
  { id: 'CG27-005', name: 'Amit Kumar', college: 'City College', course: 'BMS', date: 'Oct 20, 2025', status: 'Confirmed' },
  { id: 'CG27-006', name: 'Nisha Patel', college: 'ABC Institute', course: 'BTTM', date: 'Oct 19, 2025', status: 'Under Review' },
  { id: 'CG27-007', name: 'Arjun Mehta', college: 'George College', course: 'BCA', date: 'Oct 18, 2025', status: 'Need Correction' },
];

const STATUSES = ['All', 'Approved', 'Under Review', 'Rejected', 'Confirmed', 'Need Correction'];

export function SuperAdminApplications() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = APPLICATIONS.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.college.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: APPLICATIONS.length,
    approved: APPLICATIONS.filter(a => a.status === 'Approved').length,
    pending: APPLICATIONS.filter(a => a.status === 'Under Review').length,
    rejected: APPLICATIONS.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-text">All Applications</h1>
        <p className="text-gray-500 text-sm mt-1">System-wide view of all student applications.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: counts.total, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Approved', value: counts.approved, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Under Review', value: counts.pending, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Rejected', value: counts.rejected, color: 'text-danger', bg: 'bg-danger/10' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`p-2.5 rounded-xl ${s.bg} ${s.color} flex-shrink-0`}><FileText className="w-4 h-4" /></div>
            <div><p className="text-xs text-gray-500">{s.label}</p><p className="text-xl font-bold text-text">{s.value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-in-up delay-200">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search applications..." className="pl-9 pr-4 py-2 border border-border rounded-xl text-sm outline-none focus:border-primary w-full" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-border text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">App ID</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">College</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400 text-sm">No applications found.</td></tr>
              ) : filtered.map((a, i) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-text">{a.id}</td>
                  <td className="px-6 py-4 font-medium text-text">{a.name}</td>
                  <td className="px-6 py-4 text-gray-500">{a.college}</td>
                  <td className="px-6 py-4 text-gray-500">{a.course}</td>
                  <td className="px-6 py-4 text-gray-500">{a.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/applications/${a.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
